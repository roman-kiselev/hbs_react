import React from "react";
import { Form } from "react-bootstrap";
import { IInputNumber } from "../../../interfaces";

const InputNumber: React.FC<IInputNumber> = ({
    value,
    title,
    onChange,
    disabled,
}) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    type="number"
                    pattern="^[ 0-9]+$"
                    value={value || "Ошибка"}
                    onChange={onChange}
                    disabled={disabled}
                />
            </Form.Group>
        </>
    );
};

export default InputNumber;
