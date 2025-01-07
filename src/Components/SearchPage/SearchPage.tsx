import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FoundGameCard from "./FoundGameCard";
import { useGameSearch } from "@/Hooks/useGameSearch";
import { useSaveGameSearch } from "@/Hooks/useSaveGameSearch";

export default function SearchPage() {
  const { searchParam } = useSaveGameSearch();
  const [search, setSearch] = useState(searchParam);
  const { searching, gamesFound } = useGameSearch(search, 500);

  console.log(gamesFound)

  return (
    <div className="grow flex justify-center items-start p-8">
      <div className="min-w-[600px] max-w-[1000px] p-4 grid gap-4">
        <Label className="text-xl"> Search: </Label>
        <Input
          placeholder="Enter game name"
          className=""
          value={search}
          onChange={(e) => { setSearch(e.target.value) }} />
        <div className="flex flex-col gap-2">
          {
            searching == true ?
              <h1> Searching... </h1>
              : searching == null && gamesFound.length == 0 ?
                // Empty search bar
                null
                : !searching && gamesFound.length == 0 ?
                  <h1>Nothing found</h1>
                  : gamesFound.length > 0 && gamesFound.map((gameInfo, idx) => {
                    return (
                      <FoundGameCard gameInfo={gameInfo} key={idx} />
                    )
                  })
          }
        </div>
      </div>
    </div>
  )
}