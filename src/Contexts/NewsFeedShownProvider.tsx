import { createContext, ReactNode, useState } from "react";

interface ContextType {
  newsFeedShown: boolean,
  setNewsFeedShown: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewsFeedShownContext = createContext<ContextType | null>(null);

export function NewsFeedShownProvider({ children }: { children: ReactNode }) {
  const [newsFeedShown, setNewsFeedShown] = useState(false);
  return (
    <NewsFeedShownContext.Provider value={{newsFeedShown, setNewsFeedShown}}>
      {children}
    </NewsFeedShownContext.Provider>
  )
}