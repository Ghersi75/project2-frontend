import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";

export default function Home() {
  const [specials, setSpecials] = useState<HomeGameInfoType[]>([]);
  const [topSellers, setTopSellers] = useState<HomeGameInfoType[]>([]);
  const [newReleases, setNewReleases] = useState<HomeGameInfoType[]>([]);
  const [comingSoon, setComingSoon] = useState<HomeGameInfoType[]>([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_STEAM_FEATURED)
      .then(res => {
        setSpecials(res.data.specials.items);
        setTopSellers(res.data.top_sellers.items);
        setNewReleases(res.data.new_releases.items);
        setComingSoon(res.data.coming_soon.items);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className="grow p-8 flex flex-col gap-4">
      <h1 className="text-3xl"> Current Specials </h1>
      <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
        {
          specials.map((item, idx) => {
            return (
              <GameCard item={item} key={idx} />
            )
          })
        }
      </div>
      <h1 className="text-2xl"> Top Sellers </h1>
      <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
        {
          topSellers.map((item, idx) => {
            return (
              <GameCard item={item} key={idx} />
            )
          })
        }
      </div>
      <h1 className="text-2xl"> New Releases </h1>
      <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
        {
          newReleases.map((item, idx) => {
            return (
              <GameCard item={item} key={idx} />
            )
          })
        }
      </div>
      <h1 className="text-2xl"> Coming Soon </h1>
      <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
        {
          comingSoon.map((item, idx) => {
            return (
              <GameCard item={item} key={idx} />
            )
          })
        }
      </div>
    </div>
  );
}