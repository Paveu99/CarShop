import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi";
import { Element } from "../../utils/types";


export const useDeleteElementMutation = () => {
    const { apiDelete } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["elements"],
        mutationFn: async (elementId: string) => {
            return apiDelete<Element>(`parts/${elementId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["elements"],
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
