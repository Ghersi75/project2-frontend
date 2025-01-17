import { renderHook } from "@testing-library/react";
import { useGamePageInfo } from "./useGamePageInfo";
import { GamePageContext } from "@/Contexts/GamePageContext";
import { ReactNode } from "react";

describe("useGamePageInfo", () => {
  const mockContextValue = {
    gameName: "Test Game",
    setGameName: jest.fn(),
  };

  const wrapper = ({ children }: { children: ReactNode }) => (
    <GamePageContext.Provider value={mockContextValue}>
      {children}
    </GamePageContext.Provider>
  );

  test("returns the context value when used inside GamePageContext", () => {
    const { result } = renderHook(() => useGamePageInfo(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });

  test("throws an error when used outside GamePageContext", () => {
    try {
      renderHook(() => useGamePageInfo());
    } catch (error) {
      expect(error).toEqual(
        new Error("GamePageContext must be used within a GamePageProvider component")
      );
    }
  });
});
