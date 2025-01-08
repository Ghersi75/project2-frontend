import { useCustomSearchParams } from "./useCustomSearchParams";

export const useSaveGameSearch = () => {
  const { getParam, setParam } = useCustomSearchParams();

  const setSearchParam = (search: string) => {
    setParam("search", search)
  }

  const searchParam = getParam("search") || "";

  return { searchParam, setSearchParam }
}