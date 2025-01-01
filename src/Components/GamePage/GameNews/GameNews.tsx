import { Label } from "@/Components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import GameNewsCard from "./GameNewsCard";
import { useParams } from "react-router";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { GameNewsType } from "@/Types/GameAPIReturnTypes";

export default function GameNews() {
  const [news, setNews] = useState<GameNewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { appId } = useParams();

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${appId}`)
      .then(res => {
        setNews(res.data.appnews.newsitems.filter((item: GameNewsType) => {
          // Filter out russian game magazine articles returned by steam api
          if ( item.feedlabel.toLocaleLowerCase() == "gamemag.ru") {
            return ;
          }

          return item;
        }))
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
      {
        isLoading ?
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>
                <Label> Loading... </Label>
              </CardTitle>
            </CardHeader>
          </Card>
          : news.length == 0 ?
            <Card className="w-fit">
              <CardHeader>
                <CardTitle>
                  <Label> No News Found </Label>
                </CardTitle>
              </CardHeader>
            </Card>
            :
            news.map((item, idx) => {
              return (
                <GameNewsCard item={item} key={idx} />
              )
            })
      }
    </>

  )
}