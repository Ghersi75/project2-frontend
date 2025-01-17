import { GameScreenshotType } from "@/Types/GameAPIReturnTypes";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function GameScreenshots({ screenshots }: { screenshots: GameScreenshotType[] }) {
  return (
    <Carousel className="rounded-xl max-w-[1000px] hover:cursor-pointer">
      <CarouselContent className="">
        {screenshots.map((img, idx) => {
          return (
            <CarouselItem key={idx}>
              <img src={img.path_full} className="rounded-xl aspect-video" />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}