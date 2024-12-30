import { GameScreenshotType } from "@/Types/GameAPIReturnTypes";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function GameScreenshots({ screenshots }: { screenshots: GameScreenshotType[] }) {
  return (
    <Carousel className="rounded-xl w-[1000px] hover:cursor-pointer">
      <CarouselContent className="">
        {screenshots.map((img, idx) => {
          return (
            <CarouselItem>
              <img src={img.path_full} key={idx} className="rounded-xl aspect-video" />
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}