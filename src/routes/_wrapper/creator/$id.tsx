import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router';
import { useGetCategoryElementsQuery } from '../../../queries/categories/useGetCategoryElementsQuery';
import { SingleStepForm } from '../../../components/creator';
import { useGetOptions } from '../../../queries/categories/useGetOptions';
import { useGetElementsOptions } from '../../../queries/elements/useGetElementsOptions';

interface LoaderData {
  availableIds: string[];
}

const IdRouteElement = () => {

  const loaderData = useLoaderData({ from: Route.id }) as LoaderData;
  const { availableIds } = loaderData;
  const { id } = Route.useParams();
  const { data } = useGetCategoryElementsQuery(id);

  return (
    <SingleStepForm
      data={data}
      name={id}
      ids={availableIds}
      first={availableIds[0] === id}
    />
  );
};

export const Route = createFileRoute('/_wrapper/creator/$id')({
  component: IdRouteElement,
  loader: async ({ params, context }) => {
    const { queryClient } = context;
    const { id } = params;

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

    if (![...availableIds].includes(id)) {
      return redirect({ to: '/creator' });
    }

    return { availableIds };
  },
  staleTime: 30000,
});
