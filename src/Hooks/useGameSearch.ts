import { useEffect, useState } from "react";
import axios from "axios";
import { GameSearchType } from "@/Types/GameAPIReturnTypes";
import { useSaveGameSearch } from "./useSaveGameSearch";
import { useEnvironmentVariable } from "./useEnvironmentVariable";

// https://stackoverflow.com/questions/77123890/debounce-in-reactjs
export const useGameSearch = (search: string, delay: number) => {
  const [gamesFound, setGamesFound] = useState<GameSearchType[]>([]);
  const [searching, setSearching] = useState<boolean | null>(null);
  const { setSearchParam } = useSaveGameSearch();
  const VITE_STEAM_SEARCH = useEnvironmentVariable("VITE_STEAM_SEARCH")

  useEffect(() => {
    if (search == "") {
      setSearching(null);
      return;
    }
    setSearching(true);
    const handler = setTimeout(async () => {
      await axios.get(`${VITE_STEAM_SEARCH}${search}`)
        .then(res => {
          setGamesFound(res.data)
          // Save search on each successful search with at least 1 result
          if (res.data.length > 0) {
            setSearchParam(search)
          }
        })
        .catch(err => console.error(err))
        .finally(() => setSearching(false));
    }, delay);

    return (() => {
      clearTimeout(handler);
    })
  }, [search]);

  return { searching, gamesFound };
}