import { useUserInfo } from "@/Hooks/useUserInfo";
import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteGameCard from "./FavoriteGameCard";

export default function FavoriteGames() {
  const [games, setGames] = useState<FavoriteGameType[]>([]);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (userInfo == null) {
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND}/game/favorites?username=${userInfo.username}`)
      .then(res => {
        setGames(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [userInfo])

  return (
    <div className="grow p-8 flex flex-col gap-4">
      <h1 className="text-3xl"> Your favorites </h1>
      <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
        {
          games.map(item => {
            return (
              <FavoriteGameCard item={item} key={item.id} />
            )
          })
        }
      </div>
    </div>
  )
}