import { Button } from '@mui/material';
import styles from './styles.module.scss'

type Props = {
    changeView: (page: string) => void;
    chosenPage: string;
}

export const SwitchComponent = ({ changeView, chosenPage }: Props) => {
    return (
        <section className={styles.miniHeader}>
            <Button
                type="button"
                variant="contained"
                color="primary"
                disableElevation
                sx={{
                    fontWeight: chosenPage === 'category' ? 'bold' : 'normal',
                    backgroundColor: chosenPage === 'category' ? 'blue' : '-moz-initial'
                }}
                onClick={() => changeView("category")}
            >
                Categories configuration
            </Button>
            <Button
                type="button"
                variant="contained"
                disableElevation
                sx={{
                    fontWeight: chosenPage === 'elements' ? 'bold' : 'normal',
                    backgroundColor: chosenPage === 'elements' ? 'blue' : '-moz-initial'
                }}
                onClick={() => changeView("elements")}
            >
                Parts configuration
            </Button>
        </section>
    )
}
