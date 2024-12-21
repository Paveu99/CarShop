import { Link } from '@tanstack/react-router';
import { Links } from '../links';
// import styles from './styles.module.scss';

export const MainHeader = () => {
    return <div>
        <Link to='/' style={{ textDecoration: 'none' }}><h1>Car Shop</h1></Link>
        <Links />
    </div>
}