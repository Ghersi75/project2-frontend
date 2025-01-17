import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Badge } from "../ui/badge";
import { GamePageGameInfo } from "@/Types/GameAPIReturnTypes";
import { Button } from "../ui/button";
import GameScreenshots from "./GameScreenshots";
import GameMovies from "./GameMovies";
import GamePriceBadge from "./GamePriceBadge";
import GamePageSidebar from "./GamePageSidebar";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { capitalizeFirst } from "@/lib/utils";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useGamePageInfo } from "@/Hooks/useGamePageInfo";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function GamePage() {
  const { appId } = useParams();
  const navigate = useNavigate();
  const [gameInfo, setGameInfo] = useState<GamePageGameInfo>();
  const [favorited, setFavorited] = useState<boolean | null>(null)
  const { userInfo } = useUserInfo();
  const { defaultOptions } = useDefaultRequestOptions();
  const { setGameName } = useGamePageInfo();
  const VITE_STEAM_APP_DETAILS = useEnvironmentVariable("VITE_STEAM_APP_DETAILS");
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND");

  if (appId == undefined) {
    return;
  }

  useEffect(() => {
    // TODO: Don't forget to update link
    // cors anywhere gets rid of annoying cors errors during development
    axios.get(`${VITE_STEAM_APP_DETAILS}?appids=${appId}`)
      .then(res => {
        if (res.data[appId].success == false) {
          // Return to home page if no game is found with given appId
          navigate("/");
        }

        const platforms: {
          windows: boolean,
          linux: boolean,
          mac: boolean
        } = res.data[appId].data.platforms;

        const filtered = Object.entries(platforms)
          // Filter by availability first
          .filter(([_, availability]) => availability)
          // Save only the platform if available and capitalize first letter
          .map(([platform, _]) => capitalizeFirst(platform))

        setGameInfo({
          ...res.data[appId].data,
          thumbnailLink: res.data[appId].data.header_image,
          availableOn: filtered
        })

        setGameName(res.data[appId].data.name)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (userInfo == null) {
      return;
    }

    axios.get(`${VITE_BACKEND}/game/favorites/${appId}?username=${userInfo.username}`)
      .then((res) => {
        console.log("here")
        setFavorited(res.data.favorited)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [userInfo])

  if (gameInfo == undefined) {
    return;
  }

  const handleSetFavorite = () => {
    if (userInfo == null) {
      return
    }
    if (favorited) {
      // Delete favorite
      axios.delete(`${VITE_BACKEND}/game/favorites?username=${userInfo.username}&appid=${appId}`, defaultOptions)
        .then((_) => {
          setFavorited(prev => !prev)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      // Create favorite
      const body = {
        appId: appId,
        name: gameInfo.name,
        thumbnailLink: gameInfo.thumbnailLink,
        availableOn: gameInfo.availableOn
      }

      axios.post(`${VITE_BACKEND}/game/favorites?username=${userInfo.username}&appid=${appId}`, body, defaultOptions)
        .then((_) => {
          setFavorited(prev => !prev)
        })
        .catch(err => {
          console.error(err)
        })
    }

  }

  return (
    <div className="flex flex-row grow">
      <div className="grow flex justify-center p-4 max-h-svh overflow-scroll">
        <div className="max-w-[1000px] flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl"> {gameInfo.name} </h1>
              <div className="flex gap-2">
                {gameInfo.genres?.map((genre, idx) => {
                  return (
                    <Badge variant="secondary" key={idx}>
                      {genre.description}
                    </Badge>
                  )
                })}
              </div>
            </div>
            {
              userInfo != null &&
              <Button variant="outline" className="items-center hover:underline" onClick={handleSetFavorite}>
                {
                  favorited ?
                    <>
                      Unfavorite game: <BiSolidBookmark />
                    </>
                    :
                    <>
                      Favorite game: <BiBookmark />
                    </>
                }
              </Button>
            }
          </div>
          {
            gameInfo.screenshots && gameInfo.screenshots.length > 0 &&
            <GameScreenshots screenshots={gameInfo.screenshots} />
          }

          {
            gameInfo.movies && gameInfo.movies.length > 0 &&
            <GameMovies movies={gameInfo.movies} />
          }

          <div className={gameInfo.price_overview ? "flex justify-between" : "grid"}>
            {gameInfo.price_overview && <GamePriceBadge priceOverview={gameInfo.price_overview} />}
            <Link to={`https://store.steampowered.com/app/${appId}`} className={gameInfo.price_overview ? "" : "justify-self-end"}>
              <Button variant="secondary"> View On Steam </Button>
            </Link>
          </div>
        </div>
      </div>
      <GamePageSidebar />
    </div>
  )
}