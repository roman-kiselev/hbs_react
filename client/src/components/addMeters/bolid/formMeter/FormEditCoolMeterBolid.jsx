import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";

const FormEditCoolMeterBolid = ({data}) => {
    // массив кдл
    const kdlArr = [
        {
            id: 1,
            value: 1,
            title: 1
        },
        {
            id: 2,
            value: 2,
            title: 2
        },
        {
            id: 3,
            value: 3,
            title: 3
        },
        {
            id: 4,
            value: 4,
            title: 4
        }
    ]


    return (
        <Row>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Секция</Form.Label>
                            <Form.Control type="number" value={data.section}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Этаж</Form.Label>
                            <Form.Control type="number" value={data.floors}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control type="number" value={data.flat}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Выбор КДЛ</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Выбор</option>
                            {
                                kdlArr.map((k, i) => (

                                    k.value === data.kdl ?
                                        <option key={i} selected value={k.value}>{k.title}</option>
                                        :
                                        <option key={i} value={k.value}>{k.title}</option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Номер Канала</Form.Label>
                            <Form.Control type="number" value={data.asr}/>
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Номер Счётчика</Form.Label>
                        <Form.Control type="number" value={data.numberMeter}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Показания</Form.Label>
                        <Form.Control type="number" step="0.01" value={data.sum}/>
                    </Form.Group>
                </Row>
            </Form>
        </Row>
    );
};

export default FormEditCoolMeterBolid;