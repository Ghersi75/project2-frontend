import { useState } from "react";
import { useParams } from "react-router";
import { Button } from "../ui/button";
import { useNewsFeedShown } from "@/Hooks/useNewsFeedShown";
import { useViewThreads } from "@/Hooks/useViewThreads";
import GameNewsController from "./GameNews/GameNewsController";
import GameThreadsController from "./GameThreads/GameThreadsController";

export default function GamePageSidebar() {
  const { appId } = useParams();
  const { viewThreads, setViewThreads } = useViewThreads();
  // Render threads if search parameter is present
  const [pageSelected, setPageSelected] = useState<"news" | "threads">(viewThreads ? "threads" : "news");
  const { newsFeedShown } = useNewsFeedShown();

  if (appId == undefined) {
    return;
  }

  if (newsFeedShown) {
    return;
  }

  const handlePageSelectedClick = (page: "news" | "threads") => {
    if (page == pageSelected) {
      return;
    }

    if (page == "news") {
      setViewThreads(false)
    }

    if (page == "threads") {
      setViewThreads(true)
    }
    setPageSelected(page);
  }

  return (
    <div className="w-[400px] h-svh bg-secondary/20 justify-self-end bg-opacity-10 p-4 flex flex-col overflow-y-scroll overflow-x-hidden gap-4">
      <div className="flex flex-row gap-4">
        <Button variant={pageSelected == "news" ? "outline" : "ghost"} onClick={() => { handlePageSelectedClick("news") }}> News </Button>
        <Button variant={pageSelected == "threads" ? "outline" : "ghost"} onClick={() => { handlePageSelectedClick("threads") }} > Threads </Button>
      </div>
      {pageSelected == "news" && <GameNewsController />}
      {pageSelected == "threads" && <GameThreadsController />}
    </div>
  )
}