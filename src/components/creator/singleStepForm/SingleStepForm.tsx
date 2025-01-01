import { useForm } from "react-hook-form";
import { Element } from "../../../utils/types";
import { useState, useEffect } from "react";
import { Sum } from "../sum/Sum";
import { useOrderStore } from "../../../store/useOrderStore";
import { useShallow } from "zustand/shallow";

type Props = {
    first: boolean;
    data: Element[] | undefined;
    name: string;
};

type Thing = {
    things: string[];
};

export const SingleStepForm = ({ data, name, first }: Props) => {
    const { selectedParts, setOrderData } = useOrderStore(useShallow(state => ({ selectedParts: state.selectedParts, setOrderData: state.setOrderData })));
    const [sum, setSum] = useState<number>(0);
    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, errors },
        setValue,
        trigger
    } = useForm<Thing>({
        mode: 'onChange',
        defaultValues: {
            things: selectedParts[name]?.map((item) => item.partId.toString()) || [],
        }
    });

    const selectedThings = watch("things", []);

    useEffect(() => {
        if (selectedParts[name]) {
            const selectedPartIds = selectedParts[name].map(item => item.partId.toString());
            setValue('things', selectedPartIds);
        } else {
            setValue('things', []);
        }
    }, [name, selectedParts, setValue]);

    useEffect(() => {
        let newSum = 0;
        selectedThings.forEach((id: string) => {
            const element = data?.find(item => item.partId.toString() === id);
            if (element) {
                newSum += element.price;
            }
        });
        setSum(newSum);
    }, [selectedThings, data]);

    useEffect(() => {
        trigger();
    }, [selectedThings, trigger]);

    const onSubmit = (chosenConfiguration: Thing) => {
        const selectedItems = chosenConfiguration.things
            .map((id) => {
                const element = data?.find((item) => item.partId.toString() === id);
                return element ? element : null;
            })

        const result = {
            category: name,
            parts: selectedItems as Element[],
        };

        console.log(result);
        console.log("Total sum: ", sum);

        setOrderData(result);
    };

    return (
        <div>
            <div>
                <h2>{name.charAt(0).toUpperCase() + name.slice(1)} category:</h2>
                <Sum />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {data?.map((element) => (
                    <div key={element.partId}>
                        <input
                            id={element.id}
                            type="checkbox"
                            {...register('things', {
                                validate: {
                                    required: (value) => value.length > 0 || "You must select at least one item in order to move forward!",
                                }
                            })}
                            value={element.partId.toString()}
                        />
                        <label htmlFor={element.id}>
                            {element.name} - ${element.price}
                        </label>
                    </div>
                ))}
                {!first ? <button type="submit">Previous</button> : ''}
                <button type="submit" disabled={!isValid}>Next</button>
            </form>
            {errors.things && <p>{errors.things.message}</p>}
        </div>
    );
};
