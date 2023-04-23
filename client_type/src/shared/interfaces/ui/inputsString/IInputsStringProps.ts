import React from "react";
interface IInputStringProps {
    type: string;
    value: string;
    title?: string;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default IInputStringProps;
