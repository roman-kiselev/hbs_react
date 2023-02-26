import React, {useState} from 'react';
import {Form, Row} from "react-bootstrap";

const MyCitiesInput = () => {
    const listNumber = [1, 111, 12, 24, 245, 567]

    const [text, setText] = useState('')


    return (
        <Row>
            <Form.Label>Номер Счётчика</Form.Label>
            <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </Row>
    );
};

export default MyCitiesInput;