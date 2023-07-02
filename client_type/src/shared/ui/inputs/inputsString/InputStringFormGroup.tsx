import React from "react";
import { Col, Form } from "react-bootstrap";
import { IInputStringFormGroupProps } from "../../../interfaces";

const InputStringFormGroup: React.FC<IInputStringFormGroupProps> = ({
    disabled,
    onChange,
    title,
    value,
}) => {
    return (
        <>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    type="text"
                    value={value ? value : ""}
                    disabled={disabled}
                    onChange={onChange}
                />
            </Form.Group>
        </>
    );
};

export default InputStringFormGroup;
