import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "./SearchPage";
import { useGameSearch } from "@/Hooks/useGameSearch";
import { useSaveGameSearch } from "@/Hooks/useSaveGameSearch";
import { MemoryRouter } from "react-router";

jest.mock("@/Hooks/useGameSearch");
jest.mock("@/Hooks/useSaveGameSearch");
jest.mock("@/Hooks/useEnvironmentVariable", () => ({
  useEnvironmentVariable: (key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_BACKEND: "http://mock-backend.com",
      VITE_OTHER_ENV: "http://mock-other-env.com",
    };
    return mockEnvVars[key];
  },
}));

const mockUseGameSearch = useGameSearch as jest.Mock;
const mockUseSaveGameSearch = useSaveGameSearch as jest.Mock;

const TestComponent = () => {
  return (
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );
};

describe("SearchPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input and label", () => {
    mockUseSaveGameSearch.mockReturnValue({ searchParam: "" });
    mockUseGameSearch.mockReturnValue({ searching: false, gamesFound: [] });

    render(<TestComponent />);

    // Check for input and label
    expect(screen.getByText(/search:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter game name/i)).toBeInTheDocument();
  });

  test("shows 'Searching...' when searching is true", () => {
    mockUseSaveGameSearch.mockReturnValue({ searchParam: "test" });
    mockUseGameSearch.mockReturnValue({ searching: true, gamesFound: [] });

    render(<TestComponent />);

    // Check for "Searching..." text
    expect(screen.getByText(/searching.../i)).toBeInTheDocument();
  });

  test("shows 'Nothing found' when no games are found", async () => {
    mockUseSaveGameSearch.mockReturnValue({ searchParam: "test" });
    mockUseGameSearch.mockReturnValue({ searching: false, gamesFound: [] });

    render(<TestComponent />);

    // Check for "Nothing found" text
    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });

  test("renders game cards when games are found", () => {
    mockUseSaveGameSearch.mockReturnValue({ searchParam: "test" });
    mockUseGameSearch.mockReturnValue({
      searching: false,
      gamesFound: [
        { appid: 1, name: "Game 1", icon: "icon1.png", logo: "logo1.png" },
        { appid: 2, name: "Game 2", icon: "icon2.png", logo: "logo2.png" },
      ],
    });

    render(<TestComponent />);

    // Check that game cards are rendered
    expect(screen.getByText("Game 1")).toBeInTheDocument();
    expect(screen.getByText("Game 2")).toBeInTheDocument();
  });

  test("updates search input value on user input", async () => {
    mockUseSaveGameSearch.mockReturnValue({ searchParam: "" });
    mockUseGameSearch.mockReturnValue({ searching: false, gamesFound: [] });

    render(<TestComponent />);

    const input = screen.getByPlaceholderText(/enter game name/i);

    // Simulate typing in the search input
    fireEvent.change(input, { target: { value: "New Search" } });

    // Check that input value updates
    expect(input).toHaveValue("New Search");
  });

  test("handles case where searching is null and no games are found", () => {
    mockUseSaveGameSearch.mockReturnValue({ searchParam: "" });
    mockUseGameSearch.mockReturnValue({ searching: null, gamesFound: [] });

    render(<TestComponent />);

    // Assert that nothing is rendered (the condition resolves to null)
    expect(screen.queryByText(/searching.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/nothing found/i)).not.toBeInTheDocument();
  });
});
