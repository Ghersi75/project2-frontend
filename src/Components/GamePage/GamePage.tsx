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
        if ( res.data[appId].data.success == false ) {
          // Return to home page if no game is found with given appId
          navigate("/");
        }
        console.log(res)
        setGameInfo(res.data[appId].data)
      })
      .catch(err => console.error(err))
  }, [])

  if ( gameInfo == undefined) {
    return ;
  }

  return (
    <div>
      {gameInfo.name}
      {gameInfo.genres.map((genre, idx) => {
        console.log(genre.description)
        return (
          <Badge key={idx}>
            {genre.description}
          </Badge>
        )
      })}
      <Carousel className="w-full max-w-screen-2xl">
        <CarouselContent>
          {gameInfo.screenshots.map((img, idx) => {
            return (
              <CarouselItem>
                <img src={img.path_full} key={idx} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel className="w-full max-w-screen-2xl">
        <CarouselContent>
          {gameInfo.movies.map((movie, idx) => {
            return (
              <CarouselItem>
                { movie.name }
                <video key={idx} controls>
                  <source src={movie.mp4.max} type="video/mp4"/>
                  <source src={movie.webm.max} type="video/webm"/>
                </video>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}