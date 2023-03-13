import React, { useState } from "react";
import { Button, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import TestFormCoolHotMeterBolid from "../form/TestFormCoolHotMeterBolid";
import { useParams } from "react-router-dom";
import ListMeterWater from "../listMeters/ListMeterWater";

const TestMainWaterPage = () => {
    // id объекта
    const { id } = useParams();

    // Переменные и функции для модального окна
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Ключи для табов
    const [key, setKey] = useState("list");

    return (
        <Row>
            <p style={{ fontSize: 15 }}>Добавление счётчиков воды (Болид)</p>
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
                            {/* Форма для добавления счётчиков воды */}
                            <TestFormCoolHotMeterBolid id={id} />
                        </Row>
                    </Tab>
                    <Tab eventKey="list" title="Список">
                        {/* Лист счётчиков */}
                        Сортировка // Квартиры // Этажи // Секции // КДЛ // АСР
                        // Поиск номера
                        <ListMeterWater id={id} />
                    </Tab>
                    <Tab eventKey="op" title="Операции">
                        {/* Здесь операции __ Скачать excel и т.д. */}
                        Тут разные
                    </Tab>
                </Tabs>
            </Row>
        </Row>
    );
};

export default TestMainWaterPage;