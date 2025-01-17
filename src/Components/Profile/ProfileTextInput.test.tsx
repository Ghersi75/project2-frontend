import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileTextInput from "./ProfileTextInput";

describe("ProfileTextInput Component", () => {
  const mockSetValue = jest.fn();

  const defaultProps = {
    label: "username",
    displayText: "Username",
    value: "testuser",
    setValue: mockSetValue,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the label and input field", () => {
    render(<ProfileTextInput {...defaultProps} />);

    // Check that the label is rendered
    expect(screen.getByText(defaultProps.displayText)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.displayText)).toBeInTheDocument();

    // Check that the input field is rendered with the correct value
    const input = screen.getByLabelText(defaultProps.displayText);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(defaultProps.value);
  });

  test("calls setValue when input value changes", () => {
    render(<ProfileTextInput {...defaultProps} />);

    // Get the input field
    const input = screen.getByLabelText(defaultProps.displayText);

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "newuser" } });

    // Ensure the mockSetValue function is called with the new value
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledWith("newuser");
  });

  test("renders input field with empty value", () => {
    const props = { ...defaultProps, value: "" };
    render(<ProfileTextInput {...props} />);

    // Check that the input field is rendered with an empty value
    const input = screen.getByLabelText(props.displayText);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});
