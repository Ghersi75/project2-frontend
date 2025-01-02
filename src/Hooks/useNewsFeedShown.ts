import { NewsFeedShownContext } from "@/Contexts/NewsFeedShownProvider";
import { useContext } from "react";

export default function useNewsFeedShown() {
  const ctx = useContext(NewsFeedShownContext);

  if (ctx == null) {
    throw new Error("useNewsFeedShown must be used within a NewsFeedShownContext parent component");
  }

  const { newsFeedShown, setNewsFeedShown } = ctx;

  return { newsFeedShown, setNewsFeedShown };
}