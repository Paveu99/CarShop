import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi";
import { Summary } from "../../utils/types";


export const useDeleteSummaryMutation = () => {
    const { apiDelete } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["orders"],
        mutationFn: async (orderId: string) => {
            return apiDelete<Summary>(`orders/${orderId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"],
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
