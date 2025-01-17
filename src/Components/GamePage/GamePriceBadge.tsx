import { GamePriceOverviewType } from "@/Types/GameAPIReturnTypes";
import { Badge } from "../ui/badge";

export default function GamePriceBadge({ priceOverview }: { priceOverview: GamePriceOverviewType }) {
  return (
    <Badge variant="outline" className="text-sm">
      Current Price: {priceOverview.final_formatted}
      {priceOverview.discount_percent > 0 &&
        <>
          <span className="pl-1 text-gray-400 line-through text-xs"> {priceOverview.initial_formatted} </span>
          <span className="pl-1 text-green-600"> {`(-${priceOverview.discount_percent}%)`} </span>
        </>
      }
    </Badge>

  )
}