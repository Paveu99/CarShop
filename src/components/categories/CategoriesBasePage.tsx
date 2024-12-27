import { useState } from 'react';
import styles from './styles.module.scss'
import { SwitchComponent } from './switch';
import { CategoryPage } from './basePages/category';
import { ElementPage } from './basePages/element';

export const CategoriesBasePage = () => {

    const [chosenPage, setChosenPage] = useState<string>('category');

    return <main className={styles.categoriesContainer}>
        <SwitchComponent changeView={setChosenPage} chosenPage={chosenPage} />
        <div className={styles.container}>
            {
                chosenPage === 'category' ?
                    <CategoryPage /> :
                    <ElementPage />
            }
        </div>
    </main>
}