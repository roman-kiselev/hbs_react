import { useState } from "react";

const useFloatingNumber = (initialValue) => {
    const [number, setNumber] = useState(initialValue);

    const handleInputChange = (e) => {
        const value = parseFloat(e.target.value.replace(",", "."));
        if (!isNaN(value)) {
            setNumber(value);
        } else {
            setNumber(0);
        }
    };

    return [number, setNumber, handleInputChange];
};

export default useFloatingNumber;
