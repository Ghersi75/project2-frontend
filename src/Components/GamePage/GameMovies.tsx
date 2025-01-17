import { GameMovieType } from "@/Types/GameAPIReturnTypes";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function GameMovies({ movies }: { movies: GameMovieType[] }) {
  return (
    <Carousel className="rounded-xl max-w-[1000px] hover:cursor-pointer">
      <CarouselContent>
        {movies.map((movie, idx) => {
          return (
            <CarouselItem key={idx}>
              <h1 className="p-4 text-lg"> {movie.name} </h1>
              <video controls>
                <source src={movie.mp4.max} type="video/mp4" />
                <source src={movie.webm.max} type="video/webm" />
              </video>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}