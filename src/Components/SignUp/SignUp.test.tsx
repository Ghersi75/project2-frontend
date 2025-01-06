import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import SignUp from "./SignUp";
import { SignUpPropsType } from "@/Types/SignUpTypes";
import { BrowserRouter } from 'react-router';
import userEvent from "@testing-library/user-event";

test("renders all labels, inputs and button", () => {
  const mockSetUsername = jest.fn();
  const mockSetDisplayName = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  const props: SignUpPropsType = {
    username: "",
    setUsername: mockSetUsername,
    displayName: "",
    setDisplayName: mockSetDisplayName,
    password: "",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: "error"
  }

  render(
    <BrowserRouter>
      <SignUp {...props} />
    </BrowserRouter>
  );

  // Test that the labels show up
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Test that 2 text inputs loads up
  // type password doesn't have a role according to issue below
  // https://github.com/testing-library/dom-testing-library/issues/1128
  expect(screen.getAllByRole("textbox")).toHaveLength(2);

  // Test that password input loads up
  expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();

  // Test the button loads up
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();

  // Check that error renders properly
  expect(screen.getByText(new RegExp(`error: ${props.error}`, "i"))).toBeInTheDocument();
});

test("renders and interact with the sign up form", async () => {
  let username = "";
  const mockSetUsername = jest.fn((value) => {
    username += value;
  });

  let displayName = "";
  const mockSetDisplayName = jest.fn((value) => {
    displayName += value;
  });

  let password = "";
  const mockSetPassword = jest.fn((value) => {
    password += value;
  });

  const mockHandleSubmit = jest.fn();

  const props: SignUpPropsType = {
    username: username,
    setUsername: mockSetUsername,
    displayName: displayName,
    setDisplayName: mockSetDisplayName,
    password: password,
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: "error"
  }

  render(
    <BrowserRouter>
      <SignUp {...props} />
    </BrowserRouter>
  );

  // Simulate typing in username
  const usernameInput = screen.getByLabelText(/username/i);
  await userEvent.type(usernameInput, "testuser");

  // Check that setUsername is being called as expected
  expect(mockSetUsername).toHaveBeenCalledTimes("testuser".length);
  // The function processes each letter one at a time from testing
  // Thought it would be t, te, tes, test etc, but it seems to do 1 letter at a time
  // Any letter can be checked regardless of order
  expect(mockSetUsername).toHaveBeenCalledWith("t");
  expect(mockSetUsername).toHaveBeenCalledWith("e");
  expect(mockSetUsername).toHaveBeenCalledWith("s");
  expect(mockSetUsername).toHaveBeenCalledWith("r");
  expect(username).toEqual("testuser");

  // Test displayName input
  const displayNameInput = screen.getByLabelText(/display name/i)
  await userEvent.type(displayNameInput, "display name");

  expect(mockSetDisplayName).toHaveBeenCalledTimes("display name".length)

  expect(mockSetDisplayName).toHaveBeenCalledWith("d")
  expect(mockSetDisplayName).toHaveBeenCalledWith("n")
  expect(mockSetDisplayName).toHaveBeenCalledWith("y")

  // Test password input
  const passwordInput = screen.getByLabelText(/password/i);
  await userEvent.type(passwordInput, "password");

  expect(mockSetPassword).toHaveBeenCalledTimes("password".length);
  expect(mockSetPassword).toHaveBeenCalledWith("p");
  expect(mockSetPassword).toHaveBeenCalledWith("w");
  expect(password).toEqual("password")
})

test("renders and submits sign up form", async () => {
  const mockSetUsername = jest.fn();
  const mockSetDisplayName = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  const props: SignUpPropsType = {
    username: "user",
    setUsername: mockSetUsername,
    displayName: "name",
    setDisplayName: mockSetDisplayName,
    password: "pass",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: ""
  }

  render(
    <BrowserRouter>
      <SignUp {...props} />
    </BrowserRouter>
  );

  const signUpButton = screen.getByRole("button", { name: /sign up/i });
  await userEvent.click(signUpButton);

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
})

test("renders and toggles password visibility", async () => {
  const mockSetUsername = jest.fn();
  const mockSetDisplayName = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  const props: SignUpPropsType = {
    username: "user",
    setUsername: mockSetUsername,
    displayName: "name",
    setDisplayName: mockSetDisplayName,
    password: "pass",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: "error"
  }

  render(
    <BrowserRouter>
      <SignUp {...props} />
    </BrowserRouter>
  );

  const passwordInput = screen.getByLabelText(/password/i);
  const toggleButton = screen.getByText("Show");

  // Just test password show/hide functionality
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(toggleButton).toHaveTextContent("Show");

  await userEvent.click(toggleButton);

  expect(passwordInput).toHaveAttribute("type", "text");
  expect(screen.getByText("Hide")).toBeInTheDocument();

  await userEvent.click(screen.getByText("Hide"));

  expect(passwordInput).toHaveAttribute("type", "password");
  expect(screen.getByText("Show")).toBeInTheDocument();
})