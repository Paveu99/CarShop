import { useCategoryContext } from "../../../../context/useCategoryContext";
import { useForm } from 'react-hook-form';
import { Category } from "../../../../utils/types";
import { useGetCategoryElementsQuery } from "../../../../queries/categories/useGetCategoryElementsQuery";
import { Button, CircularProgress, Collapse, css, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, styled } from '@mui/material';
import React, { useEffect, useState } from "react";
import { ExpandLess, ExpandMore, HomeRepairService } from "@mui/icons-material";
import { useDeleteCategoryMutation } from "../../../../queries/categories/useDeleteCategoryMutation";
import styles from './styles.module.scss';
import clsx from 'clsx';

export const EditCategoryForm = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const { isSuccess, mutate, isPending, error } = useDeleteCategoryMutation();
    const { chosenCategory, setChosenCategory } = useCategoryContext();
    const { data } = useGetCategoryElementsQuery(chosenCategory?.identifier as string);
    const { handleSubmit } = useForm<Category>();

    const onSubmit = () => {
        mutate(chosenCategory as Category);
    }

    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (isSuccess && chosenCategory) {
            setChosenCategory(null);
        }
    }, [isSuccess, chosenCategory, setChosenCategory]);

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const ModalContent = styled('div')(
        ({ theme }) => css`
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 500;
          text-align: start;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
          background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
          border-radius: 8px;
          border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
          box-shadow: 0 4px 12px
            ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
          padding: 24px;
          color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
      
          & .modal-title {
            margin: 0;
            line-height: 1.5rem;
            margin-bottom: 8px;
          }
      
          & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
            margin-bottom: 4px;
          }
        `,
    );

    const Backdrop = React.forwardRef<
        HTMLDivElement,
        { openModal?: boolean; className: string }
    >((props, ref) => {
        const { openModal, className, ...other } = props;
        return (
            <div
                className={clsx({ 'base-Backdrop-open': openModal }, className)}
                ref={ref}
                {...other}
            />
        );
    });

    const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;


    return <div>
        <div className={styles.summary}>Whole package: {data?.reduce((prev, curr) => prev + curr.price, 0)}$</div>
        <ListItemButton style={{ marginBottom: "5px", borderRadius: '5px' }} onClick={handleClick}>
            <ListItemIcon>
                <HomeRepairService />
            </ListItemIcon>
            <ListItemText primary="Elements" />
            {openModal ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse className={styles.collapse} in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {data?.map((el) => (
                    <ListItem key={el.id}>
                        <ListItemText
                            primary={el.name}
                            secondary={`${el.price}$`}
                        />
                    </ListItem >
                ))}
            </List>
        </Collapse>
        <form>
            <Button
                style={{ marginTop: "5px" }}
                type="button"
                variant="contained"
                disableElevation
                onClick={handleOpen}
            >
                Delete category
            </Button>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ModalContent sx={{ width: 400 }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                        Confirmation!!!
                    </h2>
                    <p id="unstyled-modal-description" className="modal-description">
                        Are you sure that you want to delete <b style={{ fontSize: '18px' }}>{chosenCategory?.name}</b> category?
                    </p>
                    <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
                        <Button
                            style={{ width: '100%' }}
                            type="submit"
                            variant="contained"
                            disableElevation
                            onClick={() => {
                                handleSubmit(onSubmit)();
                                handleClose();
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            style={{ width: '100%', backgroundColor: 'red' }}
                            type="button"
                            variant="contained"
                            disableElevation
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            No
                        </Button>
                    </div>
                </ModalContent>
            </Modal>
            {isPending && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CircularProgress />
                <p>Loading...</p>
            </div>}
            {error && <p color="red">Failed, try again!!!</p>}
        </form>
    </div>
}