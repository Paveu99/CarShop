import { CategoriesList } from "../../lists/category/CategoriesList"

export const CategoryPage = () => {
    return <>
        <div>
            <h3>Category List:</h3>
            <CategoriesList />
        </div>
        <div>
            <h3>Category details:</h3>
            <div>EDIT FORM</div>
        </div>
        <div>
            <h3>Add category:</h3>
            <div>ADD FORM</div>
        </div>
    </>
}