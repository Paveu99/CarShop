import { Link, useLocation } from '@tanstack/react-router';
import styles from './styles.module.scss';

export const Links = () => {

    const { pathname } = useLocation();

    return (
        <div className={styles.stepper}>
            <Link to='/categories' className={`${styles.step} ${pathname.startsWith('/categories') ? styles.active : ''}`}>Categories</Link>
            <Link to='/creator' className={`${styles.step} ${pathname.startsWith('/creator') ? styles.active : ''}`}>Creator</Link>
            <Link to='/history' className={`${styles.step} ${pathname.startsWith('/history') ? styles.active : ''}`}>History</Link>
        </div>
    )
}