import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Element } from "../utils/types";


type SelectedParts = Record<string, Element[]>;

type OrderState = {
    selectedParts: SelectedParts;
    totalValue: number;
}

type OrderActions = {
    setOrderData: (payload: SetOrderDataAction) => void,
    placeOrder: () => void
}

type SetOrderDataAction = {
    category: string;
    parts: Element[];
};

const initialState: OrderState = {
    selectedParts: {},
    totalValue: 0
}

export const useOrderStore = create<OrderState & OrderActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            setOrderData: (payload: SetOrderDataAction) => {
                const { category, parts } = payload;
                const currentState = get();

                const updatedSelectedParts = {
                    ...currentState.selectedParts,
                    [category]: parts,
                };
                const updatedTotalValue = Object.values(updatedSelectedParts)
                    .flat()
                    .reduce((sum, part) => sum + part.price, 0);

                set({
                    selectedParts: updatedSelectedParts,
                    totalValue: updatedTotalValue,
                });
            },
            placeOrder: () => set(initialState),
        }),
        {
            name: "order",
            version: 1,
        }
    )
);