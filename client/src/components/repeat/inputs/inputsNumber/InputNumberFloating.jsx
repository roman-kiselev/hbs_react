import React from "react";
import { Form } from "react-bootstrap";

const InputNumberFloating = ({ prop, onChange }) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{prop.title}</Form.Label>
                <Form.Control
                    type="number"
                    pattern="^[ 0-9]+$"
                    step="0.01"
                    value={prop.value || "Ошибка"}
                    onChange={onChange}
                />
            </Form.Group>
        </>
    );
};

export default InputNumberFloating;
