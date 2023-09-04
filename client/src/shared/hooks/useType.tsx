import { ChangeEvent, useState } from "react";

const useType = <T,>(
    initialValue: T
): [T, (value: T) => void, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState<T>(initialValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as T);
    };

    return [value, setValue, handleInputChange];
};

export default useType;