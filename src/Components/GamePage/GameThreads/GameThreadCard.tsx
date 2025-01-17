import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useRef, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { GameThreadCardProps } from "@/Types/GameThreadsTypes";
import { Button } from "@/Components/ui/button";
import { useIsVisible } from "@/Hooks/useIsVisible";
import { useCustomSearchParams } from "@/Hooks/useCustomSearchParams";

export default function GameThreadCard({
  canInteract,
  canEdit,
  canDelete,
  handleInteraction,
  liked,
  reviewId,
  displayName,
  username,
  content,
  setContent,
  handleUpdateReview,
  handleDeleteReview,
  likes,
  dislikes,
  postedAt,
}: GameThreadCardProps) {
  const { getParam, setParam, deleteParam } = useCustomSearchParams();
  const threadScrollRef = useRef<null | HTMLDivElement>(null);
  const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const isVisible = useIsVisible(threadScrollRef);


  let cantInteractStyle = "hover:fill-muted";
  let likedStyle = "";
  let dislikedStyle = "";

  if (canInteract) {
    likedStyle = `hover:cursor-pointer ${liked == true ? "fill-red-500 hover:fill-current" : "hover:fill-red-500"}`;
    dislikedStyle = `hover:cursor-pointer ${liked == false ? "fill-blue-500 hover:fill-current" : "hover:fill-blue-500"}`;
  }

  const threadId = getParam("threadId");

  useEffect(() => {
    if (textAreaRef.current == null || !editing) {
      return;
    }

    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [editing, content])

  useEffect(() => {
    if (threadScrollRef.current == null) {
      return;
    }

    if (threadId == reviewId.toString()) {
      threadScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [])

  useEffect(() => {
    if (isVisible && threadId == reviewId.toString()) {
      setHighlight(true);
    }
  }, [isVisible])

  // If user interacts with a review, keep track of it so if page is refreshed it goes to it
  // https://stackoverflow.com/a/74892042
  const updateThreadId = () => {
    setParam("threadId", reviewId.toString())
  }

  const clearThreadId = () => {
    deleteParam("threadId")
  }

  return (
    // Highlight last interacted with or thread linked to
    <Card ref={threadScrollRef} className={highlight ? "animate-highlight" : ""}>
      <CardHeader>
        <CardTitle>
          {displayName}
        </CardTitle>
        <CardDescription>
          @{username}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid w-full overflow-hidden break-all whitespace-normal break-anywhere">
        {
          editing ?
            // Shadcn Input being a pain so html input without styles was easier to change
            <textarea
              value={content}
              ref={textAreaRef}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="bg-background border-none focus:outline-none focus:ring-0 h-full"
              rows={1} />
            :
            <div className="">
              {content}
            </div>
        }
        {
          canEdit &&
          <Button
            disabled={editing && (content == "" || content.length > 500)}
            variant="ghost"
            className="text-xs text-muted-foreground justify-self-end w-fit h-fit p-0 hover:underline hover:bg-transparent"
            onClick={editing ? () => {
              updateThreadId();
              // Confirm
              handleUpdateReview()
              setEditing(prev => !prev)
            } : () => {
              updateThreadId();
              // Edit
              setEditing(prev => !prev)
            }}>
            {editing ? "confirm" : "edit"}
          </Button>
        }

      </CardContent>
      <CardFooter className="flex flex-col gap-1 justify-start items-start">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row justify-center items-center gap-1">
            <BiUpvote data-testid="BiUpvote-icon" className={canInteract ? likedStyle : cantInteractStyle} onClick={!canInteract ? undefined : () => {
              updateThreadId();
              handleInteraction(true)
            }} /> {likes}
          </div>
          <div className="flex flex-row justify-center items-center gap-1">
            <BiDownvote data-testid="BiDownvote-icon" className={canInteract ? dislikedStyle : cantInteractStyle} onClick={!canInteract ? undefined : () => {
              updateThreadId();
              handleInteraction(false)
            }} /> {dislikes}
          </div>
        </div>
        <div className={`${postedAt != "" ? "flex flex-row justify-between w-full items-center" : "grid"}`}>
          {
            postedAt != "" &&
            <h1 className="text-xs text-muted-foreground"> {postedAt} </h1>
          }
          {
            canDelete ?
              deleting ?
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-xs text-muted-foreground hover:underline p-0 hover:bg-transparent" onClick={() => {
                    updateThreadId();
                    setDeleting(prev => !prev)
                  }}>
                    cancel
                  </Button>
                  <Button variant="ghost" className="text-xs text-destructive hover:underline p-0 hover:bg-transparent" onClick={() => {
                    handleDeleteReview();
                    clearThreadId();
                  }}>
                    confirm
                  </Button>
                </div>
                :
                <Button variant="ghost" className="text-xs text-destructive hover:underline p-0 hover:bg-transparent" onClick={() => {
                  updateThreadId();
                  setDeleting(prev => !prev)
                }}>
                  delete
                </Button>
              :
              null
          }
        </div>
      </CardFooter>
    </Card>
  )
}