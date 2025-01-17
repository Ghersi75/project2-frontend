import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { GameThreadType } from "@/Types/GameAPIReturnTypes";
import GameThreadCardController from "./GameThreadCardController";

export default function GameThreads({
  loggedIn,
  reviewText,
  setReviewText,
  handleSubmit,
  data,
  setData
}: {
  loggedIn: boolean,
  reviewText: string,
  setReviewText: React.Dispatch<React.SetStateAction<string>>,
  handleSubmit: () => void,
  data: GameThreadType[],
  setData: React.Dispatch<React.SetStateAction<GameThreadType[]>>
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            {
              !loggedIn ?
                `Log in to write a review for this game` :
                `Write a review for this game`
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Review content"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="h-[1rem] py-5"
            disabled={!loggedIn}
          />
        </CardContent>
        <CardFooter className="grid">
          <Button variant="outline" disabled={!loggedIn || reviewText == ""} className="w-fit justify-self-end" onClick={handleSubmit}>
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