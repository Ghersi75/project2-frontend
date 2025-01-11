import { GameSearchType } from "@/Types/GameAPIReturnTypes";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router";

export default function FoundGameCard({ gameInfo }: { gameInfo: GameSearchType }) {
  return (
    <Link to={`/${gameInfo.appid}`}>
      <Card className="flex overflow-hidden">
        <CardHeader className="p-0 flex-row w-full flex items-center">
          <img src={gameInfo.logo} className="" />
          <CardTitle className="px-4">
            {gameInfo.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}