import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-row">
      <Navbar />
      <Outlet />
    </div>
  )
}