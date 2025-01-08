import { useCustomSearchParams } from "./useCustomSearchParams";

export const useViewThreads = () => {
  const { getParam, setParam, deleteParam } = useCustomSearchParams();

  const setViewThreads = (view: boolean) => {
    if (view) {
      setParam("viewThreads", "true")
    } else {
      deleteParam("viewThreads")
    }
  }

  const viewThreads = getParam("viewThreads") != null;

  return { viewThreads, setViewThreads }
}