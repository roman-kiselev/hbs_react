import React from "react";
import { Col } from "react-bootstrap";
import { InputNumber } from "../../inputs";

const LocationGroup = () => {
    return (
        <>
            <Col>
                <InputNumber
                    title="Секции"
                    value={1}
                    disabled={false}
                    onChange={() => {}}
                />
            </Col>
            <Col>
                <InputNumber
                    title="Этаж"
                    value={1}
                    disabled={false}
                    onChange={() => {}}
                />
            </Col>
            <Col>
                <InputNumber
                    title="Помещение"
                    value={1}
                    disabled={false}
                    onChange={() => {}}
                />
            </Col>
        </>
    );
};

export default LocationGroup;
