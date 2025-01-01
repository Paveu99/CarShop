import { createFileRoute } from '@tanstack/react-router'
import { HistoryBasePage } from '../../components/history'
import { useGetSummariesQuery } from '../../queries/summary/useGetSummariesQuery'

export const Route = createFileRoute('/history/')({
  component: HistoryBasePage,
  loader: ({ context }) => {
    const { queryClient } = context

    return queryClient.ensureQueryData(useGetSummariesQuery)
  },
  staleTime: 30000
})