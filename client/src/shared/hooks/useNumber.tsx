import React, { useState } from "react";

const useNumber = (initialValue: number) => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    return [value, setValue, handleInputChange];
};

export default useNumber;
