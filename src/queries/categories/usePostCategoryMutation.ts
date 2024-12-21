import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Category, CategoryDto } from "../../utils/types";

export const usePostCategoryMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["categories"],
        mutationFn: async (payload: CategoryDto) => {
            return apiPost<Category, CategoryDto>(`categories`, payload)
        },
        onSuccess: (newCategory) => {
            queryClient.setQueryData<Category[]>(["categories"], (oldCategories) => {
                return [...(oldCategories || []), newCategory]
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
