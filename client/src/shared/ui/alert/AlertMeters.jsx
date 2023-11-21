import React from "react";
import { Alert, Col, Row } from "react-bootstrap";

const AlertMeters = ({ alertAdd, meterData }) => {
    return (
        <Alert show={alertAdd} variant="info">
            <Col>
                <Row style={{ fontSize: 14 }}>
                    <Row>Были успешно добавлены</Row>
                    <Row>
                        Секция № {meterData.section}, Этаж № {meterData.floor},
                        Квартира № {meterData.flat}
                    </Row>
                    {meterData.typeMeter === "Счётчик тепла" ||
                    meterData.typeMeter === "Счётчик электроэнергии" ? (
                        <Row>Линия №{meterData.line}</Row>
                    ) : (
                        <Row>
                            Кдл №{meterData.numberKdl} Канал №
                            {meterData.numberAsr}
                        </Row>
                    )}

                    <Row>
                        {meterData.typeMeter} № {meterData.numberMeter}
                        {meterData.sumMeter}
                    </Row>
                </Row>
            </Col>
        </Alert>
    );
};

export default AlertMeters;
