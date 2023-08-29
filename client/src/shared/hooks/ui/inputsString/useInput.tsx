import { ChangeEvent, useState } from "react";

type UseInputHook<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void];

function useInput<T>(initialValue: T): UseInputHook<T> {
    const [value, setValue] = useState<T>(initialValue);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as T);
    };

    return [value, handleChange];
}

export default useInput;
