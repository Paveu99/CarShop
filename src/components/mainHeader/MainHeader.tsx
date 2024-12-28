import { Link } from '@tanstack/react-router';
import { Links } from '../links';
import styles from './styles.module.scss';
import { CarCrash } from '@mui/icons-material'

export const MainHeader = () => {
    return <header>
        <div className={styles.shopNameContainer}>
            <CarCrash sx={{ fontSize: '60px' }} />
            <Link to='/' className={styles.name} style={{ textDecoration: 'none' }}><h1>CAR SHOP</h1> </Link>
        </div>
        <Links />
    </header>
}