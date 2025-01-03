import { queryOptions } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Summary } from "../../utils/types";

// export const useGetSummariesQuery = () => {
//     const { apiGet } = useApi();
//     const { data, refetch, error, isLoading } = useQuery({
//         queryKey: ["orders"],
//         queryFn: async () => {
//             return apiGet<Summary[]>("orders")
//         },
//     })

//     return {
//         data,
//         refetch,
//         error,
//         isLoading,
//     }
// }
/* eslint-disable react-hooks/rules-of-hooks */
const { apiGet } = useApi();
/* eslint-enable react-hooks/rules-of-hooks */

export const useGetSummariesQuery = queryOptions({
    queryKey: ["orders"],
    queryFn: async () => {
        return apiGet<Summary[]>("orders")
    },
})
