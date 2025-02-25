import { useForm } from 'react-hook-form';
import {
    Button,
    CircularProgress,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    styled,
    css,
} from '@mui/material';
import infoPng from '../../../../images/info.png';
import { useEffect, useRef, useState } from 'react';
import { useElementContext } from '../../../../context/useElementContext';
import { useGetCategoriesQuery } from '../../../../queries/categories/useGetCategoriesQuery';
import { useEditElementMutation } from '../../../../queries/elements/useEditElementMutation';
import { Element } from '../../../../utils/types';
import { useDeleteElementMutation } from '../../../../queries/elements/useDeleteElementMutation';
import styles from './styles.module.scss'
import { useGetElementsQuery } from '../../../../queries/elements/useGetElementsQuery';
import { useOrderStore } from '../../../../store/useOrderStore';
import { useShallow } from 'zustand/shallow';

export const EditElementForm = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const { validateParts } = useOrderStore(useShallow(state => ({ validateParts: state.validateParts })));


    const inputRef = useRef<HTMLSelectElement | null>(null);
    const [different, setDifferent] = useState<boolean>(false);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { mutate, isPending, error } = useEditElementMutation();
    const { mutate: deletePart } = useDeleteElementMutation();
    const { chosenElement, setChosenElement } = useElementContext();
    const { data: categories } = useGetCategoriesQuery();
    const { refetch } = useGetElementsQuery();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            category: '',
        },
    });

    const capitilizedCategory =
        chosenElement ?
            chosenElement?.category.charAt(0).toUpperCase() + chosenElement?.category.slice(1) :
            '';

    useEffect(() => {
        setValue('category', capitilizedCategory);
    }, [capitilizedCategory, setValue, chosenElement]);

    const onDelete = async () => {
        if (!chosenElement) return;

        deletePart(chosenElement.id, {
            onSuccess: async () => {
                setChosenElement(null);
                setOpenModal(false);

                const { data: elements } = await refetch();
                if (elements) {
                    validateParts(elements);
                }
            },
        });
    };

    const onSubmit = async (data: Partial<Element>) => {
        if (!chosenElement) return;

        const updatedElement: Element = {
            ...chosenElement,
            category: data.category?.toLowerCase() || chosenElement.category,
        };

        mutate(updatedElement, {
            onSuccess: async () => {
                setChosenElement(updatedElement);
                setOpenModal(false);
                setSuccessMessage("Successfully added!");

                const timer = setTimeout(() => {
                    setSuccessMessage(null);
                }, 2000);

                const { data: elements } = await refetch();
                if (elements) {
                    validateParts(elements);
                }

                return () => clearTimeout(timer);
            },
        });
    };


    const selectedCategory = watch('category');
    useEffect(() => {
        setDifferent(capitilizedCategory !== selectedCategory);
    }, [capitilizedCategory, selectedCategory]);

    const handleOpen = () => {
        if (different) {
            setOpenModal(true);
        }
    };

    const handleClose = () => setOpenModal(false);
    const handleDeleteClose = () => setOpenDeleteModal(false);
    const handleDeleteOpen = () => setOpenDeleteModal(true);

    const grey = {
        50: '#F3F6F9',
        900: '#1C2025',
    };

    const ModalContent = styled('div')(
        ({ theme }) => css`
            background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
            border-radius: 8px;
            padding: 24px;
        `
    );

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    {...register('category', { required: 'Category is required' })}
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory || ''}
                    onChange={(e) => setValue('category', e.target.value as string)}
                    fullWidth
                    error={!!errors.category}
                    inputRef={inputRef}
                >
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                {errors.category && (
                    <p style={{ color: 'red', marginTop: '5px' }}>{errors.category.message}</p>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        style={{ marginTop: '10px' }}
                        type="button"
                        variant="contained"
                        disableElevation
                        disabled={!different}
                        onClick={handleOpen}
                    >
                        Update part's category
                    </Button>

                    <Button
                        style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}
                        type="button"
                        variant="contained"
                        disableElevation
                        onClick={handleDeleteOpen}
                    >
                        Delete part
                    </Button>
                </div>

                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="confirmation-modal-title"
                    aria-describedby="confirmation-modal-description"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ModalContent sx={{ width: 400 }}>
                        <h2 id="confirmation-modal-title">Confirmation!!!</h2>
                        <p id="confirmation-modal-description">
                            Are you sure you want to change the category for{' '}
                            <b style={{ fontSize: '18px' }}>{chosenElement?.name}</b> part from{' '}
                            <b style={{ fontSize: '18px' }}>{capitilizedCategory}</b> to{' '}
                            <b style={{ fontSize: '18px' }}>{selectedCategory}</b>?
                        </p>
                        <div
                            style={{
                                marginTop: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            <Button
                                style={{ width: '100%' }}
                                type="button"
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
                                onClick={handleClose}
                            >
                                No
                            </Button>
                        </div>
                    </ModalContent>
                </Modal>

                <Modal
                    open={openDeleteModal}
                    onClose={handleDeleteClose}
                    aria-labelledby="confirmation-modal-title"
                    aria-describedby="confirmation-modal-description"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ModalContent sx={{ width: 400 }}>
                        <h2 id="confirmation-modal-title">Confirmation!!!</h2>
                        <p id="confirmation-modal-description">
                            Are you sure you want to delete {' '}
                            <b style={{ fontSize: '18px' }}>{chosenElement?.name}</b> from the database?
                        </p>
                        <div
                            style={{
                                marginTop: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                            }}
                        >
                            <Button
                                style={{ width: '100%' }}
                                type="button"
                                variant="contained"
                                disableElevation
                                onClick={() => {
                                    onDelete();
                                    handleDeleteClose();
                                }}
                            >
                                Yes
                            </Button>
                            <Button
                                style={{ width: '100%', backgroundColor: 'red' }}
                                type="button"
                                variant="contained"
                                disableElevation
                                onClick={handleDeleteClose}
                            >
                                No
                            </Button>
                        </div>
                    </ModalContent>
                </Modal>

                {isPending && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '10px',
                        }}
                    >
                        <CircularProgress />
                        <p>Loading...</p>
                    </div>
                )}
                {error && <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <img className={styles.infoButton} src={infoPng} />
                    <p>Failed to edit!!!</p>
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
