import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import TestAlertAddMeters from "../../bolid/alerts/TestAlertAddMeters";



const TestFormHeatMeter = () => {

    const [section, setSection] = useState("")
    const [floors, setFloors] = useState("")
    const [flat, setFlat] = useState("")
    const [line, setLine] = useState("")
    const [number, setNumber] = useState("")
    const [sum, setSum] = useState("")
    // Состояние уведомлений
    const [alertAdd, setAlertAdd] = useState(false)
    // Создаём массив для проверки перед отправкой данных на сервер
    const arrForCheck = [section, floors, flat, line, number, sum]
    const checkData = () => {
        if (arrForCheck.every(item => item !== "")) {
            return false
        } else {
            return true
        }
    }


    return (
        <Row>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Секции</Form.Label>
                            <Form.Control
                                type="number"
                                pattern="^[ 0-9]+$"
                                value={section || "Ошибка"}
                                onChange={(e) => setSection(e.target.value)}
                            />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Этаж</Form.Label>
                            <Form.Control
                                type="number"
                                pattern="^[ 0-9]+$"
                                value={floors || "Ошибка"}
                                onChange={(e) => setFloors(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control
                                type="number"
                                pattern="[0-9]"
                                value={flat || "Ошибка"}
                                onChange={(e) => setFlat(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Линия</Form.Label>
                            <Form.Control
                                type="number"
                                pattern="[0-9]"
                                value={line || "Ошибка"}
                                onChange={(e) => setLine(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Row className="m-2">
                        <Col className="col-sm-6 text-center">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер Счётчика</Form.Label>
                                <Form.Control
                                    type="number"
                                    pattern="[0-9]"
                                    value={number || "Ошибка"}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Form.Group>

                        </Col>

                        <Col className="col-12 col-sm-6 text-center">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Показания</Form.Label>
                                <Form.Control
                                    type="number" step="0.01"
                                    value={sum || "Ошибка"}
                                    onChange={(e) => setSum(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>




                </Row>

                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            /*onClick={(e) => addMeter(e)}*/
                            disabled={checkData()}
                        >
                            Добавить
                        </Button>
                    </Col>
                    <Row className="fixed-top justify-content-end mt-3">
                        {/*<Col className="col-sm-3">

                            <Row>

                                {
                                    alertAdd ?
                                        lastMeters.data.map((meter) => (
                                            <TestAlertAddMeters key={meter.id} alertAdd={alertAdd} {...meter} />
                                        )) :
                                        <></>
                                }


                            </Row>

                        </Col>*/}
                    </Row>


                </Row>

            </Form>

        </Row>
    );
};

export default TestFormHeatMeter;