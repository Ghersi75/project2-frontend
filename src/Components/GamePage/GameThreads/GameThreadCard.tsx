import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useRef } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useSearchParams } from "react-router";
import { format } from "date-fns"
import { GameThreadCardProps } from "@/Types/GameThreadsTypes";
import { Button } from "@/Components/ui/button";

export default function GameThreadCard({
  canInteract,
  handleInteraction,
  liked,
  reviewId,
  displayName,
  username,
  content,
  likes,
  dislikes,
  postedAt,
}: GameThreadCardProps) {
  const [searchParams] = useSearchParams();
  const ref = useRef<null | HTMLDivElement>(null);


  let cantInteractStyle = "hover:fill-muted";
  let likedStyle = "";
  let dislikedStyle = "";

  if (canInteract) {
    likedStyle = `hover:cursor-pointer ${liked == true ? "fill-red-500 hover:fill-current" : "hover:fill-red-500"}`;
    dislikedStyle = `hover:cursor-pointer ${liked == false ? "fill-blue-500 hover:fill-current" : "hover:fill-blue-500"}`;
  }

  const threadId = searchParams.get("threadId");

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    if (threadId == reviewId.toString()) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [threadId])

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>
          {displayName}
        </CardTitle>
        <CardDescription>
          @{username}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">
        <div>
          {content}
        </div>
        <Button variant="ghost" className="text-xs text-muted-foreground text-end hover:cursor-pointer hover:underline p-0 justify-self-end">
          edit
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-1 justify-start items-start">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row justify-center items-center gap-1">
            <BiUpvote className={canInteract ? likedStyle : cantInteractStyle} onClick={!canInteract ? undefined : () => handleInteraction(true)} /> {likes}
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <BiDownvote className={canInteract ? dislikedStyle : cantInteractStyle} onClick={!canInteract ? undefined : () => handleInteraction(false)} /> {dislikes}
          </div>
        </div>
        {
          postedAt != "" &&
          <h1 className="text-xs text-muted-foreground"> {format(postedAt, "hh:mm aaa - MMM dd yyyy")} </h1>
        }
      </CardFooter>
    </Card>
  )
}