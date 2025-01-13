import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";
import Home from "./Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function HomeController() {
  const [specials, setSpecials] = useState<HomeGameInfoType[]>([]);
  const [topSellers, setTopSellers] = useState<HomeGameInfoType[]>([]);
  const [newReleases, setNewReleases] = useState<HomeGameInfoType[]>([]);
  const [comingSoon, setComingSoon] = useState<HomeGameInfoType[]>([]);
  const [loading, setLoading] = useState(true)
  const VITE_STEAM_FEATURED = useEnvironmentVariable("VITE_STEAM_FEATURED")

  useEffect(() => {
    axios.get(VITE_STEAM_FEATURED || "")
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
      .finally(() => setLoading(false))
  }, []);
  return (
    <Home
      specials={specials}
      topSellers={topSellers}
      newReleases={newReleases}
      comingSoon={comingSoon}
      loading={loading} />
  )
}