import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { GameThreadType } from "@/Types/GameAPIReturnTypes";
import axios from "axios";
import { useState } from "react";
import GameThreadCard from "./GameThreadCard";
import { format } from "date-fns";

export default function GameThreadCardController({
  item,
  setData
}: {
  item: GameThreadType,
  setData: React.Dispatch<React.SetStateAction<GameThreadType[]>>
}) {
  const [liked, setLiked] = useState<boolean | null>(
    item.likedByUser == true ? true :
      item.dislikedByUser == true ? false :
        null
  );
  const { defaultOptions } = useDefaultRequestOptions();
  const { userInfo } = useUserInfo();
  const [content, setContent] = useState(item.content);

  const canInteract = userInfo != null && userInfo.username != item.username
  const canEdit = userInfo != null && userInfo.username == item.username;

  const handleInteraction = (like: boolean) => {
    if (userInfo == null) {
      return;
    }
    const body = {
      reviewid: item.reviewId,
      interaction: like ? "LIKE" : "DISLIKE"
    }
    axios.post(`${import.meta.env.VITE_BACKEND}/reviews/${like ? "like" : "dislike"}?username=${userInfo.username}`, body, defaultOptions)
      .then((res) => {
        console.log(res)
        setData(prev =>
          prev.map(review =>
            review.reviewId == item.reviewId ?
              { ...review, likes: res.data.likes, dislikes: res.data.dislikes } :
              review
          )
        )
        // Update styling
        if (liked != like) {
          setLiked(like)
        } else {
          setLiked(null)
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleUpdateReview = () => {
    const body = {
      content: content
    }
    axios.put(`${import.meta.env.VITE_BACKEND}/reviews/${userInfo?.username}/${item.reviewId}`, body, defaultOptions)
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <GameThreadCard
        canInteract={canInteract}
        canEdit={canEdit}
        handleInteraction={handleInteraction}
        liked={liked}
        reviewId={item.reviewId}
        displayName={item.displayName}
        username={item.username}
        content={content}
        setContent={setContent}
        handleUpdateReview={handleUpdateReview}
        likes={item.likes}
        dislikes={item.dislikes}
        postedAt={item.postedAt ? format(item.postedAt, "hh:mm aaa - MMM dd yyyy") : ""}
      />
    </>
  )
}