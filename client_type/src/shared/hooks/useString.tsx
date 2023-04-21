import React, { useState } from "react";

const useString = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(String(e.target.value));
    };

    return [value, setValue, handleInputChange];
};

export default useString;
