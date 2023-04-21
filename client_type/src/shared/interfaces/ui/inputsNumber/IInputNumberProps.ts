import React from "react";

interface IInputNumberProps {
    title: string;
    value: number;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default IInputNumberProps;
