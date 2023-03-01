import React, {useState} from 'react';
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import FormCoolMeterBolid from "../formMeter/FormCoolMeterBolid";
import FormEditCoolMeterBolid from "../formMeter/FormEditCoolMeterBolid";

const TestCardMeter = ({id, section, floor, flat, numberKdl, numberAsr, numberMeter, sumMeter, typeMeter}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Col className="col-12 col-xl-4 mt-3 ">
                <Row>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактирование</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormEditCoolMeterBolid data={{
                                id: id,
                                section: section,
                                floors: floor,
                                flat: flat,
                                kdl: numberKdl,
                                asr: numberAsr,
                                numberMeter: numberMeter,
                                sum: sumMeter
                            }}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Закрыть
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Сохранить изменения
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
                <Card className="text-center">
                    <Card.Header className="text-center">Квартира № {flat}</Card.Header>
                    <Card.Body>
                        <Card.Title className="text-center">Секция №{section} - Этаж №{floor}</Card.Title>
                        <Card.Text className="text-center">
                            <li className="list-unstyled">{typeMeter}</li>
                            <li className="list-unstyled">КДЛ № {numberKdl}</li>
                            <li className="list-unstyled">Канал № {numberAsr}</li>
                            <li className="list-unstyled">Счётчик № {numberMeter}</li>
                            <li className="list-unstyled">Показания {sumMeter}</li>
                        </Card.Text>
                        <Button variant="primary" onClick={handleShow}>Редактировать</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default TestCardMeter;