import { renderHook } from "@testing-library/react";
import { useCookies } from "react-cookie";
import { useAuthToken } from "./useAuthToken";

jest.mock("react-cookie");

const mockUseCookies = useCookies as jest.MockedFunction<typeof useCookies>;

describe("useAuthToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns the correct auth token initially", () => {
    mockUseCookies.mockReturnValue([
      { token: "test-token" },
      jest.fn(),
      jest.fn(),
      jest.fn()
    ]);

    const { result } = renderHook(() => useAuthToken());

    expect(result.current.authToken).toBe("Bearer test-token");
  });

  test("updates auth token when cookies.token changes", () => {
    const mockSetCookie = jest.fn();
    const cookies = { token: "initial-token" };

    mockUseCookies.mockReturnValue([
      cookies,
      jest.fn(),
      mockSetCookie,
      jest.fn()
    ]);

    const { result, rerender } = renderHook(() => useAuthToken());

    expect(result.current.authToken).toBe("Bearer initial-token");

    // Simulate a token change in cookies
    cookies.token = "updated-token";
    rerender();

    expect(result.current.authToken).toBe("Bearer updated-token");
  });

  test("handles undefined token gracefully", () => {
    mockUseCookies.mockReturnValue([
      {},
      jest.fn(),
      jest.fn(),
      jest.fn()
    ]);

    const { result } = renderHook(() => useAuthToken());

    expect(result.current.authToken).toBe("Bearer undefined");
  });
});
