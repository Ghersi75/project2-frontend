import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { GameThreadType } from "@/Types/GameAPIReturnTypes";
import GameThreadCardController from "./GameThreadCardController";

export default function GameThreads() {
  const [reviewText, setReviewText] = useState("")
  const [cookies] = useCookies(["token"]);
  const { appId } = useParams();
  const { userInfo } = useUserInfo();
  const [data, setData] = useState<GameThreadType[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND}/reviews/games/${appId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.token}`,
      },
      withCredentials: true
    })
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
      appid: appId
    }

    console.log(body)

    axios.post(`${import.meta.env.VITE_BACKEND}/reviews/${userInfo?.username}`, body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies.token}`,
      },
      withCredentials: true
    })
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
      <Card>
        <CardHeader>
          <CardTitle>
            Write a review for this game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Review content"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="h-[1rem] py-5"
          />
        </CardContent>
        <CardFooter className="grid">
          <Button variant="outline" disabled={reviewText == ""} className="w-fit justify-self-end" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
      {
        data.map(data => {
          return (
            <GameThreadCardController item={data} setData={setData} key={data.reviewId} />
          )
        })
      }
    </>
  )
}