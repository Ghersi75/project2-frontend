import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { testData } from "./testData";
import GameThreadCard from "./GameThreadCard";

export default function GameThreads() {
  const [reviewText, setReviewText] = useState("")

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
          <Button variant="outline" className="w-fit justify-self-end">
            Submit
          </Button>
        </CardFooter>
      </Card>
      {
        testData.map((data, idx) => {
          return (
            <GameThreadCard item={data} key={idx} />
          )
        })
      }
    </>
  )
}