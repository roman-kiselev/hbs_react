import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTestMeter, getAllMetersByUserAndObject } from "../../../../features/testMeters/testWaterMeterSlice";
import TestAlertAddMeters from "../alerts/TestAlertAddMeters";

const TestFormCoolHotMeterBolid = ({ id }) => {

    const dispatch = useDispatch();
    // Состояние форм
    const [section, setSection] = useState("")
    const [floors, setFloors] = useState("")
    const [flat, setFlat] = useState("")
    const [kdl, setKdl] = useState("")
    const [channelCool, setChannelCool] = useState("")
    const [channelHot, setChannelHot] = useState("")
    const [numberMeterCool, setNumberMeterCool] = useState("")
    const [numberMeterHot, setNumberMeterHot] = useState("")
    const [sumMeterCool, setSumMeterCool] = useState("")
    const [sumMeterHot, setSumMeterHot] = useState("")
    // Состояние уведомлений
    const [alertAdd, setAlertAdd] = useState(false)

    // Достаём id пользователя
    const { id: userId } = useSelector((state) => state.users.user)
    // Достаём добавленные счётчики
    const { lastMeters } = useSelector((state) => state.mainTable)

    const { currentPage, limit } = useSelector((state) => state.mainTable)

    // Данные для добавления
    const addMeter = (e) => {
        e.preventDefault()
        const dataWith = {
            section: section,
            floors: floors,
            flat: flat,
            kdl: kdl,
            channelCool: channelCool,
            channelHot: channelHot,
            numberMeterCool: numberMeterCool,
            numberMeterHot: numberMeterHot,
            sumMeterCool: sumMeterCool,
            sumMeterHot: sumMeterHot,
            userId: userId,
            objectId: id
        }
        // В форму передаём 
        const formQuery = { userId, objectId: id }

        const setNewAlert = () => {
            setAlertAdd(false)
        }

        dispatch(createTestMeter({ dataWith })).then((d) => {
            dispatch(getAllMetersByUserAndObject({ formQuery }))

            setNumberMeterCool("")
            setNumberMeterHot("")
            setSumMeterCool("")
            setSumMeterHot("")
            setAlertAdd(true)
            setTimeout(setNewAlert, 5000)
        })
    }
    // Нечётный канал для воды
    const oddChannel = (e) => {
        const num = Number(e.target.value)
        if (num % 2 === 0) {
            setChannelCool(num + 1)
        }
        setChannelCool(num)
    }
    // Прибавляем канал
    const addChannelHot = (e) => {
        setChannelCool(e.target.value)
        setChannelHot(Number(e.target.value) + 1)
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
                                value={section}
                                onChange={(e) => setSection(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Этаж</Form.Label>
                            <Form.Control
                                type="number"
                                value={floors}
                                onChange={(e) => setFloors(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control
                                type="number"
                                value={flat}
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
                                value={kdl}
                                onChange={(e) => setKdl(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Row className="m-2">
                        <Col className="col-sm-6 text-center" style={{ border: "1px solid grey", borderRadius: 10 }}>
                            <h5>ХВС</h5>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Номер Канала</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={channelCool}
                                        onChange={(e) => addChannelHot(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер Счётчика</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={numberMeterCool}
                                    onChange={(e) => setNumberMeterCool(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Показания</Form.Label>
                                <Form.Control
                                    type="number" step="0.01"
                                    value={sumMeterCool}
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
                                        value={channelHot}
                                        onChange={(e) => setChannelHot(e.target.value)}
                                        disabled={true}
                                    />
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер Счётчика</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={numberMeterHot}
                                    onChange={(e) => setNumberMeterHot(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Показания</Form.Label>
                                <Form.Control
                                    type="number" step="0.01"
                                    value={sumMeterHot}
                                    onChange={(e) => setSumMeterHot(e.target.value)}
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
                            onClick={(e) => addMeter(e)}
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

export default TestFormCoolHotMeterBolid;