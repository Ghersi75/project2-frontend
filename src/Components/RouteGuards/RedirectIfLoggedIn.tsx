import { useUserInfo } from "@/Hooks/useUserInfo";
import { ReactNode } from "react";
import { Navigate, useSearchParams } from "react-router";

export default function RedirectIfLoggedIn({ children }: { children: ReactNode }) {
  const { userInfo } = useUserInfo();
  const [params] = useSearchParams();

  const appId = params.get("appId");

  if (userInfo != null) {
    return <Navigate to={`/${appId}?${params.toString()}`} />
  }

  return (
    <>
      {children}
    </>
  )
}