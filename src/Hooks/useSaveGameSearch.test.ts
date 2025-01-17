import { renderHook } from "@testing-library/react";
import { useSaveGameSearch } from "./useSaveGameSearch";
import { useCustomSearchParams } from "./useCustomSearchParams";

// Mock the `useCustomSearchParams` hook
jest.mock("./useCustomSearchParams");

const mockGetParam = jest.fn();
const mockSetParam = jest.fn();

(useCustomSearchParams as jest.Mock).mockReturnValue({
  getParam: mockGetParam,
  setParam: mockSetParam,
});

describe("useSaveGameSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the current search parameter", () => {
    // Mock the `getParam` function to return a value
    mockGetParam.mockReturnValue("test-search");

    const { result } = renderHook(() => useSaveGameSearch());

    expect(result.current.searchParam).toBe("test-search");
    expect(mockGetParam).toHaveBeenCalledWith("search");
  });

  test("returns an empty string if no search parameter is set", () => {
    // Mock the `getParam` function to return null
    mockGetParam.mockReturnValue(null);

    const { result } = renderHook(() => useSaveGameSearch());

    expect(result.current.searchParam).toBe("");
    expect(mockGetParam).toHaveBeenCalledWith("search");
  });

  test("sets the search parameter", () => {
    const { result } = renderHook(() => useSaveGameSearch());

    result.current.setSearchParam("new-search");

    expect(mockSetParam).toHaveBeenCalledWith("search", "new-search");
  });
});
