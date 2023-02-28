import React, {useState} from 'react';
import {Button, Col, Modal, Row, Tab, Tabs} from "react-bootstrap";
import ListMeters from "./listMeter/ListMeters";
import TestFormCoolHotMeterBolid from "./formMeter/TestFormCoolHotMeterBolid";


const TestAddMeterCoolHotBolid = () => {

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
                            <TestFormCoolHotMeterBolid />
                        </Row>
                    </Tab>
                    <Tab eventKey="list" title="Список">
                        Сортировка // Квартиры // Этажи // Секции // КДЛ // АСР // Поиск номера
                        <ListMeters />
                    </Tab>
                    <Tab eventKey="op" title="Операции">
                        Тут разные
                    </Tab>

                </Tabs>
            </Row>
        </Row>
    );
};

export default TestAddMeterCoolHotBolid;