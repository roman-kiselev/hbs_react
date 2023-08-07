import React from "react";
import { Col } from "react-bootstrap";
import { InputNumber } from "../../inputs";

const ColdWaterGroup = () => {
    return (
        <Col
            className="col-12 col-sm-6 col text-center"
            style={{
                border: "1px solid grey",
                borderRadius: 10,
            }}
        >
            <h5>ХВС</h5>

            <InputNumber
                title="Номер Канала"
                value={1}
                disabled={false}
                onChange={() => {}}
            />

            <InputNumber
                title="Номер счётчика"
                value={1}
                disabled={false}
                onChange={() => {}}
            />
            <InputNumber
                title="Показания"
                value={1}
                disabled={false}
                onChange={() => {}}
            />
        </Col>
    );
};

export default ColdWaterGroup;
