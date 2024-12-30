import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameNewsCard from "./GameNewsCard";
import { Button } from "../ui/button";

export default function GamePageSidebar() {
  const [news, setNews] = useState<any>([]);
  const [pageSelected, setPageSelected] = useState<"news" | "threads">("news");
  const { appId } = useParams();

  if (appId == undefined) {
    return;
  }

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appId}`)
      .then(res => {
        console.log(res.data.appnews.newsitems)
        setNews(res.data.appnews.newsitems)
      })
      .then(err => {
        console.error(err)
      })
  }, []);

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
      {pageSelected == "news" && news.map((item, idx) => {
        return (
          <GameNewsCard item={item} key={idx} />
        )
      })}
      {pageSelected == "threads" &&
        <>
          Threads
        </>
      }
    </div>
  )
}