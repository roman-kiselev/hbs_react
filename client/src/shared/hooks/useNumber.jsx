import React, { useState } from "react";

// Хук для инпутов
const useNumber = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    return [value, setValue, handleInputChange];
};

export default useNumber;
