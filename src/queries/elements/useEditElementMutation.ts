import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Element, ElementDto } from "../../utils/types";

export const useEditElementMutation = () => {
    const { apiPut } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["elements"],
        mutationFn: async (payload: Element) => {
            return apiPut<Element, ElementDto>(`parts/${payload.id}`, payload)
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
        isSuccess
    }
}
