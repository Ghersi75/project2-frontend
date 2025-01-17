import { GamePageContext } from "@/Contexts/GamePageContext"
import { useContext } from "react"

export const useGamePageInfo = () => {
  const ctx = useContext(GamePageContext)
  if (!ctx) {
    throw new Error("GamePageContext must be used within a GamePageProvider component")
  }

  return { ...ctx };
}