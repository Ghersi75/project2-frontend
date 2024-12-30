import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { GamePageGameInfo } from "@/Types/GameAPIReturnTypes";

export default function GamePage() {
  const { appId } = useParams();
  const navigate = useNavigate();
  // TODO: Fix the type here
  const [gameInfo, setGameInfo] = useState<GamePageGameInfo>();

  if (appId == undefined) {
    return;
  }

  useEffect(() => {
    // TODO: Don't forget to update link
    // cors anywhere gets rid of annoying cors errors during development
    axios.get(`https://cors-anywhere.herokuapp.com/http://store.steampowered.com/api/appdetails?appids=${appId}`)
      .then(res => {
        if (res.data[appId].data.success == false) {
          // Return to home page if no game is found with given appId
          navigate("/");
        }
        console.log(res)
        setGameInfo(res.data[appId].data)
      })
      .catch(err => console.error(err))
  }, [])

  if (gameInfo == undefined) {
    return;
  }

  return (
    <div className="grow flex justify-center p-4">
      <div className="w-[1000px] flex flex-col gap-4">
        <h1 className="text-2xl"> {gameInfo.name} </h1>
        <div className="flex gap-2">
          {gameInfo.genres?.map((genre, idx) => {
            console.log(genre.description)
            return (
              <Badge variant="secondary" key={idx}>
                {genre.description}
              </Badge>
            )
          })}
        </div>
        <Carousel className="rounded-xl w-[1000px] hover:cursor-pointer">
          <CarouselContent className="">
            {gameInfo.screenshots.map((img, idx) => {
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

        <Carousel className="rounded-xl w-[1000px] hover:cursor-pointer">
          <CarouselContent>
            {gameInfo.movies?.map((movie, idx) => {
              return (
                <CarouselItem>
                  <h1 className="p-4 text-lg"> {movie.name} </h1>
                  <video key={idx} controls>
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

        <div className="flex">
          <Badge className="text-sm">
            Current Price: {gameInfo.price_overview.final_formatted}
            {gameInfo.price_overview.discount_percent > 0 &&
            <>
              <span className="pl-1 text-gray-400 line-through text-xs"> {gameInfo.price_overview.initial_formatted} </span>
              <span className="pl-1 text-green-600"> {`(-${gameInfo.price_overview.discount_percent}%)`} </span>
            </>
            }
          </Badge>
        </div>
      </div>
    </div>
  )
}