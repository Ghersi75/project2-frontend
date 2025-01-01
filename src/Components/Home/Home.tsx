import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "./GameCard";
import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";

export default function Home() {
  const [specials, setSpecials] = useState<HomeGameInfoType[]>([]);
  const [topSellers, setTopSellers] = useState<HomeGameInfoType[]>([]);
  const [newReleases, setNewReleases] = useState<HomeGameInfoType[]>([]);
  const [comingSoon, setComingSoon] = useState<HomeGameInfoType[]>([]);
  // const [topSellers, setSpecials] = useState<GameInfoType[]>([]);
  // const [specials, setSpecials] = useState<GameInfoType[]>([]);

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://store.steampowered.com/api/featuredcategories/`)
      .then(res => {
        setSpecials(res.data.specials.items);
        setTopSellers(res.data.top_sellers.items);
        setNewReleases(res.data.new_releases.items);
        setComingSoon(res.data.coming_soon.items);
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  // useEffect(() => {
  //   if (search == "") {
  //     return;
  //   }

  //   const timer = setTimeout(async () => {
  //     axios.get(`https://cors-anywhere.herokuapp.com/https://steamcommunity.com/actions/SearchApps/${search}`, {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //       }
  //     })
  //       .then(res => {
  //         console.log(res.data)
  //         setSearchResults(res.data)
  //       })
  //       .catch(err => console.error(err));
  //   }, 1000)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [search])

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // }

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     // console.log("Enter");
  //     axios.get(`https://cors-anywhere.herokuapp.com/https://steamcommunity.com/actions/SearchApps/${search}`, {
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //       }
  //     })
  //       .then(res => {
  //         console.log(res.data)
  //         setSearchResults(res.data)
  //       })
  //       .catch(err => console.error(err));
  //   }
  // }

  return (
    <div className="grow p-8 flex flex-col gap-4">
      {/* <Input className="w-3/4" type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} onKeyDown={handleKeyPress} />
      {
        searchResults.map((item, idx) => {
          return (
            // https://stackoverflow.com/a/66180668
            <div key={idx}> {item.name}, {item.appId} <img src={item.logo} /> <img src={item.icon} /></div>
          )
        })
      } */}
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