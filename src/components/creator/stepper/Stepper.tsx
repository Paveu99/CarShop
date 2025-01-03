import { useShallow } from 'zustand/shallow';
import { useGetCategoriesQuery } from '../../../queries/categories/useGetCategoriesQuery';
import { useOrderStore } from '../../../store/useOrderStore';
import styles from './styles.module.scss';
import { Link, useLocation } from '@tanstack/react-router';

type Props = {
    availableIds: string[]
}

export const Stepper = ({ availableIds }: Props) => {

    const { selectedParts } = useOrderStore(useShallow(state => ({ selectedParts: state.selectedParts })));
    const { pathname } = useLocation();
    const { data } = useGetCategoriesQuery();

    return (
        <div className={styles.stepper}>
            {data?.filter(el => availableIds.includes(el.identifier)).map((el, index) => (
                <Link
                    disabled={index !== 0 ? ![...Object.keys(selectedParts), availableIds[Object.keys(selectedParts).length]].includes(el.identifier) : false}
                    key={el.id}
                    to='/creator/$id'
                    params={{ id: `${el.identifier}` }}
                    className={`${styles.step} ${pathname.startsWith(`/creator/${encodeURIComponent(el.identifier)}`) ? styles.active : ''}`}
                >
                    {index + 1}. {el.name}
                </Link>
            ))}
            <Link
                disabled={Object.keys(selectedParts).length !== availableIds.length}
                to='/creator/summary'
                className={`${styles.step} ${pathname.startsWith(`/creator/summary`) ? styles.active : ''}`}
            >
                Summary
            </Link>
        </div>
    )
}