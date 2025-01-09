import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import NewsFeed from "./NewsFeed/NewsFeed";

export default function MainLayout() {
  return (
    <div className="flex flex-row">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <NewsFeed />
    </div>
  )
}