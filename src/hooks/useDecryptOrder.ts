import { useGetSingleElementsQuery } from "../queries/elements/useGetSingleElementQuery";

export const useDecryptOrder = (details: string[]) => {
    const { data, isLoading } = useGetSingleElementsQuery(details);

    return {
        test: data,
        isLoading,
    };
};
