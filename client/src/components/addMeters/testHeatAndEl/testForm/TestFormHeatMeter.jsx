import React, {useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { createTestHeatMeter } from '../../../../features/testMeters/testHeatMeterSlice';
import TestAlertAddHeatMeters from '../../bolid/alerts/TestAlertAddHeatMeters';




const TestFormHeatMeter = ({id: objectBuildId}) => {

    const dispatch = useDispatch();
    const [section, setSection] = useState("")
    const [floor, setFloor] = useState("")
    const [flat, setFlat] = useState("")
    const [line, setLine] = useState("")
    const [number, setNumber] = useState("")
    const [sum, setSum] = useState("")
    // Состояние уведомлений
    const [alertAdd, setAlertAdd] = useState(false)
    // Создаём массив для проверки перед отправкой данных на сервер
    const arrForCheck = [section, floor, flat, line, number, sum]
    const checkData = () => {
        if (arrForCheck.every(item => item !== "")) {
            return false
        } else {
            return true
        }
    }

    // Достаём userId
    const {id: userId} = useSelector((state) => state.users.user)
    // Достаём добавленные счётчики для уведомления
    const {lastMeters} = useSelector((state) => state.heatMeter)
    
    // Добавляем счётчик
    const addMeter = (e) => {
        e.preventDefault()

        const dataMeter = {
            section: section,
            floor: floor,
            flat: flat,
            line: line,
            numberMeter: number,
            sumMeter: sum,
            objectBuildId,
            userId
        }

        dispatch(createTestHeatMeter({dataMeter})).then((d) => {

            setAlertAdd(true)
            setTimeout(() => {
                setAlertAdd(false)
            }, 3000)
        })
    

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
                                value={floor || "Ошибка"}
                                onChange={(e) => setFloor(e.target.value)}
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
                                        
                                        <TestAlertAddHeatMeters key={lastMeters.id} alertAdd={alertAdd} {...lastMeters} />
                                         :
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