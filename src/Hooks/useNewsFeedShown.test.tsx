import { renderHook } from "@testing-library/react";
import { useNewsFeedShown } from "./useNewsFeedShown";
import { NewsFeedShownContext } from "@/Contexts/NewsFeedShownProvider";

describe("useNewsFeedShown", () => {
  test("returns the correct context values when used within a provider", () => {
    const mockContextValue = {
      newsFeedShown: true,
      setNewsFeedShown: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <NewsFeedShownContext.Provider value={mockContextValue}>
        {children}
      </NewsFeedShownContext.Provider>
    );

    const { result } = renderHook(() => useNewsFeedShown(), { wrapper });

    expect(result.current.newsFeedShown).toBe(true);
    expect(result.current.setNewsFeedShown).toBe(mockContextValue.setNewsFeedShown);
  });

  test("throws an error when used outside of a provider", () => {
    try {
      // Attempt to render the hook outside of a provider
      renderHook(() => useNewsFeedShown());
    } catch (error) {
      // Assert that the error message is as expected
      expect(error).toEqual(
        new Error("useNewsFeedShown must be used within a NewsFeedShownContext parent component")
      );
    }
  });
});
