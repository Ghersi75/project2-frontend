import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileDisplayNameForm from "./ProfileDisplayNameForm";

describe("ProfileDisplayNameForm Component", () => {
  const mockSetDisplayName = jest.fn();
  const mockHandleDisplayNameChange = jest.fn();

  const defaultProps = {
    formStyle: "test-form-style",
    displayName: "",
    setDisplayName: mockSetDisplayName,
    currentDisplayName: "currentName",
    displayNameError: "",
    displayNameSuccess: "",
    handleDisplayNameChange: mockHandleDisplayNameChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the input field and button", () => {
    render(<ProfileDisplayNameForm {...defaultProps} />);

    // Check for input field
    expect(screen.getByLabelText(/display name:/i)).toBeInTheDocument();

    // Check for button
    expect(screen.getByRole("button", { name: /update display name/i })).toBeInTheDocument();
  });

  test("disables the button if display name is empty", () => {
    render(<ProfileDisplayNameForm {...defaultProps} />);

    const button = screen.getByRole("button", { name: /update display name/i });

    // Ensure button is disabled
    expect(button).toBeDisabled();
  });

  test("disables the button if display name is the same as current display name", () => {
    const props = {
      ...defaultProps,
      displayName: "currentName", // Matches currentDisplayName
    };

    render(<ProfileDisplayNameForm {...props} />);

    const button = screen.getByRole("button", { name: /update display name/i });

    // Ensure button is disabled
    expect(button).toBeDisabled();
  });

  test("enables the button if display name is valid and different from current display name", () => {
    const props = {
      ...defaultProps,
      displayName: "newName", // New and valid name
    };

    render(<ProfileDisplayNameForm {...props} />);

    const button = screen.getByRole("button", { name: /update display name/i });

    // Ensure button is enabled
    expect(button).not.toBeDisabled();
  });

  test("calls handleDisplayNameChange when button is clicked", () => {
    const props = {
      ...defaultProps,
      displayName: "newName", // New and valid name
    };

    render(<ProfileDisplayNameForm {...props} />);

    const button = screen.getByRole("button", { name: /update display name/i });

    // Simulate button click
    fireEvent.click(button);

    // Ensure the handler is called
    expect(mockHandleDisplayNameChange).toHaveBeenCalledTimes(1);
  });

  test("updates display name on input change", () => {
    render(<ProfileDisplayNameForm {...defaultProps} />);

    const input = screen.getByLabelText(/display name:/i);

    // Simulate input change
    fireEvent.change(input, { target: { value: "newName" } });

    // Ensure the mockSetDisplayName function is called with the new value
    expect(mockSetDisplayName).toHaveBeenCalledTimes(1);
    expect(mockSetDisplayName).toHaveBeenCalledWith("newName");
  });

  test("displays the error message when displayNameError is set", () => {
    const props = { ...defaultProps, displayNameError: "Invalid display name." };

    render(<ProfileDisplayNameForm {...props} />);

    // Check that the error message is displayed
    expect(screen.getByText(/invalid display name/i)).toBeInTheDocument();
  });

  test("displays the success message when displayNameSuccess is set", () => {
    const props = { ...defaultProps, displayNameSuccess: "Display name updated successfully." };

    render(<ProfileDisplayNameForm {...props} />);

    // Check that the success message is displayed
    expect(screen.getByText(/display name updated successfully/i)).toBeInTheDocument();
  });
});
