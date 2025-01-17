import { renderHook } from "@testing-library/react";
import { useDefaultRequestOptions } from "./useDefaultRequestOptions";
import { useAuthToken } from "./useAuthToken";

jest.mock("./useAuthToken");

const mockUseAuthToken = useAuthToken as jest.Mock;

describe("useDefaultRequestOptions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns default request options with the auth token", () => {
    const mockAuthToken = "Bearer test-token";
    mockUseAuthToken.mockReturnValue({ authToken: mockAuthToken });

    const { result } = renderHook(() => useDefaultRequestOptions());

    expect(result.current.defaultOptions).toEqual({
      headers: {
        "Content-Type": "application/json",
        "Authorization": mockAuthToken,
      },
      withCredentials: true,
    });
  });

  test("handles empty auth token", () => {
    mockUseAuthToken.mockReturnValue({ authToken: "" });

    const { result } = renderHook(() => useDefaultRequestOptions());

    expect(result.current.defaultOptions).toEqual({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "",
      },
      withCredentials: true,
    });
  });

  test("updates when the auth token changes", () => {
    const mockAuthToken = "Bearer updated-token";
    mockUseAuthToken.mockReturnValue({ authToken: mockAuthToken });

    const { result } = renderHook(() => useDefaultRequestOptions());

    expect(result.current.defaultOptions.headers.Authorization).toBe(
      "Bearer updated-token"
    );
  });
});
