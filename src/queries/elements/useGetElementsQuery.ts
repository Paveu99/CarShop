import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Element } from "../../utils/types";

export const useGetElementsQuery = () => {
    const { apiGet } = useApi();
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["elements"],
        queryFn: async () => {
            return apiGet<Element[]>("parts")
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
