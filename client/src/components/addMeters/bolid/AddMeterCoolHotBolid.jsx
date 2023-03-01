import React, {useState} from 'react';
import {Button, Col, Modal, Row, Tab, Tabs} from "react-bootstrap";
import FormCoolMeterBolid from "./formMeter/FormCoolMeterBolid";
import TestListMeters from "./listMeter/TestListMeters";
import FormCoolHotMeterBolid from "./formMeter/FormCoolHotMeterBolid";

const AddMeterCoolHotBolid = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Row>
            <p style={{fontSize: 15}}>Добавление счётчиков воды (Болид)</p>
            <Row>
                <Row className="justify-content-end">
                    <Col className="text-end">
                        <Button variant="info" onClick={handleShow}>
                            Задать параметры
                        </Button>
                    </Col>
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Начальные параметры</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>

            <Row className="mt-3">
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="addMeter" title="Добавление">
                        <Row>
                            <FormCoolHotMeterBolid />
                        </Row>
                    </Tab>
                    <Tab eventKey="list" title="Список">
                        Сортировка // Квартиры // Этажи // Секции // КДЛ // АСР // Поиск номера
                        <TestListMeters />
                    </Tab>
                    <Tab eventKey="op" title="Операции">
                        Тут разные
                    </Tab>

                </Tabs>
            </Row>
        </Row>
    );
};

export default AddMeterCoolHotBolid;