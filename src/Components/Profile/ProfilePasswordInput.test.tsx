import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfilePasswordInput from "./ProfilePasswordInput";

describe("ProfilePasswordInput Component", () => {
  const mockSetPassword = jest.fn();

  const defaultProps = {
    label: "password",
    displayText: "Password",
    password: "mypassword",
    setPassword: mockSetPassword,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the label and password input field", () => {
    render(<ProfilePasswordInput {...defaultProps} />);

    // Check that the label is rendered
    expect(screen.getByText(defaultProps.displayText)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.displayText)).toBeInTheDocument();

    // Check that the input field is rendered with the correct value
    const input = screen.getByLabelText(defaultProps.displayText);
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveValue(defaultProps.password);
  });

  test("toggles password visibility when show/hide is clicked", () => {
    render(<ProfilePasswordInput {...defaultProps} />);

    // Initially, password is hidden
    const input = screen.getByLabelText(defaultProps.displayText);
    const toggleButton = screen.getByText("Show");

    expect(input).toHaveAttribute("type", "password");
    expect(toggleButton).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByText("Hide")).toBeInTheDocument();

    // Click to hide password again
    fireEvent.click(screen.getByText("Hide"));
    expect(input).toHaveAttribute("type", "password");
    expect(screen.getByText("Show")).toBeInTheDocument();
  });

  test("calls setPassword when input value changes", () => {
    render(<ProfilePasswordInput {...defaultProps} />);

    // Get the input field
    const input = screen.getByLabelText(defaultProps.displayText);

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "newpassword" } });

    // Ensure the mockSetPassword function is called with the new value
    expect(mockSetPassword).toHaveBeenCalledTimes(1);
    expect(mockSetPassword).toHaveBeenCalledWith("newpassword");
  });

  test("renders password input with an empty value", () => {
    const props = { ...defaultProps, password: "" };
    render(<ProfilePasswordInput {...props} />);

    // Check that the input field is rendered with an empty value
    const input = screen.getByLabelText(props.displayText);
    expect(input).toHaveValue("");
  });
});
