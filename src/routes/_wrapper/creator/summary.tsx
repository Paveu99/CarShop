import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_wrapper/creator/summary')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_wrapper/creator/summary"!</div>
}
