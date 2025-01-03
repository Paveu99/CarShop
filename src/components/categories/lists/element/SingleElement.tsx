import { ListItem } from "@mui/material";
import { Element } from "../../../../utils/types/index";
import styles from './styles.module.scss'
import { useElementContext } from "../../../../context/useElementContext";

type Props = {
    singlePart: Element
    index: number
}

export const SingleElement = ({ singlePart, index }: Props) => {

    const { setChosenElement } = useElementContext();

    const handleCategoryClick = (part: Element) => {
        setChosenElement(part);
    };

    return (
        <ListItem
            className={styles.singleElement}
            onClick={() => handleCategoryClick(singlePart)}
        >
            {index}. {singlePart.name}
        </ListItem>
    )
}
