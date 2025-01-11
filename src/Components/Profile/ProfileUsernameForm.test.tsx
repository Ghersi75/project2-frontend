import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileUsernameForm from "./ProfileUsernameForm";

describe("ProfileUsernameForm Component", () => {
  const mockSetUsername = jest.fn();
  const mockHandleUsernameChange = jest.fn();

  const defaultProps = {
    formStyle: "test-form-style",
    username: "",
    setUsername: mockSetUsername,
    currentUsername: "currentUser",
    usernameError: "",
    usernameSuccess: "",
    handleUsernameChange: mockHandleUsernameChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the input field and button", () => {
    render(<ProfileUsernameForm {...defaultProps} />);

    // Check for input field
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();

    // Check for button
    expect(screen.getByRole("button", { name: /update username/i })).toBeInTheDocument();
  });

  test("disables the button if username is empty", () => {
    render(<ProfileUsernameForm {...defaultProps} />);

    const button = screen.getByRole("button", { name: /update username/i });

    // Ensure button is disabled
    expect(button).toBeDisabled();
  });

  test("disables the button if username matches current username", () => {
    const props = {
      ...defaultProps,
      username: "currentUser", // Matches currentUsername
    };

    render(<ProfileUsernameForm {...props} />);

    const button = screen.getByRole("button", { name: /update username/i });

    // Ensure button is disabled
    expect(button).toBeDisabled();
  });

  test("enables the button if username is valid and different from current username", () => {
    const props = {
      ...defaultProps,
      username: "newUser", // New and valid username
    };

    render(<ProfileUsernameForm {...props} />);

    const button = screen.getByRole("button", { name: /update username/i });

    // Ensure button is enabled
    expect(button).not.toBeDisabled();
  });

  test("calls handleUsernameChange when button is clicked", () => {
    const props = {
      ...defaultProps,
      username: "newUser", // New and valid username
    };

    render(<ProfileUsernameForm {...props} />);

    const button = screen.getByRole("button", { name: /update username/i });

    // Simulate button click
    fireEvent.click(button);

    // Ensure the handler is called
    expect(mockHandleUsernameChange).toHaveBeenCalledTimes(1);
  });

  test("updates username on input change", () => {
    render(<ProfileUsernameForm {...defaultProps} />);

    const input = screen.getByLabelText(/username:/i);

    // Simulate input change
    fireEvent.change(input, { target: { value: "newUser" } });

    // Ensure the mockSetUsername function is called with the new value
    expect(mockSetUsername).toHaveBeenCalledTimes(1);
    expect(mockSetUsername).toHaveBeenCalledWith("newUser");
  });

  test("displays the error message when usernameError is set", () => {
    const props = { ...defaultProps, usernameError: "Invalid username." };

    render(<ProfileUsernameForm {...props} />);

    // Check that the error message is displayed
    expect(screen.getByText(/invalid username/i)).toBeInTheDocument();
  });

  test("displays the success message when usernameSuccess is set", () => {
    const props = { ...defaultProps, usernameSuccess: "Username updated successfully." };

    render(<ProfileUsernameForm {...props} />);

    // Check that the success message is displayed
    expect(screen.getByText(/username updated successfully/i)).toBeInTheDocument();
  });
});
