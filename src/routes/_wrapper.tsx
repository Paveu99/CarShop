import { createFileRoute, Outlet, useLoaderData } from '@tanstack/react-router'
import { Stepper } from '../components/creator'
import { useGetOptions } from '../queries/categories/useGetOptions';
import { useGetElementsOptions } from '../queries/elements/useGetElementsOptions';

export const Route = createFileRoute('/_wrapper')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient } = context;
    const options = await queryClient.ensureQueryData(useGetOptions);
    const elements = await queryClient.ensureQueryData(useGetElementsOptions);

    const uniqueCategoriesPresent = [...new Set(elements.filter(item => item.category).map(item => item.category))];

    const availableIds = options?.filter(option => uniqueCategoriesPresent.includes(option.identifier)).map(option => option.identifier) || [];

    return { availableIds };
  },
  staleTime: 30000
})

function RouteComponent() {

  const { availableIds } = useLoaderData({ from: Route.id });

  return (
    <div>
      <Stepper availableIds={availableIds} />
      <Outlet />
    </div>
  )
}
