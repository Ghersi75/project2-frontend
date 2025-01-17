import { GameNewsType } from "@/Types/GameAPIReturnTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameNews from "./GameNews";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function GameNewsController() {
  const [news, setNews] = useState<GameNewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { appId } = useParams();
  const VITE_STEAM_NEWS = useEnvironmentVariable("VITE_STEAM_NEWS")

  useEffect(() => {
    axios.get(`${VITE_STEAM_NEWS}?appid=${appId}`)
      .then(res => {
        setNews(res.data.appnews.newsitems.filter((item: GameNewsType) => {
          // Filter out russian game magazine articles returned by steam api
          if (item.feedlabel.toLocaleLowerCase() == "gamemag.ru") {
            return;
          }

          return item;
        }) || [])
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <>
      <GameNews
        isLoading={isLoading}
        news={news} />
    </>
  )
}