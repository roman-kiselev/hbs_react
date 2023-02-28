import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

const TestFormCoolHotMeterBolid = () => {

    const [section, setSection] = useState(0)
    const [floors, setFloors] = useState(0)
    const [flat, setFlat] = useState(0)
    const [kdl, setKdl] = useState(0)
    const [channelCool, setChannelCool] = useState(0)
    const [channelHot, setChannelHot] = useState()
    const [numberMeterCool, setNumberMeterCool] = useState(0)
    const [numberMeterHot, setNumberMeterHot] = useState(0)
    const [sumMeterCool, setSumMeterCool] = useState(0.0)
    const [sumMeterHot, setSumMeterHot] = useState(0.0)


    const dispatch = useDispatch();
    const {id: userId} = useSelector((state) => state.users.user)





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
                                        onChange={(e) => setChannelCool(e.target.value)}
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


                <Button variant="primary" type="submit">
                    Добавить
                </Button>
            </Form>

        </Row>
    );
};

export default TestFormCoolHotMeterBolid;