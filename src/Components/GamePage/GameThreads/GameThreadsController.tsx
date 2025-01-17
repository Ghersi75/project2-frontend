import { useGamePageInfo } from "@/Hooks/useGamePageInfo";
import GameThreads from "./GameThreads";
import { useEffect, useState } from "react";
import { GameThreadType } from "@/Types/GameAPIReturnTypes";
import { useParams } from "react-router";
import { useUserInfo } from "@/Hooks/useUserInfo";
import axios from "axios";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function GameThreadsController() {
  const [reviewText, setReviewText] = useState("")
  const { appId } = useParams();
  const { userInfo } = useUserInfo();
  const { gameName } = useGamePageInfo();
  const [data, setData] = useState<GameThreadType[]>([]);
  const { defaultOptions } = useDefaultRequestOptions();
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND");

  useEffect(() => {
    axios.get(`${VITE_BACKEND}/reviews/games/${appId}`, defaultOptions)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  const handleSubmit = () => {
    const body = {
      content: reviewText,
      appid: appId,
      gameName: gameName
    }

    axios.post(`${VITE_BACKEND}/reviews/${userInfo?.username}`, body, defaultOptions)
      .then(res => {
        setData(prev => [res.data, ...prev])
        setReviewText("")
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <>
      <GameThreads
        loggedIn={userInfo != null}
        reviewText={reviewText}
        setReviewText={setReviewText}
        handleSubmit={handleSubmit}
        data={data}
        setData={setData}
      />
    </>
  )
}