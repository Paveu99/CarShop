import { useState } from "react"
import { CategoriesList } from "../../lists/category/CategoriesList"
import { CategoryContext } from "../../../../context/CategoryContext"
import { Category } from "../../../../utils/types";
import { EditCategoryForm } from "../../edit forms/category/EditCategoryForm";
import { AddCategoryForm } from "../../add forms/category";

export const CategoryPage = () => {

    const [chosenCategory, setChosenCategory] = useState<Category | null>(null);

    return <CategoryContext.Provider value={{ chosenCategory, setChosenCategory }}>
        <div>
            <h3>Category List:</h3>
            <CategoriesList />
        </div>
        <div>
            <h3>{chosenCategory ? chosenCategory.name : 'Category'} details:</h3>
            {chosenCategory && <EditCategoryForm />}
        </div>
        <div>
            <h3>Add category:</h3>
            <AddCategoryForm />
        </div>
    </CategoryContext.Provider>
}