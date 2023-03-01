import React, {useState} from 'react';
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createTestMeter, getAllMetersByUserAndObject} from "../../../../features/testMeters/testWaterMeterSlice";

const TestFormCoolHotMeterBolid = ({id}) => {

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

    const [alertAdd, setAlertAdd] = useState(false)

    const dispatch = useDispatch();
    const {id: userId} = useSelector((state) => state.users.user)

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
        const formQuery = {userId, objectId: id}

        const setNewAlert = () => {
            setAlertAdd(false)
        }

        dispatch(createTestMeter({dataWith})).then((d) => {
            dispatch(getAllMetersByUserAndObject({formQuery}))
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
                        <Col className="col-sm-6 text-center" style={{border: "1px solid grey", borderRadius: 10}}>
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

                        <Col className="col-12 col-sm-6 text-center" style={{border: "1px solid grey", borderRadius: 10}}>
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
                            <Alert show={alertAdd} variant="info">
                                <p>Были успешно добавлены</p>
                                <p>Этаж №{floors || 0} Квартира {flat || 0} </p>
                                <p>Кдл №{kdl || 0} Канал №{channelCool || 0} и №{channelHot || 0}</p>
                            </Alert>
                        </Col>
                    </Row>

                </Row>

            </Form>

        </Row>
    );
};

export default TestFormCoolHotMeterBolid;