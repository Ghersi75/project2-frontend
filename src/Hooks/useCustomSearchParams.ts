import { useSearchParams } from "react-router"

export const useCustomSearchParams = () => {
  const [params, setParams] = useSearchParams();

  const getParam = (param: string) => {
    return params.get(param);
  }

  const setParam = (param: string, value: string | number) => {
    setParams(prev => {
      params.set(param, value.toString())
      return prev
    })
  }

  const deleteParam = (param: string) => {
    setParams(prev => {
      prev.delete(param)
      return prev
    })
  }

  const paramsString = params.toString();

  return { getParam, setParam, deleteParam, paramsString }
}