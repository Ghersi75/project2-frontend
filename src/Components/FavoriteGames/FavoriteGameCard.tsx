import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";

export default function GameCard({
  item,
  handleUnfavorite
}: {
  item: FavoriteGameType
  handleUnfavorite: (appId: number) => void
}) {
  return (
    <Card className="3xl:w-[500px] w-[400px] p-0 overflow-hidden">
      <CardContent className="p-0">
        <CardHeader className="p-0">
          <img src={item.thumbnailLink} />
          <CardTitle className="p-4 flex flex-col gap-2">
            {item.name}
            <br />
            <h3 className="text-xs text-gray-400"> Available on: </h3>
            <div className="flex gap-2">
              {
                item.availableOn.map((available, idx) => {
                  return <Badge variant="secondary" className="w-fit" key={idx}> {available} </Badge>
                })
              }
            </div>
            <div className="grid">
              <Button variant="outline" className="items-center hover:underline w-fit" onClick={() => handleUnfavorite(item.appId)}>
                Unfavorite game
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          <Button variant="secondary"> <Link to={`https://store.steampowered.com/app/${item.appId}`}> View On Steam </Link> </Button>
          <Button variant="secondary"> <Link to={`/${item.appId}`}> View More</Link> </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}