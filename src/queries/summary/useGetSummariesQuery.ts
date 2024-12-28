import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Summary } from "../../utils/types";

export const useGetSummariesQuery = () => {
    const { apiGet } = useApi();
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            return apiGet<Summary[]>("orders")
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
