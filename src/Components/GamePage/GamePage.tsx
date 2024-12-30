import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Badge } from "../ui/badge";
import { GamePageGameInfo } from "@/Types/GameAPIReturnTypes";
import { Button } from "../ui/button";
import GameScreenshots from "./GameScreenshots";
import GameMovies from "./GameMovies";
import GamePriceBadge from "./GamePriceBadge";

export default function GamePage() {
  const { appId } = useParams();
  const navigate = useNavigate();
  // TODO: Fix the type here
  const [gameInfo, setGameInfo] = useState<GamePageGameInfo>();

  if (appId == undefined) {
    return;
  }

  useEffect(() => {
    // TODO: Don't forget to update link
    // cors anywhere gets rid of annoying cors errors during development
    axios.get(`https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails?appids=${appId}`)
      .then(res => {
        if (res.data[appId].data.success == false) {
          // Return to home page if no game is found with given appId
          navigate("/");
        }
        console.log(res)
        setGameInfo(res.data[appId].data)
      })
      .catch(err => console.error(err))
  }, [])

  if (gameInfo == undefined) {
    return;
  }

  return (
    <div className="grow flex justify-center p-4 max-h-svh overflow-scroll">
      <div className="w-[1000px] flex flex-col gap-4">
        <h1 className="text-2xl"> {gameInfo.name} </h1>
        <div className="flex gap-2">
          {gameInfo.genres?.map((genre, idx) => {
            console.log(genre.description)
            return (
              <Badge variant="secondary" key={idx}>
                {genre.description}
              </Badge>
            )
          })}
        </div>
        {
          gameInfo.screenshots && gameInfo.screenshots.length > 0 &&
          <GameScreenshots screenshots={gameInfo.screenshots} />
        }

        {
          gameInfo.movies && gameInfo.movies.length > 0 &&
          <GameMovies movies={gameInfo.movies} />
        }

        <div className="flex justify-between">
          <GamePriceBadge priceOverview={gameInfo.price_overview} />
          <Link to={`https://store.steampowered.com/app/${appId}`}>
            <Button variant="secondary"> View On Steam </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}