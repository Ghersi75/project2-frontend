import { Label } from "@/Components/ui/label";
import GameNewsCard from "./GameNewsCard";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { GameNewsType } from "@/Types/GameAPIReturnTypes";

export default function GameNews({
  isLoading,
  news
}: {
  isLoading: boolean,
  news: GameNewsType[]
}) {
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