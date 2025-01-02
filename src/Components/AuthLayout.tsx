import { Outlet } from "react-router";

export default function AuthLayout() {
  return(
    <div className="bg-muted text-white h-screen w-screen flex justify-center items-center text-xl">
      {/* https://reactrouter.com/6.28.0/components/outlet */}
      <Outlet />
    </div>
  )
}