import React from "react";

const useStringForFormInput = (
    initialValue: string
): [
    string,
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    React.Dispatch<React.SetStateAction<string>>
] => {
    const [value, setValue] = React.useState(initialValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = String(e.target.value);
        setValue(newValue);
    };

    return [value, handleInputChange, setValue];
};

export default useStringForFormInput;
