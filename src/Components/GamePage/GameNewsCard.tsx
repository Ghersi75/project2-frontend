import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { useState } from "react";
import { Link } from "react-router";
// https://github.com/tada5hi/bulletin-board-code
// Works well enough for this use case
import { Parser } from 'bulletin-board-code';

export default function GameNewsCard({ item }: any) {
  const [showMore, setShowMore] = useState(false);
  const parser = new Parser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {item.title}
        </CardTitle>
        <CardDescription>
          {item.feedlabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {/* TODO: Find a better way if there's time */}
        {/* Not smart to do, but since this is returned from the steam api we'll trust it */}
        <div dangerouslySetInnerHTML={ item.feedlabel == "Community Announcements" ? {__html: parser.fromBBCode(item.contents)} : { __html: item.contents }} className={`overflow-hidden ${showMore ? "" : "line-clamp-3"}`} />
        <Button variant="link" className="text-blue-500 justify-self-end" onClick={() => { setShowMore(prev => !prev) }}> {showMore ? "Show less" : "Show more"} </Button>
      </CardContent>
      <CardFooter className="">
        <Link to={item.url}>
          <Button variant="secondary"> View Source </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}