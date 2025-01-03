import { useState } from "react";
import { ElementContext } from "../../../../context/ElementContext";
import { Element } from "../../../../utils/types";
import { ElementsList } from "../../lists/element";
import { EditElementForm } from "../../edit forms/elements";
import { AddElementForm } from "../../add forms/elements";

export const ElementPage = () => {
    const [chosenElement, setChosenElement] = useState<Element | null>(null);

    return <ElementContext.Provider value={{ chosenElement, setChosenElement }}>
        <div>
            <h3>Parts List:</h3>
            <ElementsList />
        </div>
        <div>
            <h3>{chosenElement ? chosenElement.name : 'Element'} details:</h3>
            {chosenElement && <EditElementForm />}
        </div>
        <div>
            <h3>Add part:</h3>
            <AddElementForm />
        </div>
    </ElementContext.Provider>
}