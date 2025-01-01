import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FoundGameCard from "./FoundGameCard";
import { useGameSearch } from "@/Hooks/useGameSearch";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const result = useGameSearch(search, 500);

  console.log(result)

  return (
    <div className="grow flex justify-center items-start p-8">
      <div className="min-w-[600px] max-w-[1000px] p-4 grid gap-4">
        <Label className="text-xl"> Search: </Label>
        <Input
          placeholder="Enter game name"
          className=""
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}/>
        <div className="flex flex-col gap-2">
          {
            result.map((gameInfo, idx) => {
              return (
                <FoundGameCard gameInfo={gameInfo} key={idx}/>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}