import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { jwtType, UserInfoContextType, UserInfoType } from "@/Types/UserInfoTypes";

export const UserContext = createContext<UserInfoContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  const logout = () => {
    removeCookie("token")
  }

  useEffect(() => {
    if (cookies.token == null) {
      setUserInfo(null);
      return;
    }

    const jwt: jwtType = jwtDecode(cookies.token);

    setUserInfo({
      username: jwt.sub,
      displayName: jwt.displayName,
      userRole: jwt.userRole,
    });
  }, [cookies.token]);

  return (
    <UserContext.Provider value={{ userInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
};