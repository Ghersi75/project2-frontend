import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";
import { Badge } from "../ui/badge";

function formatAmount(amount: number): string {
  return `$${(amount / 100).toFixed(2)}`
}

export default function GameCard({ item }: { item: HomeGameInfoType }) {
  return (
    <Card className="3xl:w-[500px] w-[400px] p-0 overflow-hidden">
      <CardContent className="p-0">
        <CardHeader className="p-0">
          <img
            src={item.large_capsule_image}
            alt={`${item.name} large capsule image`} />
          <CardTitle className="p-4 flex flex-col gap-2">
            {item.name}
            <br />
            <h3 className="text-xs text-gray-400"> Available on: </h3>
            <div className="flex gap-2">
              {item.windows_available && <Badge variant="secondary" className="w-fit"> Windows </Badge>}
              {item.mac_available && <Badge variant="secondary" className="w-fit"> Mac </Badge>}
              {item.linux_available && <Badge variant="secondary" className="w-fit"> Linux </Badge>}

            </div>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between items-center p-4 pt-0">
          {
            item.discounted ?
              <h1> {formatAmount(item.final_price)} {item.original_price && <span className="text-zinc-500 text-xs"> {formatAmount(item.original_price)} </span>} <span className="text-zinc-300 text-sm"> (-{item.discount_percent}%) </span> </h1> :
              <h1> No price info </h1>
          }
          {/* Fix link to */}

          <Button variant="secondary"> <Link to={`/${item.id}`}> View More</Link> </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}