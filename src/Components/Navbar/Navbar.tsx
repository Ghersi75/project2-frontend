import { Link } from "react-router";

export default function Navbar() {
  const linkStyle = "hover:pointer-cursor hover:underline"

  return (
    <nav className="w-full h-[80px] bg-secondary flex justify-center items-center px-8">
      <div className="w-3/4 flex justify-between">
        <Link to="" className={linkStyle}> Home </Link>
        <div className="flex gap-8">
          <Link to="/login" className={linkStyle}> Login </Link>
          <Link to="/signup" className={linkStyle}> Sign Up </Link>
        </div>
      </div>
    </nav>
  )
}