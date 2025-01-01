import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_wrapper/creator/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/_wrapper/creator/"! </div>
}
