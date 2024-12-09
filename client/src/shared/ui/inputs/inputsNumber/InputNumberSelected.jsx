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
            <Form.Select
                size="sm"
                onChange={(e) => onChangeSelect(e.target.value)}
                value={value}
            >
                {prop.titles.map((t, i) => (
                    <option key={t.title} value={t.value}>
                        {t.title}
                    </option>
                ))}
            </Form.Select>
            <Form.Group className="mb-3">
                <Form.Control
                    type="number"
                    pattern="^[0-9]+$"
                    value={prop.value || 0}
                    onChange={onChangeFlat}
                    ref={inputRef}
                />
            </Form.Group>
        </>
    );
};

export default InputNumberSelected;
