import useNewsFeedShown from "@/Hooks/useNewsFeedShown";
import { testData } from "./testData";
import NewsFeedCard from "./NewsFeedCard";
import { useUserInfo } from "@/Hooks/useUserInfo";

export default function NewsFeed() {
  const { newsFeedShown } = useNewsFeedShown();
  const { userInfo } = useUserInfo();

  if (newsFeedShown == false || userInfo == null) {
    return;
  }

  return (
    <div className="w-[400px] sticky top-0 h-svh bg-secondary/20 justify-self-end bg-opacity-10 p-4 flex flex-col overflow-scroll gap-4">
      <h1> News Feed </h1>
      {
        testData.map((newsInfo, idx) => {
          return (
            <NewsFeedCard info={newsInfo} key={idx} />
          )
        })
      }
    </div>
  )
}