import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { useRef } from "react";
import { Link } from "react-router";
// https://github.com/tada5hi/bulletin-board-code
// Works well enough for this use case
import { Parser } from 'bulletin-board-code';
import { Label } from "../../ui/label";
import { formatTime } from "@/lib/utils";
import { useTruncatedElement } from "@/Hooks/useTruncatedElement";
import { GameNewsType } from "@/Types/GameAPIReturnTypes";

export default function GameNewsCard({ item }: { item: GameNewsType }) {
  const descriptionRef = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({ ref: descriptionRef });
  const parser = new Parser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {item.title}
        </CardTitle>
        <CardDescription className="flex justify-between">
          <Label> {item.feedlabel} </Label>
          <Label> {formatTime(item.date)} </Label>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {/* TODO: Find a better way if there's time */}
        {/* Not smart to do, but since this is returned from the steam api we'll trust it */}
        <div ref={descriptionRef} dangerouslySetInnerHTML={item.feedlabel == "Community Announcements" ? { __html: parser.fromBBCode(item.contents) } : { __html: item.contents }} className={`overflow-hidden ${isShowingMore ? "max-h-[500px] overflow-y-scroll" : "line-clamp-3 overflow-y-hidden"}`} />
        {isTruncated &&
          <Button variant="link" className="text-blue-500 justify-self-end" onClick={toggleIsShowingMore}> {isShowingMore ? "Show less" : "Show more"} </Button>
        }
      </CardContent>
      <CardFooter className="">
        <Link to={item.url}>
          <Button variant="secondary"> View Source </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}