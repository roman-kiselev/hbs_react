import { Form } from "react-bootstrap";

interface InputNumberProps {
    title: string;
    value: number;
    disabled: boolean;
    onChange: () => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
    disabled,
    onChange,
    title,
    value,
}) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    type="number"
                    pattern="^[ 0-9]+$"
                    value={value || "Ошибка"}
                    onChange={onChange}
                    disabled={disabled ? true : false}
                />
            </Form.Group>
        </>
    );
};

export default InputNumber;
