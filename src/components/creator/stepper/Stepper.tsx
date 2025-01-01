import { useGetCategoriesQuery } from '../../../queries/categories/useGetCategoriesQuery';
import styles from './styles.module.scss';
import { Link, useLocation } from '@tanstack/react-router';

type Props = {
    availableIds: string[]
}

export const Stepper = ({ availableIds }: Props) => {

    const { pathname } = useLocation();
    const { data } = useGetCategoriesQuery();

    return (
        <div className={styles.stepper}>
            {data?.filter(el => availableIds.includes(el.identifier)).map((el, index) => (
                <Link
                    key={el.id}
                    to='/creator/$id'
                    params={{ id: `${el.identifier}` }}
                    className={`${styles.step} ${pathname.startsWith(`/creator/${el.identifier}`) ? styles.active : ''}`}
                >
                    {index + 1}. {el.name}
                </Link>
            ))}
            <Link
                disabled={true}
                to='/creator/summary'
                className={`${styles.step} ${pathname.startsWith(`/creator/summary`) ? styles.active : ''}`}
            >
                Summary
            </Link>
        </div>
    )
}