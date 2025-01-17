import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import SignUpController from "./SignUpController";
import axios from "axios";
import { BrowserRouter } from "react-router";
import { UserProvider } from "@/Contexts/UserContext";

jest.mock("axios");
jest.mock("@/Hooks/useEnvironmentVariable", () => ({
  useEnvironmentVariable: (key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_BACKEND: "http://mock-backend.com",
    };
    return mockEnvVars[key];
  },
}));

const mockAxiosPost = axios.post as jest.Mock;

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer mockAuthToken",
  },
  withCredentials: true,
};

jest.mock("@/Hooks/useDefaultRequestOptions", () => ({
  useDefaultRequestOptions: () => ({
    defaultOptions,
  }),
}));

const SignUpControllerWithContext = () => (
  <BrowserRouter>
    <UserProvider>
      <SignUpController />
    </UserProvider>
  </BrowserRouter>
);

test("renders the SignUpController with all fields and button", () => {
  render(<SignUpControllerWithContext />);

  // Check that all inputs are rendered
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Check that the submit button is rendered
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});

test("handles user input and form submission successfully", async () => {
  mockAxiosPost.mockResolvedValueOnce({ data: { message: "Registration successful" } });

  render(<SignUpControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const displayNameInput = screen.getByLabelText(/display name/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(displayNameInput, "Test User");
  await userEvent.type(passwordInput, "password123");

  // Submit the form
  fireEvent.click(signUpButton);

  // Ensure axios.post is called with correct payload
  await waitFor(() => {
    expect(mockAxiosPost).toHaveBeenCalledWith(
      "http://mock-backend.com/user/register",
      {
        username: "testuser",
        displayName: "Test User",
        password: "password123",
        role: "CONTRIBUTOR",
      },
      defaultOptions
    );
  });
});

test("displays an error from API response", async () => {
  mockAxiosPost.mockRejectedValueOnce({
    response: { data: { error: "Username already exists" } },
  });

  render(<SignUpControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const displayNameInput = screen.getByLabelText(/display name/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(displayNameInput, "Test User");
  await userEvent.type(passwordInput, "password123");

  // Submit the form
  fireEvent.click(signUpButton);

  // Check that error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
  });
});

test("displays error message if API returns no error message", async () => {
  mockAxiosPost.mockRejectedValueOnce({ message: "Network error" });

  render(<SignUpControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const displayNameInput = screen.getByLabelText(/display name/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(displayNameInput, "Test User");
  await userEvent.type(passwordInput, "password123");

  // Submit the form
  fireEvent.click(signUpButton);

  // Check that fallback error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});

test("displays a fallback error message if API returns no error message and error has no message of its own", async () => {
  mockAxiosPost.mockRejectedValueOnce({});

  render(<SignUpControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const displayNameInput = screen.getByLabelText(/display name/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signUpButton = screen.getByRole("button", { name: /sign up/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(displayNameInput, "Test User");
  await userEvent.type(passwordInput, "password123");

  // Submit the form
  fireEvent.click(signUpButton);

  // Check that fallback error message is displayed
  await waitFor(() => {
    expect(screen.getByText(/error: error signing up. try again later/i)).toBeInTheDocument();
  });
});
