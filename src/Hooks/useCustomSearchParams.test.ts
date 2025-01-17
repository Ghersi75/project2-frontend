import { renderHook, act } from "@testing-library/react";
import { useCustomSearchParams } from "./useCustomSearchParams";
import { useSearchParams } from "react-router";

jest.mock("react-router", () => ({
  useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;

describe("useCustomSearchParams", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the correct value for a search parameter", () => {
    const mockParams = new URLSearchParams("key1=value1&key2=value2");
    const setParamsMock = jest.fn();

    mockUseSearchParams.mockReturnValue([mockParams, setParamsMock]);

    const { result } = renderHook(() => useCustomSearchParams());

    expect(result.current.getParam("key1")).toBe("value1");
    expect(result.current.getParam("key2")).toBe("value2");
    expect(result.current.getParam("key3")).toBeNull();
  });

  test("sets a search parameter correctly", () => {
    const mockParams = new URLSearchParams("key1=value1");
    const setParamsMock = jest.fn((updateFn) => {
      const updatedParams = updateFn(mockParams);
      mockParams.set("key2", "value2"); // Simulate mutation
      return updatedParams;
    });

    mockUseSearchParams.mockReturnValue([mockParams, setParamsMock]);

    const { result } = renderHook(() => useCustomSearchParams());

    act(() => {
      result.current.setParam("key2", "value2");
    });

    expect(setParamsMock).toHaveBeenCalled();
    expect(mockParams.get("key2")).toBe("value2");
  });

  test("deletes a search parameter correctly", () => {
    const mockParams = new URLSearchParams("key1=value1&key2=value2");
    const setParamsMock = jest.fn((updateFn) => {
      const updatedParams = updateFn(mockParams);
      mockParams.delete("key2"); // Simulate deletion
      return updatedParams;
    });

    mockUseSearchParams.mockReturnValue([mockParams, setParamsMock]);

    const { result } = renderHook(() => useCustomSearchParams());

    act(() => {
      result.current.deleteParam("key2");
    });

    expect(setParamsMock).toHaveBeenCalled();
    expect(mockParams.get("key2")).toBeNull();
  });

  test("returns the correct params string", () => {
    const mockParams = new URLSearchParams("key1=value1&key2=value2");
    const setParamsMock = jest.fn();

    mockUseSearchParams.mockReturnValue([mockParams, setParamsMock]);

    const { result } = renderHook(() => useCustomSearchParams());

    expect(result.current.paramsString).toBe("key1=value1&key2=value2");
  });
});
