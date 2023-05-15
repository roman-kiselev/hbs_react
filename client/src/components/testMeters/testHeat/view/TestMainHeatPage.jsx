import React, { useState } from "react";
import { Button, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TestFormHeatMeter from "../form/TestFormHeatMeter";
import FormOfflineHeat from "../formEditOffline/FormOfflineHeat";
import ListMeterHeat from "../listMeter/ListMeterHeat";
import OperationsHeat from "../operations/OperationsHeat";

const TestMainHeatPage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    const [key, setKey] = useState("list");

    return (
        <Row>
            <p style={{ fontSize: 15 }}>Добавление счётчиков тепла (Test)</p>
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
                            <TestFormHeatMeter id={id} />
                        </Row>
                    </Tab>
                    <Tab eventKey="list" title="Список">
                        {/* <TestListHeatMeters id={id} /> */}
                        <ListMeterHeat id={id} />
                    </Tab>
                    <Tab eventKey="op" title="Операции">
                        <OperationsHeat id={id} />
                    </Tab>
                    <Tab eventKey="offline" title="Оффлайн">
                        <FormOfflineHeat id={id} />
                    </Tab>
                </Tabs>
            </Row>
        </Row>
    );
};

export default TestMainHeatPage;
