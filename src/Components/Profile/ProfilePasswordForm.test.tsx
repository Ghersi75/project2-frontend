import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfilePasswordForm from "./ProfilePasswordForm";

describe("ProfilePasswordForm Component", () => {
  const mockSetOldPassword = jest.fn();
  const mockSetConfirmPassword = jest.fn();
  const mockSetNewPassword = jest.fn();
  const mockHandlePasswordChange = jest.fn();

  const defaultProps = {
    formStyle: "test-form-style",
    oldPassword: "",
    setOldPassword: mockSetOldPassword,
    confirmPassword: "",
    setConfirmPassword: mockSetConfirmPassword,
    newPassword: "",
    setNewPassword: mockSetNewPassword,
    passwordError: "",
    passwordSuccess: "",
    handlePasswordChange: mockHandlePasswordChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all input fields and the button", () => {
    render(<ProfilePasswordForm {...defaultProps} />);

    // Check for input fields
    expect(screen.getByLabelText(/old password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password:/i)).toBeInTheDocument();

    // Check for the button
    expect(screen.getByRole("button", { name: /update password/i })).toBeInTheDocument();
  });

  test("disables the button if passwords don't match or new password is empty", () => {
    const props = {
      ...defaultProps,
      oldPassword: "oldpass",
      newPassword: "",
      confirmPassword: "differentpass",
    };

    render(<ProfilePasswordForm {...props} />);

    const button = screen.getByRole("button", { name: /update password/i });

    // Check that the button is disabled
    expect(button).toBeDisabled();
  });

  test("enables the button if passwords match and new password is not empty", () => {
    const props = {
      ...defaultProps,
      oldPassword: "password",
      newPassword: "newpassword",
      confirmPassword: "newpassword",
    };

    render(<ProfilePasswordForm {...props} />);

    const button = screen.getByRole("button", { name: /update password/i });

    // Check that the button is enabled
    expect(button).not.toBeDisabled();
  });

  test("calls handlePasswordChange when the button is clicked", () => {
    const props = {
      ...defaultProps,
      oldPassword: "password",
      newPassword: "newpassword",
      confirmPassword: "newpassword",
    };

    render(<ProfilePasswordForm {...props} />);

    const button = screen.getByRole("button", { name: /update password/i });

    // Click the button
    fireEvent.click(button);

    // Ensure the handler is called
    expect(mockHandlePasswordChange).toHaveBeenCalledTimes(1);
  });

  test("displays the error message when passwordError is set", () => {
    const props = { ...defaultProps, passwordError: "Passwords do not match." };

    render(<ProfilePasswordForm {...props} />);

    // Check that the error message is displayed
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test("displays the success message when passwordSuccess is set", () => {
    const props = { ...defaultProps, passwordSuccess: "Password updated successfully." };

    render(<ProfilePasswordForm {...props} />);

    // Check that the success message is displayed
    expect(screen.getByText(/password updated successfully/i)).toBeInTheDocument();
  });

  test("updates input fields when values change", () => {
    render(<ProfilePasswordForm {...defaultProps} />);

    // Update old password
    const oldPasswordInput = screen.getByLabelText(/old password:/i);
    fireEvent.change(oldPasswordInput, { target: { value: "oldpass" } });
    expect(mockSetOldPassword).toHaveBeenCalledWith("oldpass");

    // Update confirm password
    const confirmPasswordInput = screen.getByLabelText(/confirm password:/i);
    fireEvent.change(confirmPasswordInput, { target: { value: "confirmpass" } });
    expect(mockSetConfirmPassword).toHaveBeenCalledWith("confirmpass");

    // Update new password
    const newPasswordInput = screen.getByLabelText(/new password:/i);
    fireEvent.change(newPasswordInput, { target: { value: "newpass" } });
    expect(mockSetNewPassword).toHaveBeenCalledWith("newpass");
  });
});
