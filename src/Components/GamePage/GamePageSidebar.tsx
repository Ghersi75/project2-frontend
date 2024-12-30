import { useState } from "react";
import { useParams } from "react-router";
import { Button } from "../ui/button";
import GameNews from "./GameNews/GameNews";

export default function GamePageSidebar() {
  const [pageSelected, setPageSelected] = useState<"news" | "threads">("news");
  const { appId } = useParams();

  if (appId == undefined) {
    return;
  }

  const handlePageSelectedClick = (page: "news" | "threads") => {
    if (page == pageSelected) {
      return ;
    }

    setPageSelected(page);
  }

  return (
    <div className="w-[400px] max-h-svh bg-secondary/20 justify-self-end bg-opacity-10 p-4 flex flex-col overflow-scroll gap-4">
      <div className="flex flex-row gap-4">
        <Button variant={pageSelected == "news" ? "outline" : "ghost"} onClick={() => { handlePageSelectedClick("news") }}> News </Button>
        <Button variant={pageSelected == "threads" ? "outline" : "ghost"} onClick={() => { handlePageSelectedClick("threads") }} > Threads </Button>
      </div>
      {pageSelected == "news" && <GameNews />}
      {pageSelected == "threads" &&
        <>
          Threads
        </>
      }
    </div>
  )
}