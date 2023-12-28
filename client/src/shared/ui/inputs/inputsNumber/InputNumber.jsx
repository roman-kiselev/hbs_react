import { Form } from "react-bootstrap";

const InputNumber = ({ prop, onChange }) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{prop.title}</Form.Label>
                <Form.Control
                    type="number"
                    pattern="^[ 0-9]+$"
                    value={prop.value || "Ошибка"}
                    onChange={onChange}
                    disabled={prop.disabled ? true : false}
                />
            </Form.Group>
        </>
    );
};

export default InputNumber;
