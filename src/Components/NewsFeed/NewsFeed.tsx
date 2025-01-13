import { useNewsFeedShown } from "@/Hooks/useNewsFeedShown";
import NewsFeedCard from "./NewsFeedCard";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { NewsFeedItemType } from "@/Types/NotificationsTypes";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function NewsFeed() {
  const { newsFeedShown } = useNewsFeedShown();
  const { loading, userInfo } = useUserInfo();
  const { defaultOptions } = useDefaultRequestOptions();
  const [notifications, setNotifications] = useState<NewsFeedItemType[]>([])
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND")

  useEffect(() => {
    if (userInfo == null) {
      return;
    }

    const interval = setInterval(() => {
      axios.get(`${VITE_BACKEND}/notifications/${userInfo?.username}`, defaultOptions)
        .then(res => {
          setNotifications(res.data)
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [loading, userInfo])

  if (newsFeedShown == false || userInfo == null) {
    return;
  }

  const handleDelete = (id: number) => {
    axios.delete(`${VITE_BACKEND}/notifications/${id}`, defaultOptions)
      .then(() => {
        setNotifications(prev => {
          return prev.filter(item => {
            if (item.id != id) {
              return item
            }
          })
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className="w-[400px] sticky top-0 h-svh bg-secondary/20 justify-self-end bg-opacity-10 p-4 flex flex-col overflow-scroll gap-4">
      <h1> News Feed </h1>
      {
        notifications.length > 0 ? 
        notifications.map(newsInfo => {
          return (
            <NewsFeedCard
              key={newsInfo.id}
              info={newsInfo}
              handleDeleteNotification={handleDelete} />
          )
        })
        :
        <h2> No new notifications at the moment </h2>
      }
    </div>
  )
}