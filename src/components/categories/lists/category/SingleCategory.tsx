import { ListItem } from "@mui/material";
import { useCategoryContext } from "../../../../context/useCategoryContext";
import { Category } from "../../../../utils/types/index";
import styles from './styles.module.scss'

type Props = {
    singleCat: Category
    index: number
}

export const SingleCategory = ({ singleCat, index }: Props) => {

    const { setChosenCategory } = useCategoryContext();

    const handleCategoryClick = (category: Category) => {
        setChosenCategory(category);
    };

    return (
        <ListItem
            className={styles.singleElement}
            onClick={() => handleCategoryClick(singleCat)}
        >
            {index}. {singleCat.name}
        </ListItem>
    )
}
