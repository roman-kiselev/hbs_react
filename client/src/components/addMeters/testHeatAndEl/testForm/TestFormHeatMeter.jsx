import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import TestAlertAddMeters from "../alerts/TestAlertAddMeters";



const TestFormHeatMeter = () => {

    const [section, setSection] = useState("")
    const [floors, setFloors] = useState("")
    const [flat, setFlat] = useState("")
    const [line, setLine] = useState("")


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
                            <Form.Label>КДЛ</Form.Label>
                            <Form.Control
                                type="number"
                                pattern="[0-9]"
                                value={line || "Ошибка"}
                                onChange={(e) => setLine(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    {/*<Row className="m-2">
                        <Col className="col-sm-6 text-center" style={{ border: "1px solid grey", borderRadius: 10 }}>
                            <h5>ХВС</h5>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Номер Канала</Form.Label>
                                    <Form.Control
                                        type="number"
                                        pattern="[0-9]"
                                        value={channelCool || "Ошибка"}
                                        //onChange={(e) => evenChannel(e)}
                                        onChange={(e) => addChannelHot(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер Счётчика</Form.Label>
                                <Form.Control
                                    type="number"
                                    pattern="[0-9]"
                                    value={numberMeterCool || "Ошибка"}
                                    onChange={(e) => setNumberMeterCool(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Показания</Form.Label>
                                <Form.Control
                                    type="number" step="0.01"
                                    pattern="[0-9]"
                                    value={sumMeterCool || "Ошибка"}
                                    onChange={(e) => setSumMeterCool(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col className="col-12 col-sm-6 text-center" style={{ border: "1px solid grey", borderRadius: 10 }}>
                            <h5>ГВС</h5>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Номер Канала</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={channelHot || "Ошибка"}
                                        onChange={(e) => setChannelHot(e.target.value)}
                                        disabled={true}
                                    />
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер Счётчика</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={numberMeterHot || "Ошибка"}
                                    onChange={(e) => setNumberMeterHot(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Показания</Form.Label>
                                <Form.Control
                                    type="number" step="0.01"
                                    value={sumMeterHot || "Ошибка"}
                                    onChange={(e) => setSumMeterHot(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>*/}




                </Row>

                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => addMeter(e)}
                            disabled={checkData()}
                        >
                            Добавить
                        </Button>
                    </Col>
                    <Row className="fixed-top justify-content-end mt-3">
                        <Col className="col-sm-3">

                            <Row>

                                {
                                    alertAdd ?
                                        lastMeters.data.map((meter) => (
                                            <TestAlertAddMeters key={meter.id} alertAdd={alertAdd} {...meter} />
                                        )) :
                                        <></>
                                }


                            </Row>

                        </Col>
                    </Row>


                </Row>

            </Form>

        </Row>
    );
};

export default TestFormHeatMeter;