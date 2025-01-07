import { useSearchParams } from "react-router";

export const useViewThreads = () => {
  const [params, setParams] = useSearchParams();

  const setViewThreads = (view: boolean) => {
    if (view) {
      setParams(prev => {
        prev.set("viewThreads", "true")
        return prev
      })
    } else {
      setParams(prev => {
        prev.delete("viewThreads")
        return prev
      })
    }
  }

  const viewThreads = params.get("viewThreads") != null;

  return { viewThreads, setViewThreads }
}