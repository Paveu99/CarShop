import { CircularProgress } from '@mui/material'
import styles from './styles.module.scss'
import { Element, Summary } from '../../../utils/types';

type Props = {
    isLoading: boolean;
    el: Summary;
    test: Element[] | undefined
}

export const SingleOrder = ({ el, isLoading, test }: Props) => {
    return <div className={styles.collapseContent}>
        <p>
            Order ID: <b>{el.id}</b>
        </p>
        <div>
            <p>Order details:</p>
            {
                isLoading ?
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CircularProgress />
                        <p>Loading...</p>
                    </div> :
                    <ul>
                        {test?.map(el => (
                            <li key={el.id}><b>{el.name}</b> - {el.category.charAt(0).toUpperCase() + el.category.slice(1)} - {el.price}$</li>
                        ))}
                    </ul>
            }
        </div>
        <p>
            Total value of the order: <b>{el.value}$</b>
        </p>
        <p>
            First name: <b>{el.firstName}</b>
        </p>
        <p>
            Last name: <b>{el.lastName}</b>
        </p>
        <p>
            Email: <b>{el.email}</b>
        </p>
    </div>
}