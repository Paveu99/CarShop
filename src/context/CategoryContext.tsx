import { createContext } from "react";
import { Category } from "../utils/types";

export interface CategoryContextType {
    chosenCategory: Category | null;
    setChosenCategory: (category: Category | null) => void;
}

export const CategoryContext = createContext<CategoryContextType | null>(null);
