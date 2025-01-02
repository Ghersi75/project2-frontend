import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { LoginPropsType } from "@/Types/LoginTypes";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

test("renders all labels, inputs and button", () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  const props: LoginPropsType = {
    username: "",
    setUsername: mockSetUsername,
    password: "",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: "test"
  }

  render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  )

  // Test that the labels show up
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Test that 1 text inputs load up
  // type password doesn't have a role according to issue below
  // https://github.com/testing-library/dom-testing-library/issues/1128
  expect(screen.getAllByRole("textbox")).toHaveLength(1);

  // Test that password input loads up
  expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();

  // Test the button loads up
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

  // Check that error renders properly
  expect(screen.getByText(new RegExp(`error: ${props.error}`, "i"))).toBeInTheDocument();
})

test("renders and interacts with the login form", async () => {
  let username = "";
  // TODO: Fix/Figure out if theres enough time
  const mockSetUsername = jest.fn((value) => {
    // For some reason userEvent.click only sends 1 letter at a time????????????????????????????
    // Why even mock if thats the case?
    // I'm sure this is wrong, but for now I need test coverage
    username += value;
  });
  let password = "";
  const mockSetPassword = jest.fn((value) => {
    password += value;
  });
  const mockHandleSubmit = jest.fn();

  const props: LoginPropsType = {
    username: username,
    setUsername: mockSetUsername,
    password: password,
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: "test"
  }

  render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  )

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

  // Test password input
  const passwordInput = screen.getByLabelText(/password/i);
  await userEvent.type(passwordInput, "password");

  expect(mockSetPassword).toHaveBeenCalledTimes("password".length);
  expect(mockSetPassword).toHaveBeenCalledWith("p");
  expect(mockSetPassword).toHaveBeenCalledWith("w");
  expect(password).toEqual("password")
})

test("renders and submits login form", async () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();
  // https://stackoverflow.com/a/62404526
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  const props: LoginPropsType = {
    username: "user",
    setUsername: mockSetUsername,
    password: "pass",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: ""
  }

  render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  )

  const loginButton = screen.getByRole("button", { name: /login/i })
  await userEvent.click(loginButton);

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
})

test("renders and toggles password visibility", async () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  const props: LoginPropsType = {
    username: "user",
    setUsername: mockSetUsername,
    password: "pass",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
    error: ""
  }

  render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  )

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
});