import { useAuthToken } from "./useAuthToken"

export const useDefaultRequestOptions = () => {
  const { authToken } = useAuthToken();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
    withCredentials: true
  }

  return { defaultOptions }
}