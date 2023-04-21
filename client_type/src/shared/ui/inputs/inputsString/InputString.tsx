import React from "react";
import { Form } from "react-bootstrap";
import { IInputStringProps } from "../../../interfaces";

const InputString: React.FC<IInputStringProps> = ({
    title,
    value,
    disabled,
    onChange,
}) => {
    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {title ? <Form.Label>{title}</Form.Label> : <></>}

            <Form.Control
                type="text"
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
        </Form.Group>
    );
};

export default InputString;
