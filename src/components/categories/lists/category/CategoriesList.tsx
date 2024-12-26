import { useGetCategoriesQuery } from "../../../../queries/categories/useGetCategoriesQuery";
import styles from './styles.module.scss';
import infoPng from '../../../../images/info.png';
import { SingleCategory } from "./SingleCategory";
import { CircularProgress, List } from "@mui/material";

export const CategoriesList = () => {

    const { data, error, isLoading } = useGetCategoriesQuery();

    if (error)
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <img className={styles.infoButton} src={infoPng} />
                <p>Categories failed to fetch</p>
            </div>
        )
    if (isLoading) return <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '10px',
        }}
    >
        <CircularProgress />
        <p>Loading categories...</p>
    </div>

    return (
        <div>
            <List>
                {data?.filter(el => el.identifier !== '').map((el, index) => (
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