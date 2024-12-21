import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Container } from '../components/containers'
import { MainHeader } from '../components/mainHeader'

export const Route = createRootRoute({
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
