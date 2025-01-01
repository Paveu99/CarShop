import { useState } from "react";
import styles from "./styles.module.scss";
import {
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TablePagination,
} from "@mui/material";
import { useGetSummariesQuery } from "../../queries/summary/useGetSummariesQuery";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDecryptOrder } from "../../hooks/useDecryptOrder";
import { SingleOrder } from "./single order";
import { useSuspenseQuery } from "@tanstack/react-query";

export const HistoryBasePage = () => {
    const { data: orders } = useSuspenseQuery(useGetSummariesQuery);
    const [details, setDetails] = useState<string[]>([]);
    const { test, isLoading } = useDecryptOrder(details);
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    const handleClick = (id: string, detailsString: string) => {
        setOpenItemId((prev) => (prev === id ? null : id));
        const detailsArray = detailsString.split(",").map(el => el.trim());
        setDetails(detailsArray);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastPost = (page + 1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = orders?.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <main className={styles.categoriesContainer}>
            <div>
                <ul>
                    {currentPosts?.map((el, index) => (
                        <div key={el.id}>
                            <ListItemButton
                                style={{ marginBottom: "5px", borderRadius: "5px", backgroundColor: '#1976d2', color: 'white' }}
                                onClick={() => handleClick(el.id, el.details)}
                            >
                                <ListItemIcon>
                                    {index + 1 + (page * rowsPerPage)}
                                </ListItemIcon>
                                <ListItemText primary={`${el.value}$ - ${el.lastName}, ${el.firstName}`} />
                                {openItemId === el.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse
                                className={styles.collapse}
                                in={openItemId === el.id}
                                timeout="auto"
                                unmountOnExit
                            >
                                <SingleOrder el={el} isLoading={isLoading} test={test} />
                            </Collapse>
                        </div>
                    ))}
                </ul>
            </div>
            <TablePagination
                sx={{ display: "flex", justifyContent: "center" }}
                component="div"
                count={orders?.length || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </main>
    );
};
