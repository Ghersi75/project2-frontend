import GameCard from "./GameCard";
import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";

export default function Home({
  specials,
  topSellers,
  newReleases,
  comingSoon,
  loading
}: {
  specials: HomeGameInfoType[],
  topSellers: HomeGameInfoType[],
  newReleases: HomeGameInfoType[],
  comingSoon: HomeGameInfoType[],
  loading: boolean
}) {
  return (
    <div className="grow p-8 flex flex-col gap-4">
      {
        loading ?
          <h1 className="text-4xl"> Loading </h1>
          :
          specials.length == 0 &&
          topSellers.length == 0 &&
          newReleases.length == 0 &&
          comingSoon.length == 0 &&
          <h1 className="text-4xl"> Error fetching games, please try reloading the page </h1>
      }
      {
        specials.length > 0 &&
        <>
          <h1 className="text-4xl"> Current Specials </h1>
          <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
            {
              specials.map((item, idx) => {
                return (
                  <GameCard item={item} key={idx} />
                )
              })
            }
          </div>
        </>
      }
      {
        topSellers.length > 0 &&
        <>
          <h1 className="text-4xl mt-12"> Top Sellers </h1>
          <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
            {
              topSellers.map((item, idx) => {
                return (
                  <GameCard item={item} key={idx} />
                )
              })
            }
          </div>
        </>
      }
      {
        newReleases.length > 0 &&
        <>
          <h1 className="text-4xl mt-12"> New Releases </h1>
          <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
            {
              newReleases.map((item, idx) => {
                return (
                  <GameCard item={item} key={idx} />
                )
              })
            }
          </div>
        </>
      }
      {
        comingSoon.length > 0 &&
        <>
          <h1 className="text-4xl mt-12"> Coming Soon </h1>
          <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
            {
              comingSoon.map((item, idx) => {
                return (
                  <GameCard item={item} key={idx} />
                )
              })
            }
          </div>
        </>
      }
    </div>
  );
}