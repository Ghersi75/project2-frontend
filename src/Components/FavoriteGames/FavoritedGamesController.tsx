import axios from "axios";
import RedirectIfNotLoggedIn from "../RouteGuards/RedirectIfNotLoggedIn";
import FavoritedGames from "./FavoritedGames";
import { useEffect, useState } from "react";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";

export default function FavoritedGamesController() {
  const [games, setGames] = useState<FavoriteGameType[]>([]);
  const { loading, userInfo } = useUserInfo();

  useEffect(() => {
    if (userInfo == null) {
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND}/game/favorites?username=${userInfo.username}`)
      .then(res => {
        console.log(res)
        setGames(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [loading])

  return (
    <RedirectIfNotLoggedIn>
      <FavoritedGames
        games={games} />
    </RedirectIfNotLoggedIn>
  )
}