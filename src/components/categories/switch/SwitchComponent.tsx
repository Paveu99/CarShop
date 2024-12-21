import styles from './styles.module.scss'

type Props = {
    changeView: (page: string) => void;
    chosenPage: string;
}

export const SwitchComponent = ({ changeView, chosenPage }: Props) => {
    return (
        <section className={styles.miniHeader}>
            <button style={chosenPage === 'category' ? { fontWeight: 'bold' } : {}} onClick={() => changeView("category")}>Categories configuration</button>
            <button style={chosenPage === 'elements' ? { fontWeight: 'bold' } : {}} onClick={() => changeView("elements")}>Elements configuration</button>
        </section>
    )
}
