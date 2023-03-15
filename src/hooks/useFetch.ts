import { useEffect, useState } from "react"
import api from "../axios/api"

interface UseFetchParams {
  url: string
}
export const useFetch = <T = unknown>({ url }: UseFetchParams) => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .get(url)
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [url])

  return { data, error, loading }
}
