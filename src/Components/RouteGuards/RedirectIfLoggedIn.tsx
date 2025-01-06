import { useUserInfo } from "@/Hooks/useUserInfo";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export default function RedirectIfLoggedIn({ children }: { children: ReactNode }) {
  const { userInfo } = useUserInfo();

  if (userInfo != null) {
    return <Navigate to="/" />
  }

  return (
    <>
      {children}
    </>
  )
}