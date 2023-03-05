import React, { useState } from 'react'
import { Col, Form, Modal, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMetersByUserAndObject, getOneMeter } from '../../../../features/testMeters/testWaterMeterSlice';



const TestFormEditMeter = ({ data, show, handleClose }) => {

    const dispatch = useDispatch();
    const {id: userId} = useSelector((state) => state.users.user);
    
    // Здесь все state инпутов
    const [section, setSection] = useState(data.section);
    const [floors, setFloors] = useState(data.floors);
    const [flat, setFlat] = useState(data.flat);
    const [numberMeter, setNumberMeter] = useState(data.numberMeter);
    const [sum, setSum] = useState(data.sum);
    const [asr, setAsr] = useState(data.asr);
    const [kdl, setKdl] = useState(data.kdl);

    const {id: idMeter, objectId} = data;
    
    const formQuery = {
        userId,
        objectId
    }


    // Сохраняем изменения
    const saveNewData = () => {
        const formData = new FormData();
        formData.append('section', section);
        formData.append('floors', floors);
        formData.append('flat', flat);
        formData.append('numberMeter', numberMeter);
        formData.append('sum', sum);
        formData.append('asr', asr);
        formData.append('kdl', kdl);
        formData.append('id', idMeter);
        formData.append('typeMeter', data.typeMeter);

        try {

            dispatch(getOneMeter({formData})).then((d) => {
                dispatch(getAllMetersByUserAndObject({ formQuery }))
                handleClose()
            })
        } catch (e) {
            console.log(e)
        }
    }



    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data.typeMeter}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Секция</Form.Label>
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
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Номер Канала</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={asr}
                                        onChange={(e) => setAsr(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Номер Счётчика</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={numberMeter}
                                    onChange={(e) => setNumberMeter(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Показания</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    value={sum}
                                    onChange={(e) => setSum(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button
                    variant="primary"
                    onClick={() => saveNewData()}
                >
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TestFormEditMeter