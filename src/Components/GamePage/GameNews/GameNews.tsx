import { Label } from "@/Components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import GameNewsCard from "./GameNewsCard";
import { useParams } from "react-router";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { GameNewsType } from "@/Types/GameAPIReturnTypes";

export default function GameNews() {
  const [news, setNews] = useState<GameNewsType[]>([]);
  const { appId } = useParams();

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

  if (news.length == 0) {
    return (
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>
            <Label> No News Found </Label>
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <>
      {
        news.map((item, idx) => {
          return (
            <GameNewsCard item={item} key={idx} />
          )
        })
      }
    </>

  )
}