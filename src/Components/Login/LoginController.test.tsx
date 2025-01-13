import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginController from "./LoginController";
import axios from "axios";
import { UserProvider } from "@/Contexts/UserContext";
import { BrowserRouter } from "react-router";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer mockAuthToken",
  },
  withCredentials: true,
};

// Mock axios calls since tests won't interact with actual APIs
jest.mock("axios");
const mockAxiosPost = axios.post as jest.Mock;

// Mock defaultOptions returned by hook since cookies and user info are not accessible in the test
jest.mock("@/Hooks/useDefaultRequestOptions", () => ({
  useDefaultRequestOptions: () => ({
    defaultOptions,
  }),
}));

// Mock environment variable hook
jest.mock("@/Hooks/useEnvironmentVariable", () => ({
  useEnvironmentVariable: (key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_BACKEND: "http://mock-backend.com",
    };
    return mockEnvVars[key];
  },
}));

// Create component for testing that includes required context providers
const LoginControllerWithContext = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <LoginController />
      </UserProvider>
    </BrowserRouter>
  );
};

test("renders the LoginController and handles API call success", async () => {
  mockAxiosPost.mockResolvedValueOnce({ data: { message: "Success" } });

  render(<LoginControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(passwordInput, "password");

  // Simulate form submission
  fireEvent.click(loginButton);

  // Assert that the API was called with the correct payload
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "http://mock-backend.com/user/login",
      {
        username: "testuser",
        password: "password",
      },
      defaultOptions
    );
  });
});

test("handles API call failure and displays error message", async () => {
  mockAxiosPost.mockRejectedValueOnce({
    response: { data: { error: "Invalid credentials" } },
  });

  render(<LoginControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(passwordInput, "wrongpassword");

  // Simulate form submission
  fireEvent.click(loginButton);

  // Assert error state
  await waitFor(() => {
    expect(screen.getByText(/error: invalid credentials/i)).toBeInTheDocument();
  });
});

test("handles API call failure and displays an error message instead of response from backend", async () => {
  mockAxiosPost.mockRejectedValueOnce({
    message: "Invalid credentials",
  });

  render(<LoginControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(passwordInput, "wrongpassword");

  // Simulate form submission
  fireEvent.click(loginButton);

  // Assert error state
  await waitFor(() => {
    expect(screen.getByText(/error: invalid credentials/i)).toBeInTheDocument();
  });
});

test("handles API call failure and displays a fallback error message when no message or response error are present", async () => {
  mockAxiosPost.mockRejectedValueOnce({});

  render(<LoginControllerWithContext />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });

  // Simulate user input
  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(passwordInput, "wrongpassword");

  // Simulate form submission
  fireEvent.click(loginButton);

  // Assert error state
  await waitFor(() => {
    expect(
      screen.getByText(/error: error logging in. try again later/i)
    ).toBeInTheDocument();
  });
});
