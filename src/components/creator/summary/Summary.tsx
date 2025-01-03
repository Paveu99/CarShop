import { useShallow } from "zustand/shallow"
import { useOrderStore } from "../../../store/useOrderStore"
import { useForm } from "react-hook-form"
import { SummaryDto } from "../../../utils/types"
import { usePostSummaryMutation } from "../../../queries/summary/usePostSummaryMutation"
import { Button, CircularProgress, css, Input, InputLabel, Modal, styled } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import styles from './styles.module.scss'
import clsx from 'clsx';
import infoPng from '../../../images/info.png';
import { useNavigate } from "@tanstack/react-router"

export const Summary = () => {

    const { selectedParts, placeOrder, totalValue } = useOrderStore(useShallow(state => ({ selectedParts: state.selectedParts, placeOrder: state.placeOrder, totalValue: state.totalValue })))
    const { error, isSuccess, mutate, isPending } = usePostSummaryMutation();
    const inputElement1 = useRef<HTMLInputElement>();
    const inputElement2 = useRef<HTMLInputElement>();
    const [open, setOpen] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<SummaryDto>({
        mode: "onChange",
        defaultValues: {
            details: Object.values(selectedParts).flat().map(part => part.partId).join(','),
            value: totalValue
        }
    });


    const onSubmit = (data: SummaryDto) => {
        mutate({
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim(),
            details: data.details,
            value: Number(data.value),
        });
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isSuccess) {
            setSuccessMessage("Successfully added!");

            const timer = setTimeout(() => {
                setSuccessMessage(null);
                placeOrder();
                navigate({ to: '/creator' })
            }, 2000);

            return () => clearTimeout(timer);
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

    return <div className={styles.container}>
        <div>
            <form>
                <InputLabel sx={{ paddingLeft: '5px', color: 'white' }} className={styles.inputLabel} id="name-select-label">First name:</InputLabel>
                <Input
                    inputRef={inputElement1}
                    placeholder="First name of the user..."
                    style={{
                        backgroundColor: '#EBEBEB',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '350px',
                        marginTop: '5px'
                    }}
                    type="text"
                    autoComplete="off"
                    {...register('firstName', {
                        required: "This field is required",
                        minLength: { value: 2, message: "Min 2 characters required" },
                        maxLength: { value: 35, message: "Max 35 characters required" }
                    })}
                />
                {errors.firstName && <div>{errors.firstName.message}</div>}
                <br />
                <InputLabel sx={{ paddingLeft: '5px', color: 'white' }} className={styles.inputLabel} id="name-select-label">Last name:</InputLabel>
                <Input
                    inputRef={inputElement2}
                    placeholder="Last name of the user..."
                    style={{
                        backgroundColor: '#EBEBEB',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '350px',
                        marginTop: '5px'
                    }}
                    type="text"
                    autoComplete="off"
                    {...register('lastName', {
                        required: "This field is required",
                        minLength: { value: 2, message: "Min 2 characters required" },
                        maxLength: { value: 35, message: "Max 35 characters required" }
                    })}
                />
                {errors.lastName && <div>{errors.lastName.message}</div>}
                <br />
                <InputLabel sx={{ paddingLeft: '5px', color: 'white' }} className={styles.inputLabel} id="name-select-label">Email:</InputLabel>
                <Input
                    placeholder="Last name of the user..."
                    style={{
                        backgroundColor: '#EBEBEB',
                        borderRadius: '5px',
                        padding: '4px',
                        width: '350px',
                        marginTop: '5px'
                    }}
                    type="text"
                    autoComplete="off"
                    {...register('email', {
                        required: "This field is required",
                        minLength: { value: 2, message: "Min 2 characters required" },
                        maxLength: { value: 35, message: "Max 35 characters required" },
                        validate: (value) => {
                            const atExists = value.includes('@');
                            const endsWith = value.endsWith('.com') || value.endsWith('.pl')
                            if (!atExists) return "This is not a valid email name"
                            if (!endsWith) return "The email address must end with '.com' or '.pl'"
                            return true
                        }
                    })}
                />
                {errors.email && <div>{errors.email.message}</div>}
                <br />
                <Button
                    style={{ marginTop: "5px" }}
                    type="button"
                    variant="contained"
                    disableElevation
                    disabled={!isValid}
                    onClick={handleOpen}
                >
                    Order
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
                            Dear <b style={{ fontSize: '18px' }}>{inputElement1.current?.value} {inputElement2.current?.value}</b> are you sure that you want to add as a category?
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
                {error && <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <img className={styles.infoButton} src={infoPng} />
                    <p>Failed to add!!!</p>
                </div>}
                {isPending && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CircularProgress />
                    <p>Loading...</p>
                </div>}
                {!!successMessage && (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "green" }}>
                        <img className={styles.infoButton} src={infoPng} alt="info" />
                        <p>{successMessage}</p>
                    </div>
                )}
            </form>
        </div>
        <div>
            <h2 style={{ margin: 0 }}>Order summary: {totalValue}$</h2>
            <div className={styles.container}>
                {Object.keys(selectedParts).map(category => (
                    <div key={category}>
                        <p style={{ marginBottom: 0, fontWeight: 500 }}>{category.charAt(0).toUpperCase() + category.slice(1)}:</p>
                        <ul style={{ marginTop: 0 }}>
                            {Object.values(selectedParts).flat().filter(el => el.category === category).map(part => (
                                <li key={part.id}>{part.name} - {part.price}$</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
}