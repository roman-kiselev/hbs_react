import React from "react";
import { Col } from "react-bootstrap";
import { InputNumber } from "../../inputs";

const KdlInput = () => {
    return (
        <Col>
            <InputNumber
                title="КДЛ"
                value={1}
                disabled={false}
                onChange={() => {}}
            />
        </Col>
    );
};

export default KdlInput;
