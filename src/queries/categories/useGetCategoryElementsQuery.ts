import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Element } from "../../utils/types/index"

export const useGetCategoryElementsQuery = (categoryId: string) => {
  const { apiGet } = useApi()
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["elements", categoryId],
    queryFn: async () => {
      return apiGet<Element[]>(`parts?category=${categoryId}`)
    },
  })

  return {
    data,
    refetch,
    error,
    isLoading,
  }
}
