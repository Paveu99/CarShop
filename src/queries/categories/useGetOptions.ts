import { queryOptions } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Category } from "../../utils/types";

/* eslint-disable react-hooks/rules-of-hooks */
const { apiGet } = useApi();
/* eslint-enable react-hooks/rules-of-hooks */

export const useGetOptions = queryOptions({
    queryKey: ["categories"],
    queryFn: async () => {
        return apiGet<Category[]>("categories")
    },
})
