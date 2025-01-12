import { Card, CardHeader, CardTitle } from "../ui/card";
import { Link } from "react-router";
import { useNewsFeedShown } from "@/Hooks/useNewsFeedShown";
import { NewsFeedItemType } from "@/Types/NotificationsTypes";
import { BiCommentAdd } from "react-icons/bi";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

export default function NewsFeedCard({
  info,
  handleDeleteNotification
}: {
  info: NewsFeedItemType,
  handleDeleteNotification: (id: number) => void
}) {
  const { setNewsFeedShown } = useNewsFeedShown();
  // Like/Dislike
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="hover:cursor-pointer grid">
            <Link reloadDocument to={`/${info.appId}?threadId=${info.reviewId}&viewThreads=true`} onClick={() => { setNewsFeedShown(false) }}>
              {
                info.type == "REVIEW" ?
                  <div className="flex items-center gap-4 font-normal">
                    <BiCommentAdd size={40} />
                    <h1><span className="font-semibold"> @{info.username} </span> left a new comment on "{info.gameName}"</h1>
                  </div>
                  :
                  info.type == "LIKE" ?
                    <div className="flex items-center gap-4 font-normal">
                      <BiUpvote size={40} />
                      <h1><span className="font-semibold"> @{info.username} </span> liked your comment on "{info.gameName}"</h1>
                    </div>
                    :
                    <div className="flex items-center gap-4 font-normal">
                      <BiDownvote size={40} />
                      <h1><span className="font-semibold"> @{info.username} </span> disliked your comment on "{info.gameName}"</h1>
                    </div>
              }
            </Link>
            <button className="justify-self-end hover:underline hover:decoration-destructive mt-2" onClick={() => handleDeleteNotification(info.id)}>
              <h2 className="text-destructive text-sm">
                delete
              </h2>
            </button>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}