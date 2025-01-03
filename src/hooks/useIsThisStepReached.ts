import { useShallow } from "zustand/shallow"
import { useOrderStore } from "../store/useOrderStore"
import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router";

export const useOrderSuccess = (name: string, first: boolean, ids: string[]) => {
    const { selectedParts } = useOrderStore(useShallow(state => ({ selectedParts: state.selectedParts })));
    const navigate = useNavigate()

    const isNamePresentInOrder = () => {
        if (first) {
            return true
        }
        return [...Object.keys(selectedParts), ids[Object.keys(selectedParts).length]].includes(name);
    }

    useEffect(() => {
        if (!isNamePresentInOrder()) navigate({ to: '/creator/$id', params: { id: Object.keys(selectedParts)[0] } })
    }, [name])
}