import { Controller, useForm } from "react-hook-form";
import { ElementDto } from "../../../../utils/types";
import { useGetCategoriesQuery } from "../../../../queries/categories/useGetCategoriesQuery";
import { Button, CircularProgress, Input, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled, css } from '@mui/system';
import clsx from 'clsx';
import { usePostElementMutation } from "../../../../queries/elements/usePostElementMutation";
import { useGetElementsQuery } from "../../../../queries/elements/useGetElementsQuery";

export const AddElementForm = () => {
    const { error, isPending, isSuccess, mutate } = usePostElementMutation();
    const { data: categories } = useGetCategoriesQuery();
    const { data: parts } = useGetElementsQuery();
    const { register, handleSubmit, control, formState: { errors, isValid }, reset } = useForm<ElementDto>({
        mode: 'onChange',
        defaultValues: {
            name: "",
            category: "",
            price: 0
        }
    });
    const [successTriggered, setSuccessTriggered] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const inputElement = useRef<HTMLInputElement>();

    const onSubmit = (form: ElementDto) => {
        if (categories && parts) {
            mutate({
                category: form.category.toLowerCase(),
                name: form.name,
                price: Number(form.price),
                partId: form.name.split(' ').map(el => el.toLowerCase()).join('-')
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
        if (isSuccess && !successTriggered) {
            setSuccessTriggered(true);
            reset();
        }
    }, [isSuccess, successTriggered, reset]);

    useEffect(() => {
        if (!isSuccess) {
            setSuccessTriggered(false);
        }
    }, [isSuccess]);

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
                <Input
                    inputRef={inputElement}
                    placeholder="Name of the part..."
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
                            const nameExists = parts?.some(part => part.name.toLowerCase() === value.toLowerCase());
                            return nameExists ? "A part with this name already exists" : true;
                        }
                    })}
                />
                {errors.name && <div>{errors.name.message}</div>}
                <br />
                <Input
                    style={{
                        backgroundColor: '#EBEBEB',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '70%',
                        marginTop: '5px'
                    }}
                    type="number"
                    autoComplete="off"
                    {...register('price', {
                        required: "This field is required",
                        min: { value: 0.01, message: "Min value of 0.01$ is required" }
                    })}
                />
                {errors.price && <div>{errors.price.message}</div>}
                <br />
                <InputLabel id="category-select-label">Category</InputLabel>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            labelId="category-select-label"
                            id="category-select"
                            fullWidth
                            style={{
                                backgroundColor: '#EBEBEB',
                                borderRadius: '5px',
                                padding: '4px',
                                width: '70%',
                                marginTop: '5px',
                                height: '32px'
                            }}
                        >
                            {categories?.map((category) => (
                                <MenuItem key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
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
                {error && <p color="red">Failed, try again!!!</p>}
            </form>
        </div>
    );
};
