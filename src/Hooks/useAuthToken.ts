import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

export const useAuthToken = () => {
  const [cookies] = useCookies(["token"]);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    setAuthToken("Bearer " + cookies.token);
  }, [cookies.token]);

  return { authToken }
}