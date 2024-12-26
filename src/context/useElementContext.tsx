import { useContext } from "react";
import { ElementContext } from "./ElementContext";

export const useElementContext = () => {
    const context = useContext(ElementContext);

    if (!context) {
        throw new Error("useElementContext must be used within a ElementContext.Provider");
    }

    return context;
};
