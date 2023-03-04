import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'



const TestFormEditMeter = ({ data }) => {

    // Здесь все state инпутов
    const [section, setSection] = useState(data.section);
    const [floors, setFloors] = useState(data.floors);
    const [flat, setFlat] = useState(data.flat);
    const [numberMeter, setNumberMeter] = useState(data.numberMeter);
    const [sum, setSum] = useState(data.sum);
    const [asr, setAsr] = useState(data.asr);
    const [kdl, setKdl] = useState(data.kdl);

    


    return (
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
    )
}

export default TestFormEditMeter