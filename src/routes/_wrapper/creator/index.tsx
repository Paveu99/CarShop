import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router'
import { useGetOptions } from '../../../queries/categories/useGetOptions';
import { useGetElementsOptions } from '../../../queries/elements/useGetElementsOptions';
import { Button } from '@mui/material';

export const Route = createFileRoute('/_wrapper/creator/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        const { queryClient } = context;

        const options = await queryClient.ensureQueryData(useGetOptions);
        const elements = await queryClient.ensureQueryData(useGetElementsOptions);

        const uniqueCategoriesPresent = [
            ...new Set(elements.filter((item) => item.category).map((item) => item.category)),
        ];

        const availableIds =
            options
                ?.filter((option) =>
                    uniqueCategoriesPresent.includes(option.identifier)
                )
                .map((option) => option.identifier) || [];

        return { availableIds };
    },
    staleTime: 30000,
});

function RouteComponent() {

    const loaderData = useLoaderData({ from: '/_wrapper/creator/' });
    const navigate = useNavigate();

    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>
            Welcome to the creator page, to order a package of parts please click on
        </h2>
        <Button
            sx={{ height: '40px', margin: "5px 0 0 5px" }}
            variant="contained"
            disableElevation
            onClick={() => navigate({ to: '/creator/$id', params: { id: loaderData.availableIds[0] } })}>
            Start ordering
        </Button>
    </div>
}
