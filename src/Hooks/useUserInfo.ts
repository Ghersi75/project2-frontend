import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export const useUserInfo = () => {
  // Token needs to be set as http only false
  const [cookies] = useCookies(["token"]);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (cookies.token == null) {
      return;
    }

    setUserInfo(jwtDecode(cookies.token))
  }, [cookies.token]);

  return { userInfo }
}