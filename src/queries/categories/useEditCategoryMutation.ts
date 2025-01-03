import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Category, CategoryDto } from "../../utils/types";

export const useEditCategoryMutation = () => {
    const { apiPut } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["categories"],
        mutationFn: async (payload: Category) => {
            return apiPut<Category, CategoryDto>(`categories/${payload.id}`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
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
