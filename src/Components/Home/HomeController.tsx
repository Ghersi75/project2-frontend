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
    axios.get(process.env.VITE_STEAM_FEATURED || "")
      .then(res => {
        setSpecials(res.data?.specials.items || []);
        setTopSellers(res.data?.top_sellers.items || []);
        setNewReleases(res.data?.new_releases.items || []);
        setComingSoon(res.data?.coming_soon.items || []);
      })
      .catch(() => {
        // Just fallback to empty arrays and let display show that theres an error
        setSpecials([]);
        setTopSellers([]);
        setNewReleases([]);
        setComingSoon([]);
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