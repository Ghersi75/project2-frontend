import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function Navbar() {
  const linkStyle = "hover:pointer-cursor hover:underline"

  return (
    <nav className="w-[300px] bg-secondary sticky top-0 h-svh p-8">
      <div className="w-full flex flex-col gap-4">
        <Link to="" className={cn(linkStyle, "text-2xl")}> Home </Link>
        {/* Profile or login/sign up */}
        <div className="flex gap-8">
          <Link to="/login" className={linkStyle}> Login </Link>
          <Link to="/signup" className={linkStyle}> Sign Up </Link>
        </div>
        <h1> Profile </h1>
        <h1> Search </h1>

        {/* Theese 2 are only available if logged in */}
        <h1> Favorited Games </h1>
        <h1> News Feed </h1>
      </div>
    </nav>
  )
}