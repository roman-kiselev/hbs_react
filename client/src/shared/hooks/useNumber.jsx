import { useState } from "react";

// Хук для инпутов
const useNumber = (initialValue) => {
    const [value, setValue] = useState(Number(initialValue));

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return [Number(value), setValue, handleInputChange];
};

export default useNumber;
