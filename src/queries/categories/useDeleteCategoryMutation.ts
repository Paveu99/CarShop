import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi";
import { Category } from "../../utils/types";


export const useDeleteCategoryMutation = () => {
    const { apiDelete } = useApi()
    const queryClient = useQueryClient()

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["categories"],
        mutationFn: async (categoryId: string) => {
            return apiDelete<Category>(`categories/${categoryId}`)
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
