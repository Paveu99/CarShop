import { useShallow } from "zustand/shallow";
import { useOrderStore } from "../../../store/useOrderStore";

export const Sum = () => {
    const [total] = useOrderStore(useShallow(state => [state.totalValue]))

    return <h3>Total so far: {total}$</h3>
}