import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { Container } from '../components/containers'
import { MainHeader } from '../components/mainHeader'
import { QueryClient } from '@tanstack/react-query'

type RootContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootContext>()({
    component: RootComponent,
})

function RootComponent() {
    return (
        <Container>
            <MainHeader />
            <Outlet />
        </Container>
    )
}
