import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { Element } from "../../utils/types";

export const useGetSingleElementsQuery = (details: string[]) => {
    const { apiGet } = useApi();

    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ['test', details],
        queryFn: async () => {
            if (!details || details.length === 0) {
                return [];
            }
            const promises = details.map((detail) =>
                apiGet<Element>(`parts?partId=${detail}`)
            );
            const results = await Promise.all(promises);
            return results.flat();
        },
        enabled: details.length > 0,
    });

    return {
        data,
        refetch,
        error,
        isLoading,
    };
};
