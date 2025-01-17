import { renderHook } from "@testing-library/react";
import { useUserInfo } from "./useUserInfo";
import { UserContext } from "@/Contexts/UserContext";
import { UserInfoContextType } from "@/Types/UserInfoTypes";

describe("useUserInfo", () => {
  test("returns the correct context values when used within a provider", () => {
    const mockContextValue: UserInfoContextType = {
      userInfo: {
        username: "testuser",
        userRole: "MODERATOR",
        displayName: "Test User",
      },
      logout: jest.fn(),
      loading: false,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserContext.Provider value={mockContextValue}>
        {children}
      </UserContext.Provider>
    );

    const { result } = renderHook(() => useUserInfo(), { wrapper });

    expect(result.current.userInfo?.username).toBe("testuser");
    expect(result.current.userInfo?.userRole).toBe("MODERATOR");
    expect(result.current.userInfo?.displayName).toBe("Test User");
    expect(result.current.logout).toBe(mockContextValue.logout);
    expect(result.current.loading).toBe(false);
  });

  test("throws an error when used outside of a provider", () => {
    expect(() => {
      renderHook(() => useUserInfo());
    }).toThrow(
      new Error("UserContext must be placed within a UserProvider component")
    );
  });
});
