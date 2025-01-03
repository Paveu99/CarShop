import { Link, useLocation } from '@tanstack/react-router';
import styles from './styles.module.scss';
import { useOrderStore } from '../../store/useOrderStore';
import { useShallow } from 'zustand/shallow';

export const Links = () => {

    const { pathname } = useLocation();
    const { selectedParts } = useOrderStore(useShallow(state => ({ selectedParts: state.selectedParts })));


    return (
        <div className={styles.stepper}>
            <Link to='/categories' className={`${styles.step} ${pathname.startsWith('/categories') ? styles.active : ''}`}>Categories</Link>
            {
                Object.keys(selectedParts).length > 0 ?
                    <Link to='/creator/$id' params={{ id: Object.keys(selectedParts)[0] }} className={`${styles.step} ${pathname.startsWith('/creator') ? styles.active : ''}`}>Creator</Link> :
                    <Link to='/creator' className={`${styles.step} ${pathname.startsWith('/creator') ? styles.active : ''}`}>Creator</Link>
            }
            <Link to='/history' className={`${styles.step} ${pathname.startsWith('/history') ? styles.active : ''}`}>History</Link>
        </div>
    )
}