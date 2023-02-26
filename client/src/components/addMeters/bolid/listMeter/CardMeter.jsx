import React, {useState} from 'react';
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import FormCoolMeterBolid from "../formMeter/FormCoolMeterBolid";
import FormEditCoolMeterBolid from "../formMeter/FormEditCoolMeterBolid";

const CardMeter = ({id, section, floors, flat, kdl, asr, numberMeter, sum}) => {

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
                                floors: floors,
                                flat: flat,
                                kdl: kdl,
                                asr: asr,
                                numberMeter: numberMeter,
                                sum: sum
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
                <Card>
                    <Card.Header>Квартира № {flat}</Card.Header>
                    <Card.Body>
                        <Card.Title>Секция №{section} - Этаж №{floors}</Card.Title>
                        <Card.Text>
                            <p>КДЛ № {kdl}</p>
                            <p>АСР № {asr}</p>
                            <p>Счётчик № {numberMeter}</p>
                            <p>Показания {sum}</p>
                        </Card.Text>
                        <Button variant="primary" onClick={handleShow}>Редактировать</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default CardMeter;