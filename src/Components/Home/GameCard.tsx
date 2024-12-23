import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { GameInfoType } from "./Home";

function formatAmount(amount: number): string {
  return `$${(amount/100).toFixed(2)}`
}

export default function GameCard({ item }: { item: GameInfoType }) {
  return (
    <Card className="w-[350px]">
      <CardContent className="px-4">
        <CardHeader className="gap-4 pt-8">
          <img src={item.large_capsule_image} className="rounded-md" />
          <CardTitle> {item.name} </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between items-center pb-2">
          {
            item.discounted ?
              <h1> {formatAmount(item.final_price)} { item.original_price && <span className="text-zinc-500 text-xs"> {formatAmount(item.original_price)} </span> } <span className="text-zinc-300 text-sm"> (-{item.discount_percent}%) </span> </h1> :
              <h1> No price info </h1>
          }
          {/* Fix link to */}
          <Button variant="outline"> <Link to={`https://store.steampowered.com/app/${item.id}`}> View More</Link> </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}