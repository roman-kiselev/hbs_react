import React, { useState } from "react";
import {
    Col,
    Row,
    Card,
    Button,
    Popover,
    OverlayTrigger,
} from "react-bootstrap";
import TestFormEditMeter from "../../addMeters/bolid/formMeter/TestFormEditMeter";
import CardMeterEditModal from "../modals/CardMeterEditModal";

const CardMeter = ({ cardData, handleClickForEdit }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Комментарий</Popover.Header>
            <Popover.Body>{cardData.comment}</Popover.Body>
        </Popover>
    );

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
                    {cardData.flat ? (
                        <Card.Header className="text-center">
                            Квартира № {cardData.flat}
                        </Card.Header>
                    ) : (
                        <Card.Header className="text-center bg-warning">
                            Офис № {cardData.office}
                        </Card.Header>
                    )}

                    <Card.Body>
                        <Card.Title className="text-center">
                            Секция №{cardData.section} - Этаж №{cardData.floor}
                        </Card.Title>
                        <Card.Text className="text-center">
                            <li className="list-unstyled">
                                {cardData.typeMeter}
                            </li>

                            {cardData.typeMeter === "Счётчик тепла" ||
                            cardData.typeMeter === "Счётчик электроэнергии" ? (
                                <li className="list-unstyled">
                                    Линия № {cardData.line}
                                </li>
                            ) : (
                                <></>
                            )}
                            {cardData.typeMeter === "Счётчик тепла" ||
                            cardData.typeMeter === "Счётчик электроэнергии" ? (
                                <></>
                            ) : (
                                <li className="list-unstyled">
                                    КДЛ № {cardData.numberKdl}
                                </li>
                            )}
                            {cardData.typeMeter === "Счётчик тепла" ||
                            cardData.typeMeter === "Счётчик электроэнергии" ? (
                                <></>
                            ) : (
                                <li className="list-unstyled">
                                    Канал № {cardData.numberAsr}
                                </li>
                            )}

                            <li className="list-unstyled">
                                Счётчик № {cardData.numberMeter}
                            </li>

                            <li className="list-unstyled">
                                Показания: {cardData.sumMeter}
                            </li>
                        </Card.Text>
                        <OverlayTrigger
                            trigger={["click", "hover"]}
                            placement="bottom"
                            overlay={popover}
                        >
                            {cardData.comment === null ||
                            cardData.comment === "" ||
                            cardData.comment === "null" ? (
                                <Button variant="warning">Комментарий</Button>
                            ) : (
                                <Button variant="success">Комментарий</Button>
                            )}
                        </OverlayTrigger>
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
