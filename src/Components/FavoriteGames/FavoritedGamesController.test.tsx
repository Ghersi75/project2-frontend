import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritedGamesController from "./FavoritedGamesController";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import axios from "axios";
import { MemoryRouter } from "react-router";

jest.mock("axios");
jest.mock("@/Hooks/useUserInfo");
jest.mock("@/Hooks/useDefaultRequestOptions");
jest.mock("@/Hooks/useEnvironmentVariable", () => ({
  useEnvironmentVariable: (key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_BACKEND: "http://mock-backend.com",
    };
    return mockEnvVars[key];
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockUseUserInfo = useUserInfo as jest.Mock;
const mockUseDefaultRequestOptions = useDefaultRequestOptions as jest.Mock;

const mockGames = [
  {
    id: 1,
    appId: 12345,
    name: "Favorite Game 1",
    thumbnailLink: "thumbnail1.jpg",
    availableOn: ["Windows", "Mac"],
  },
  {
    id: 2,
    appId: 67890,
    name: "Favorite Game 2",
    thumbnailLink: "thumbnail2.jpg",
    availableOn: ["Linux"],
  },
];

const TestComponent = () => {
  return (
    <MemoryRouter>
      <FavoritedGamesController />
    </MemoryRouter>
  );
};

describe("FavoritedGamesController Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock user info
    mockUseUserInfo.mockReturnValue({
      loading: false,
      userInfo: { username: "testuser" },
    });

    // Mock default request options
    mockUseDefaultRequestOptions.mockReturnValue({
      defaultOptions: { headers: { Authorization: "Bearer token" } },
    });
  });

  test("renders and fetches games correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockGames });

    render(<TestComponent />);

    // Ensure API is called with the correct URL
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://mock-backend.com/game/favorites?username=testuser"
      );
    });

    // Check that the games are rendered
    mockGames.forEach((game) => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
    });
  });

  test("handles unfavorite functionality", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockGames });
    mockedAxios.delete.mockResolvedValueOnce({});

    render(<TestComponent />);

    // Wait for the games to be fetched
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Click the unfavorite button for the first game
    const unfavoriteButton = screen.getAllByText(/unfavorite game/i)[0];
    fireEvent.click(unfavoriteButton);

    // Ensure delete API is called with the correct URL
    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "http://mock-backend.com/game/favorites?username=testuser&appid=12345",
        { headers: { Authorization: "Bearer token" } }
      );
    });

    // Ensure the game is removed from the UI
    await waitFor(() => {
      expect(screen.queryByText(mockGames[0].name)).not.toBeInTheDocument();
      expect(screen.getByText(mockGames[1].name)).toBeInTheDocument();
    });
  });

  test("does not fetch games when userInfo is null", () => {
    mockUseUserInfo.mockReturnValue({ loading: false, userInfo: null });

    render(<TestComponent />);

    // Ensure API is not called
    expect(mockedAxios.get).not.toHaveBeenCalled();

    // Ensure fallback message is not displayed (RedirectIfNotLoggedIn is expected to handle this)
    expect(screen.queryByText(/no favorited games found/i)).not.toBeInTheDocument();
  });

  test("logs error when fetching games fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockedAxios.get.mockRejectedValueOnce(new Error("Fetch error"));

    render(<TestComponent />);

    // Wait for the API call
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Ensure console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    // Ensure no games are displayed
    expect(screen.queryByText(mockGames[0].name)).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  test("does nothing when unfavorite is called and userInfo is null", () => {
    mockUseUserInfo.mockReturnValue({ loading: false, userInfo: null });

    render(<TestComponent />);

    // Call the unfavorite handler
    const unfavoriteButton = screen.queryByText(/unfavorite game/i);
    if (unfavoriteButton) {
      fireEvent.click(unfavoriteButton);
    }

    // Ensure the delete API is not called
    expect(mockedAxios.delete).not.toHaveBeenCalled();
  });

  test("logs error when unfavoriting fails", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockGames });
    mockedAxios.delete.mockRejectedValueOnce(new Error("Unfavorite error"));
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<TestComponent />);

    // Wait for the games to be fetched
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Click the unfavorite button for the first game
    const unfavoriteButton = screen.getAllByText(/unfavorite game/i)[0];
    fireEvent.click(unfavoriteButton);

    // Wait for the unfavorite handler to run
    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });

    // Ensure console.error was called
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
