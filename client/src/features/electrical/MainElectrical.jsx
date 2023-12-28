import { useState } from "react";
import { Button, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TestFormElectricalMeter from "../../components/testMeters/testElectrical/form/TestFormElectricalMeter";
import ListMetersElectrical from "../../components/testMeters/testElectrical/listMeters/ListMetersElectrical";
import OperationsElectrical from "../../components/testMeters/testElectrical/operations/OperationsElectrical";
import { setNumber } from "../../shared/models/testMeterElectrical/testElectricalMeterSlice";

const MainElectrical = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { number } = useSelector((store) => store.electricalMeter);

    const changeNumber = (e) => {
        const n = e.target.value;
        dispatch(setNumber(n));
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    const [key, setKey] = useState("list");

    return (
        <Row>
            <p style={{ fontSize: 15 }}>Добавление счётчиков электроэнергии</p>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Начальные значения</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Начальные значения"
                                value={number}
                                onChange={(e) => changeNumber(e)}
                            />
                        </Form.Group>
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

export default MainElectrical;
