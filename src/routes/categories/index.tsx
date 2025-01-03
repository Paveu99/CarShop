import { createFileRoute } from '@tanstack/react-router'
import { CategoriesBasePage } from '../../components/categories'

export const Route = createFileRoute('/categories/')({
  component: CategoriesBasePage,
})
