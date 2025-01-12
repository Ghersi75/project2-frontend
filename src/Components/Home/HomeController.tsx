import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";
import Home from "./Home";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeController() {
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
    <Home
      specials={specials}
      topSellers={topSellers}
      newReleases={newReleases}
      comingSoon={comingSoon} />
  )
}