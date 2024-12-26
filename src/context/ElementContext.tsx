import { createContext } from "react";
import { Element } from "../utils/types";

export interface ElementContextType {
    chosenElement: Element | null;
    setChosenElement: (category: Element | null) => void;
}

export const ElementContext = createContext<ElementContextType | null>(null);
