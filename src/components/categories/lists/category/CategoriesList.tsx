import { useGetCategoriesQuery } from "../../../../queries/categories/useGetCategoriesQuery";
import styles from './styles.module.scss';
import infoPng from '../../../../images/info.png';
import { SingleCategory } from "./SingleCategory";
import { List } from "@mui/material";

export const CategoriesList = () => {

    const { data, error, isLoading } = useGetCategoriesQuery();

    if (error)
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <img className={styles.infoButton} src={infoPng} />
                <p>Categories failed to fetch</p>
            </div>
        )
    if (isLoading) return <p>Loading categories...</p>

    return (
        <div>
            <List>
                {data?.map((el, index) => (
                    <SingleCategory
                        key={el.id}
                        index={index + 1}
                        singleCat={el}
                    />
                ))}
            </List>
        </div>
    )
}