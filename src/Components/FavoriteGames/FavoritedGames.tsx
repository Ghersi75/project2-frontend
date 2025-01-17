import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";
import FavoriteGameCard from "./FavoriteGameCard";

export default function FavoritedGames({
  games,
  handleUnfavorite
}: {
  games: FavoriteGameType[]
  handleUnfavorite: (appId: number) => void
}) {
  return (
    <div className="grow p-8 flex flex-col gap-4">
      {
        games.length == 0 ?
          <h1 className="text-3xl"> No favorited games found </h1>
          :
          <>
            <h1 className="text-3xl"> Your favorites </h1>
            <div className="grid gap-8 2xl:grid-cols-3 grid-cols-2 w-full justify-end">
              {
                games.map(item => {
                  return (
                    <FavoriteGameCard
                      item={item}
                      key={item.id}
                      handleUnfavorite={handleUnfavorite} />
                  )
                })
              }
            </div>
          </>
      }
    </div>
  )
}