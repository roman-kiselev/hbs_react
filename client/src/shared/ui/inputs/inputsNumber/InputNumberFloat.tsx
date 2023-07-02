import React from "react";
import { Form } from "react-bootstrap";
import { IInputNumber } from "../../../interfaces";

const InputNumberFloat: React.FC<IInputNumber> = ({
    disabled,
    onChange,
    title,
    value,
}) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{title}</Form.Label>
            <Form.Control
                type="number"
                pattern="^[ 0-9]+$"
                step="0.01"
                value={value || "Ошибка"}
                disabled={disabled}
                onChange={onChange}
            />
        </Form.Group>
    );
};

export default InputNumberFloat;
