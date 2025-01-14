import { renderHook } from "@testing-library/react";
import { useViewThreads } from "./useViewThreads";
import { useCustomSearchParams } from "./useCustomSearchParams";

jest.mock("./useCustomSearchParams");

const mockGetParam = jest.fn();
const mockSetParam = jest.fn();
const mockDeleteParam = jest.fn();

describe("useViewThreads", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCustomSearchParams as jest.Mock).mockReturnValue({
      getParam: mockGetParam,
      setParam: mockSetParam,
      deleteParam: mockDeleteParam,
    });
  });

  test("returns `viewThreads` as true when the 'viewThreads' param exists", () => {
    mockGetParam.mockReturnValue("true");

    const { result } = renderHook(() => useViewThreads());

    expect(result.current.viewThreads).toBe(true);
    expect(mockGetParam).toHaveBeenCalledWith("viewThreads");
  });

  test("returns `viewThreads` as false when the 'viewThreads' param does not exist", () => {
    mockGetParam.mockReturnValue(null);

    const { result } = renderHook(() => useViewThreads());

    expect(result.current.viewThreads).toBe(false);
    expect(mockGetParam).toHaveBeenCalledWith("viewThreads");
  });

  test("calls `setParam` when setting viewThreads to true", () => {
    const { result } = renderHook(() => useViewThreads());

    result.current.setViewThreads(true);

    expect(mockSetParam).toHaveBeenCalledWith("viewThreads", "true");
    expect(mockDeleteParam).not.toHaveBeenCalled();
  });

  test("calls `deleteParam` when setting viewThreads to false", () => {
    const { result } = renderHook(() => useViewThreads());

    result.current.setViewThreads(false);

    expect(mockDeleteParam).toHaveBeenCalledWith("viewThreads");
    expect(mockSetParam).not.toHaveBeenCalled();
  });
});
