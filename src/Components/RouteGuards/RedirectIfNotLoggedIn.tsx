import { useCustomSearchParams } from "@/Hooks/useCustomSearchParams";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export default function RedirectIfNotLoggedIn({ children }: { children: ReactNode }) {
  const { userInfo, loading } = useUserInfo();
  const { getParam, paramsString } = useCustomSearchParams();

  // TODO: Fix paramsString also inclduing appId if there's enough time
  // Makes no difference in the application but its not supposed to be duplicated
  const appId = getParam("appId");

  // Technically if user is not logged in, it will stay at default of null, but there might be a weird case where userInfo loads after redirect and causes flickering/weird reload
  if (!loading && userInfo == null) {
    return <Navigate to={`/${appId || ""}?${paramsString}`} />
  }

  return (
    <>
      {children}
    </>
  )
}