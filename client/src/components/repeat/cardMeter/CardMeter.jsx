import React, { useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import TestFormEditMeter from "../../addMeters/bolid/formMeter/TestFormEditMeter";
import CardMeterEditModal from "../modals/CardMeterEditModal";

const CardMeter = ({ cardData, handleClickForEdit }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col className="col-12 col-xl-4 mt-3 ">
                <Row>
                    {/* <TestFormEditMeter
                        data={{
                            cardData,
                        }}
                        show={show}
                        handleClose={() => handleClose()}
                    /> */}

                    <CardMeterEditModal
                        data={cardData}
                        show={show}
                        handleClose={() => handleClose()}
                        handleClickForEdit={handleClickForEdit}
                    />
                </Row>
                <Card className="text-center">
                    <Card.Header className="text-center">
                        Квартира № {cardData.flat}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Секция №{cardData.section} - Этаж №{cardData.floor}
                        </Card.Title>
                        <Card.Text className="text-center">
                            <li className="list-unstyled">
                                {cardData.typeMeter}
                            </li>

                            {cardData.typeMeter === "Счётчик тепла" ||
                            "Счётчик электроэнергии" ? (
                                <li className="list-unstyled">
                                    Линия № {cardData.line}
                                </li>
                            ) : (
                                <></>
                            )}
                            {cardData.typeMeter === "Счётчик холодной воды" ||
                            "Счётчик горячей воды" ? (
                                <li className="list-unstyled">
                                    КДЛ № {cardData.numberKdl}
                                </li>
                            ) : (
                                <></>
                            )}
                            {cardData.typeMeter === "Счётчик тепла" ||
                            "Счётчик электроэнергии" ? (
                                <li className="list-unstyled">
                                    Канал № {cardData.numberAsr}
                                </li>
                            ) : (
                                <></>
                            )}
                            {cardData.numberMeter !== null ? (
                                <li className="list-unstyled">
                                    Счётчик № {cardData.numberMeter}
                                </li>
                            ) : (
                                <></>
                            )}

                            {cardData.sumMeter !== null ? (
                                <li className="list-unstyled">
                                    Показания: {cardData.sumMeter}
                                </li>
                            ) : (
                                <></>
                            )}
                        </Card.Text>
                        <Button variant="primary" onClick={handleShow}>
                            Редактировать
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default CardMeter;
