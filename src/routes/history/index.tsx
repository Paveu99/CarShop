import { createFileRoute } from '@tanstack/react-router'
import { HistoryBasePage } from '../../components/history'

export const Route = createFileRoute('/history/')({
  component: HistoryBasePage,
})