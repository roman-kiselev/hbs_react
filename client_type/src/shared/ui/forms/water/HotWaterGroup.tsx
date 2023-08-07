import React from "react";
import { Col } from "react-bootstrap";
import { InputNumber } from "../../inputs";

const HotWaterGroup = () => {
    return (
        <Col
            className="col-12 col-sm-6 text-center"
            style={{
                border: "1px solid grey",
                borderRadius: 10,
            }}
        >
            <h5>ГВС</h5>

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

export default HotWaterGroup;
