import useNewsFeedShown from "@/Hooks/useNewsFeedShown";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { cn } from "@/lib/utils";
import { Link, useParams } from "react-router";
import { Button } from "../ui/button";
import { useCustomSearchParams } from "@/Hooks/useCustomSearchParams";

export default function Navbar() {
  const { newsFeedShown, setNewsFeedShown } = useNewsFeedShown();
  const { userInfo, logout } = useUserInfo();
  const { appId } = useParams();
  const { paramsString } = useCustomSearchParams();
  const linkStyle = "hover:pointer-cursor hover:underline"
  const urlAdditions = `?${appId != null ? `appId=${appId}` : ""}&${paramsString}`

  return (
    <nav className="w-[300px] bg-secondary sticky top-0 h-svh p-8 flex flex-col justify-between">
      <div>
        <Link to="/">
          <Button variant="ghost" className="text-3xl mb-8 p-0">
            Game Threads
          </Button>
        </Link>
        <div className="w-full flex flex-col gap-4">
          <Link to="" className={cn(linkStyle, "text-2xl")}> Home </Link>
          {/* Profile or login/sign up */}
          <Link to="/search" className={linkStyle}> Search </Link>


          {/* Theese 2 are only available if logged in */}
          {
            userInfo != null &&
            <>
              <Link to="/favorites">
                <h1 className="hover:underline hover:cursor-pointer"> Favorited Games </h1>
              </Link>
              <h1 className="hover:underline hover:cursor-pointer" onClick={() => { setNewsFeedShown(prev => !prev) }}> {newsFeedShown == true ? "Hide News Feed" : "Show News Feed"} </h1>
            </>
          }
        </div>
      </div>
      {
        userInfo ?
          <div className="flex flex-row justify-between items-center">
            <Link to="/profile">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl">
                  {userInfo.displayName}
                </h1>
                <h2 className="text-muted-foreground text-sm">
                  @{userInfo.username}
                </h2>
              </div>
            </Link>
            <Button className="hover:underline w-fit text-muted-foreground" onClick={logout}>
              logout
            </Button>
          </div>
          :
          <div className="flex gap-8">
            <Link to={`/login${urlAdditions}`} className={linkStyle}> Login </Link>
            <Link to={`/signup${urlAdditions}`} className={linkStyle}> Sign Up </Link>
          </div>
      }
    </nav>
  )
}