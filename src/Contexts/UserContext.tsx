import { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { jwtType, UserInfoContextType, UserInfoType } from "@/Types/UserInfoTypes";

export const UserContext = createContext<UserInfoContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    removeCookie("token")
  }

  useEffect(() => {
    if (cookies.token == null) {
      setUserInfo(null);
      setLoading(false);
      return;
    }

    const jwt: jwtType = jwtDecode(cookies.token);

    setUserInfo({
      username: jwt.sub,
      displayName: jwt.displayName,
      userRole: jwt.userRole,
    });
    setLoading(false);
  }, [cookies.token]);

  return (
    <UserContext.Provider value={{ userInfo, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};