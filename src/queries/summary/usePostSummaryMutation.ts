import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Summary, SummaryDto } from "../../utils/types";

export const usePostSummaryMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["orders"],
        mutationFn: async (payload: SummaryDto) => {
            return apiPost<Summary, SummaryDto>(`orders`, payload)
        },
        onSuccess: (newOrder) => {
            queryClient.setQueryData<Summary[]>(["orders"], (oldOrders) => {
                return [...(oldOrders || []), newOrder]
            })
        },
    })

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess,
    }
}
