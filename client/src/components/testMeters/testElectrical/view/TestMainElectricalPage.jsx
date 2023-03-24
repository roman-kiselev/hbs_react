import React, { useState } from "react";
import { Button, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TestFormElectricalMeter from "../form/TestFormElectricalMeter";
import ListMetersElectrical from "../listMeters/ListMetersElectrical";
import OperationsElectrical from "../operations/OperationsElectrical";

const TestMainElectricalPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    const [key, setKey] = useState("list");

    return (
        <Row>
            <p style={{ fontSize: 15 }}>
                Добавление счётчиков электроэнергии (Test)
            </p>
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
                    <Modal.Body>
                        Woohoo, you're reading this text in a modal!
                    </Modal.Body>
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
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="addMeter" title="Добавление">
                        <Row>
                            <TestFormElectricalMeter id={id} />
                        </Row>
                    </Tab>
                    <Tab eventKey="list" title="Список">
                        <ListMetersElectrical id={id} />
                    </Tab>
                    <Tab eventKey="op" title="Операции">
                        <OperationsElectrical id={id} />
                    </Tab>
                </Tabs>
            </Row>
        </Row>
    );
};

export default TestMainElectricalPage;
