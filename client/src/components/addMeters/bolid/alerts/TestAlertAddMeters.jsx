import React from 'react';
import {Alert, Col, Row} from "react-bootstrap";

const TestAlertAddMeters = ({alertAdd , flat, floor}) => {
    return (
        <Alert show={alertAdd} variant="info">
            <Col>
                <Row style={{fontSize: 14}}>
                    <Row>Были успешно добавлены</Row>
                    <Row>Этаж №{floor|| 0} Квартира №{flat || 0}</Row>
                    {/*<Row>
                        Кдл №{meter.numberKdl || 0} Канал №{meter.channelCool || 0} и №{meter.channelHot || 0}
                    </Row>*/}
                </Row>
            </Col>
        </Alert>
    );
};

export default TestAlertAddMeters;