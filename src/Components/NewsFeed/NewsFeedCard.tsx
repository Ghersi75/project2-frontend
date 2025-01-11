import { NewsFeedItemType } from "./testData";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Link } from "react-router";
import { useNewsFeedShown } from "@/Hooks/useNewsFeedShown";

export default function NewsFeedCard({ info }: { info: NewsFeedItemType }) {
  const { setNewsFeedShown } = useNewsFeedShown();
  // Like/Dislike
  return (
    <Link reloadDocument to={`/${info.appId}?threadId=${info.threadId}&viewThreads`} onClick={() => { setNewsFeedShown(false) }}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Label className="hover:cursor-pointer">
              {
                // Like/Dislike
                "type" in info ?
                  // Liked/Dislike
                  `${info.username} ${info.type == "like" ? "liked" : "disliked"} your comment`
                  :
                  //Comment
                  `New comment posted`
              }
            </Label>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}