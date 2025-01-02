import useNewsFeedShown from "@/Hooks/useNewsFeedShown";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

export default function NewsFeed() {
  const { newsFeedShown } = useNewsFeedShown();

  if ( newsFeedShown == false) {
    return ;
  }

  return (
    <div className="w-[400px] max-h-svh bg-secondary/20 justify-self-end bg-opacity-10 p-4 flex flex-col overflow-scroll gap-4">
      <h1> News Feed </h1>
      <Card className="w-fit">
        <CardHeader>
          <CardTitle>
            <Label> No News Found </Label>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}