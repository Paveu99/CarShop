import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useGetOptions } from '../../../queries/categories/useGetOptions';
import { useGetElementsOptions } from '../../../queries/elements/useGetElementsOptions';
import { useOrderStore } from '../../../store/useOrderStore';
import { useShallow } from 'zustand/shallow';
import { Summary } from '../../../components/creator';

export const Route = createFileRoute('/_wrapper/creator/summary')({
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
  }
});

function RouteComponent() {

  const { availableIds } = Route.useLoaderData();
  const navigate = useNavigate();
  const { selectedParts } = useOrderStore(useShallow(state => ({ selectedParts: state.selectedParts })));


  useEffect(() => {
    if (Object.keys(selectedParts).length < availableIds.length) navigate({ to: '/creator/$id', params: { id: Object.keys(selectedParts)[0] } })
  }, [])

  return <Summary />
}
