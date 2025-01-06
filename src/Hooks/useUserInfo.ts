import { UserContext } from "@/Contexts/UserContext";
import { useContext } from "react";

export const useUserInfo = () => {
  const content = useContext(UserContext);
  if (!content) {
    throw new Error("UserContext must be placed within a UserProvider component")
  }

  return { ...content };
}