import { useEffect, useState } from "react";
import axios from "axios";
import { GameSearchType } from "@/Types/GameAPIReturnTypes";

// https://stackoverflow.com/questions/77123890/debounce-in-reactjs
export const useGameSearch = (search: string, delay: number) => {
  const [gamesFound, setGamesFound] = useState<GameSearchType[]>([]);
  useEffect(() => {
    if (search == "") {
      return;
    }

    const handler = setTimeout(async () => {
      await axios.get(`https://cors-anywhere.herokuapp.com/https://steamcommunity.com/actions/SearchApps/${search}`)
        .then((res) => setGamesFound(res.data));
    }, delay);

    return (() => {
      clearTimeout(handler);
    })
  }, [search]);

  return gamesFound;
}