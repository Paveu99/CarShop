import { useForm } from "react-hook-form";
import { usePostCategoryMutation } from "../../../../queries/categories/usePostCategoryMutation";
import { CategoryDto } from "../../../../utils/types";
import { useGetCategoriesQuery } from "../../../../queries/categories/useGetCategoriesQuery";
import { Button, CircularProgress, Input, InputLabel, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import styles from './styles.module.scss';
import infoPng from '../../../../images/info.png';

export const AddCategoryForm = () => {
    const { error, isPending, isSuccess, mutate } = usePostCategoryMutation();
    const { data: categories } = useGetCategoriesQuery();
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CategoryDto>({
        mode: 'onChange',
        defaultValues: {
            name: ""
        }
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const inputElement = useRef<HTMLInputElement>();

    const onSubmit = (form: CategoryDto) => {
        if (categories) {
            mutate({
                identifier: form.name.toLowerCase(),
                name: form.name,
                position: categories?.length + 1
            });
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            setSuccessMessage("Successfully added!");
            reset();

            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, reset]);

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
        { open?: boolean; className: string }
    >((props, ref) => {
        const { open, className, ...other } = props;
        return (
            <div
                className={clsx({ 'base-Backdrop-open': open }, className)}
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

    return (
        <div>
            <form>
                <InputLabel sx={{ paddingLeft: '5px', color: 'white' }} className={styles.inputLabel}>Name:</InputLabel>
                <Input
                    inputRef={inputElement}
                    placeholder="Name of the category..."
                    style={{
                        backgroundColor: '#EBEBEB',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '70%',
                        marginTop: '5px'
                    }}
                    type="text"
                    autoComplete="off"
                    {...register('name', {
                        required: "This field is required",
                        minLength: { value: 3, message: "Min 3 characters required" },
                        maxLength: { value: 35, message: "Max 35 characters required" },
                        validate: (value) => {
                            const nameExists = categories?.some(category => category.name.toLowerCase().trim() === value.toLowerCase().trim());
                            return nameExists ? "A category with this name already exists" : true;
                        }
                    })}
                />
                {errors.name && <div>{errors.name.message}</div>}
                <br />
                <Button
                    style={{ marginTop: "5px" }}
                    type="button"
                    variant="contained"
                    disableElevation
                    disabled={!isValid}
                    onClick={handleOpen}
                >
                    Create
                </Button>
                <Modal
                    open={open}
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
                            Are you sure that you want to add <b style={{ fontSize: '18px' }}>{inputElement.current?.value}</b> as a category?
                        </p>
                        <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center', width: '100%', gap: '10px' }}>
                            <Button
                                style={{ width: '100%' }}
                                type="submit"
                                variant="contained"
                                disableElevation
                                disabled={!isValid}
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
                                disabled={!isValid}
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
                {error && <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <img className={styles.infoButton} src={infoPng} />
                    <p>Failed to add!!!</p>
                </div>}
                {!!successMessage && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "green" }}>
                        <img className={styles.infoButton} src={infoPng} alt="info" />
                        <p>{successMessage}</p>
                    </div>
                )}
            </form>
        </div>
    );
};
