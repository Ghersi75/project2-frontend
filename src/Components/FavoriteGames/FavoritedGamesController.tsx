import axios from "axios";
import RedirectIfNotLoggedIn from "../RouteGuards/RedirectIfNotLoggedIn";
import FavoritedGames from "./FavoritedGames";
import { useEffect, useState } from "react";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function FavoritedGamesController() {
  const [games, setGames] = useState<FavoriteGameType[]>([]);
  const { loading, userInfo } = useUserInfo();
  const { defaultOptions } = useDefaultRequestOptions();
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND")

  useEffect(() => {
    if (userInfo == null) {
      return;
    }

    axios.get(`${VITE_BACKEND}/game/favorites?username=${userInfo.username}`)
      .then(res => {
        setGames(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [loading])

  const handleUnfavorite = (appId: number) => {
    if (userInfo == null) {
      return;
    }
    axios.delete(`${VITE_BACKEND}/game/favorites?username=${userInfo.username}&appid=${appId}`, defaultOptions)
      .then(() => {
        setGames(prev => {
          return prev.filter(item => {
            if (item.appId != appId) {
              return item
            }
          })
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <RedirectIfNotLoggedIn>
      <FavoritedGames
        games={games}
        handleUnfavorite={handleUnfavorite} />
    </RedirectIfNotLoggedIn>
  )
}