import { useState } from "react";

const useFloatingNumber = (initialValue) => {
    const [number, setNumber] = useState(initialValue);

    const handleInputChange = (e) => {
        setNumber(e.target.value);
    };

    return [number, setNumber, handleInputChange];
};

export default useFloatingNumber;
