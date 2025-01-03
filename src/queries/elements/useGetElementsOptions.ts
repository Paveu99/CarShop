import { queryOptions } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Element } from "../../utils/types";

/* eslint-disable react-hooks/rules-of-hooks */
const { apiGet } = useApi();
/* eslint-enable react-hooks/rules-of-hooks */

export const useGetElementsOptions = queryOptions({
    queryKey: ["elements"],
    queryFn: async () => {
        return apiGet<Element[]>("parts")
    }
})
