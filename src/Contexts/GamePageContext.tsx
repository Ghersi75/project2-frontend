import { createContext, ReactNode, useState } from "react"

interface GamePageContextType {
  gameName: string,
  setGameName: React.Dispatch<React.SetStateAction<string>>
}

export const GamePageContext = createContext<GamePageContextType | null>(null);

export const GamePageProvider = ({ children }: { children: ReactNode }) => {
  const [gameName, setGameName] = useState("")

  return (
    <GamePageContext.Provider value={{ gameName, setGameName }}>
      {children}
    </GamePageContext.Provider>
  )
}