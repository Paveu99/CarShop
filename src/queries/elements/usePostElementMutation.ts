import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Element, ElementDto } from "../../utils/types";

export const usePostElementMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["elements"],
        mutationFn: async (payload: ElementDto) => {
            return apiPost<Element, ElementDto>(`parts`, payload)
        },
        onSuccess: (newPart) => {
            queryClient.setQueryData<Element[]>(["elements"], (oldParts) => {
                return [...(oldParts || []), newPart]
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
