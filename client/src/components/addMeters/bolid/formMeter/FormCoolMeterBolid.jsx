import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import CitiesInput from "./CitiesInput";
import MyCitiesInput from "./MyCitiesInput";

const FormCoolMeterBolid = () => {

    const cities = ['Пенза', 'Спасск']




    return (
        <Row>
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Секция</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Выбор</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Этаж</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Выбор КДЛ</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Выбор</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Номер Канала</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Номер Счётчика</Form.Label>
                        <Form.Control type="number"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Показания</Form.Label>
                        <Form.Control type="number" step="0.01"/>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Добавить
                </Button>
            </Form>

        </Row>
    );
};

export default FormCoolMeterBolid;