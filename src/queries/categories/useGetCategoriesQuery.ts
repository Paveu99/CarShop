import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Category } from "../../utils/types";

export const useGetCategoriesQuery = () => {
    const { apiGet } = useApi();
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return apiGet<Category[]>("categories")
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
