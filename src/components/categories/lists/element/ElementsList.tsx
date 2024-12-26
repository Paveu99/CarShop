import styles from './styles.module.scss';
import infoPng from '../../../../images/info.png';
import { List } from "@mui/material";
import { SingleElement } from "./SingleElement";
import { useGetElementsQuery } from "../../../../queries/elements/useGetElementsQuery";


export const ElementsList = () => {

    const { data, error, isLoading } = useGetElementsQuery();

    if (error)
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <img className={styles.infoButton} src={infoPng} />
                <p>Parts failed to fetch</p>
            </div>
        )
    if (isLoading) return <p>Loading parts...</p>

    return (
        <div>
            <List>
                {data?.map((el, index) => (
                    <SingleElement
                        key={el.id}
                        index={index + 1}
                        singlePart={el}
                    />
                ))}
            </List>
        </div>
    )
}