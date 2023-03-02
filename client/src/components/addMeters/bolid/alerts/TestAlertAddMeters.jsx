import React from 'react';
import {Alert, Col, Row} from "react-bootstrap";

const TestAlertAddMeters = ({alertAdd , section ,flat, floor, numberKdl,numberMeter, typeMeter, numberAsr, sumMeter}) => {
    return (
        <Alert show={alertAdd} variant="info">
            <Col>
                <Row style={{fontSize: 14}}>
                    <Row>Были успешно добавлены</Row>
                    <Row>Секция № {section}, Этаж № {floor}, Квартира № {flat}</Row>
                    <Row>
                        Кдл №{numberKdl} Канал №{numberAsr}
                    </Row>
                    <Row>
                        {typeMeter} № {numberMeter} {sumMeter}
                    </Row>
                </Row>
            </Col>
        </Alert>
    );
};

export default TestAlertAddMeters;