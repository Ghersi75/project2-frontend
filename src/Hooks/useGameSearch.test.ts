import { renderHook, act } from "@testing-library/react";
import { useGameSearch } from "./useGameSearch";
import axios from "axios";

// Mock Axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useSaveGameSearch hook
jest.mock("./useSaveGameSearch", () => ({
  useSaveGameSearch: () => ({
    setSearchParam: jest.fn(),
  }),
}));

// Mock environment variable hook
jest.mock("./useEnvironmentVariable", () => ({
  useEnvironmentVariable: (key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_STEAM_SEARCH: "http://mock-steam-search/",
    };
    return mockEnvVars[key];
  },
}));

describe("useGameSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("returns initial state when search is empty", () => {
    const { result } = renderHook(() => useGameSearch("", 500));

    expect(result.current.searching).toBe(null);
    expect(result.current.gamesFound).toEqual([]);
  });

  test("performs search and updates state on success", async () => {
    const mockGames = [
      { id: 1, name: "Game 1" },
      { id: 2, name: "Game 2" },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockGames });

    const { result } = renderHook(({ search }) => useGameSearch(search, 500), {
      initialProps: { search: "test" },
    });

    // Simulate typing delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Wait for the mock API call to resolve
    await act(async () => {});

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://mock-steam-search/test"
    );
    expect(result.current.searching).toBe(false);
    expect(result.current.gamesFound).toEqual(mockGames);
  });

  test("does not save search term on empty search or no results", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    const { result } = renderHook(({ search }) => useGameSearch(search, 500), {
      initialProps: { search: "empty" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await act(async () => {});

    expect(result.current.gamesFound).toEqual([]);
    expect(result.current.searching).toBe(false);
  });

  test("handles search failure gracefully", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API Error"));

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(({ search }) => useGameSearch(search, 500), {
      initialProps: { search: "fail" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await act(async () => {});

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://mock-steam-search/fail"
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(result.current.gamesFound).toEqual([]);
    expect(result.current.searching).toBe(false);

    consoleErrorSpy.mockRestore();
  });
});
