import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToggleLightDarkButton from "./ToggleLightDarkButton";
import { useTheme } from "@/Contexts/ThemeProvider";

jest.mock("@/Contexts/ThemeProvider");

const mockSetTheme = jest.fn();
const mockUseTheme = useTheme as jest.Mock;

describe("ToggleLightDarkButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with a sun icon when theme is dark", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });

    render(<ToggleLightDarkButton />);

    // Ensure the sun icon is rendered
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  test("renders with a moon icon when theme is light", () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });

    render(<ToggleLightDarkButton />);

    // Ensure the moon icon is rendered
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  test("toggles theme from dark to light on click", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });

    render(<ToggleLightDarkButton />);

    // Simulate button click
    fireEvent.click(screen.getByRole("button"));

    // Ensure setTheme is called with "light"
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  test("toggles theme from light to dark on click", () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });

    render(<ToggleLightDarkButton />);

    // Simulate button click
    fireEvent.click(screen.getByRole("button"));

    // Ensure setTheme is called with "dark"
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
