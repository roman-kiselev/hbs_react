import React from "react";
import { Form } from "react-bootstrap";

const InputNumberSelected = ({
    prop,
    onChangeFlat,
    value,
    onChangeSelect,
    inputRef,
}) => {
    return (
        <>
            <Form.Select size="sm" value={value} onChange={onChangeSelect}>
                {prop.titles.map((t, i) => (
                    <option key={t.title} value={t.value}>
                        {t.title}
                    </option>
                ))}
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="number"
                    pattern="^[ 0-9]+$"
                    value={prop.value || "Ошибка"}
                    onChange={onChangeFlat}
                    ref={inputRef}
                />
            </Form.Group>
        </>
    );
};

export default InputNumberSelected;
