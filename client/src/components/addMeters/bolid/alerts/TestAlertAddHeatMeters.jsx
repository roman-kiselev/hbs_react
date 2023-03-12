import React from 'react';
import {Alert, Col, Row} from "react-bootstrap";

const TestAlertAddHeatMeters = ({alertAdd , section ,flat, floor, line, numberMeter, typeMeter, sumMeter}) => {
    return (
        <Alert show={alertAdd} variant="info">
            <Col>
                <Row style={{fontSize: 14}}>
                    <Row>Были успешно добавлены</Row>
                    <Row>Секция № {section}, Этаж № {floor}, Квартира № {flat}</Row>
                    <Row>
                        Линия №{line}
                    </Row>
                    <Row>
                        {typeMeter} № {numberMeter} {sumMeter}
                    </Row>
                </Row>
            </Col>
        </Alert>
    );
};

export default TestAlertAddHeatMeters;