import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { Category, Element, ElementDto } from "../../utils/types";

export const useDeleteCategoryMutation = () => {
    const { apiDelete, apiPut, apiGet } = useApi(); // Zakładam, że apiPatch istnieje w Twoim hooku API
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["categories"],
        mutationFn: async (category: Category) => {
            await apiDelete<Category>(`categories/${category.id}`);

            const parts = await apiGet<Element[]>("parts") || [];
            const partsToUpdate = parts.filter(part => part.category === category.identifier);

            for (const part of partsToUpdate) {
                await apiPut<Element, ElementDto>(`parts/${part.id}`, {
                    category: "",
                    name: part.name,
                    partId: part.partId,
                    price: part.price
                });
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["elements"] });
        },
    });

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess
    };
};
