import { useGetCategoriesQuery } from "../../../../queries/categories/useGetCategoriesQuery"

export const CategoriesList = () => {

    const { data } = useGetCategoriesQuery();
    console.log(data);


    return null
}