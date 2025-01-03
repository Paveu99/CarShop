import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category, Element } from "../utils/types";

type SelectedParts = Record<string, Element[]>;

type OrderState = {
    selectedParts: SelectedParts;
    totalValue: number;
};

type OrderActions = {
    setOrderData: (payload: SetOrderDataAction) => void;
    validateCategories: (categories: Category[]) => void;
    validateParts: (elements: Element[]) => void;
    placeOrder: () => void;
};

type SetOrderDataAction = {
    category: string;
    parts: Element[];
};

const initialState: OrderState = {
    selectedParts: {},
    totalValue: 0,
};

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
            validateCategories: (categories) => {
                const currentState = get();

                const validCategoryIdentifiers = categories.map(category => category.identifier);

                const updatedSelectedParts = Object.keys(currentState.selectedParts)
                    .filter(category => validCategoryIdentifiers.includes(category))
                    .reduce((acc, category) => {
                        acc[category] = currentState.selectedParts[category];
                        return acc;
                    }, {} as SelectedParts);

                const updatedTotalValue = Object.values(updatedSelectedParts)
                    .flat()
                    .reduce((sum, part) => sum + part.price, 0);

                set({
                    selectedParts: updatedSelectedParts,
                    totalValue: updatedTotalValue,
                });
            },
            validateParts: (elements) => {
                const currentState = get();

                const elementMap = elements.reduce((map, element) => {
                    map[element.id] = element;
                    return map;
                }, {} as Record<string, Element>);

                const updatedSelectedParts = Object.entries(currentState.selectedParts)
                    .reduce((acc, [category, parts]) => {
                        const validParts = parts.map(part => elementMap[part.id]).filter(Boolean);

                        if (validParts.length > 0) {
                            validParts.forEach(part => {
                                if (part.category !== category) {
                                    acc[part.category] = acc[part.category] || [];
                                    acc[part.category].push(part);
                                } else {
                                    acc[category] = acc[category] || [];
                                    acc[category].push(part);
                                }
                            });
                        }

                        return acc;
                    }, {} as SelectedParts);

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
