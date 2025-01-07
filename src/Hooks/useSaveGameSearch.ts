import { useSearchParams } from "react-router";

export const useSaveGameSearch = () => {
  const [params, setParams] = useSearchParams();

  const setSearchParam = (search: string) => {
    setParams(prev => {
      prev.set("search", search)
      return prev
    })
  }

  const searchParam = params.get("search") || "";

  return { searchParam, setSearchParam }
}