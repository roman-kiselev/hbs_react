import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { InputNumber } from "../../../shared/ui";

const FormAsrTwo = () => {
    return (
        <Row>
            <Form>
                <Row>
                    <Col>
                        <InputNumber
                            title="Секции"
                            value={1}
                            disabled={false}
                            onChange={() => {}}
                        />
                    </Col>
                    <Col>
                        <InputNumber
                            title="Этаж"
                            value={1}
                            disabled={false}
                            onChange={() => {}}
                        />
                    </Col>
                    <Col>
                        <InputNumber
                            title="Выбор помещения"
                            value={1}
                            disabled={false}
                            onChange={() => {}}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <InputNumber
                            title="КДЛ"
                            value={1}
                            disabled={false}
                            onChange={() => {}}
                        />
                    </Col>

                    <Row className="m-2">
                        <Col
                            className="col-12 col-sm-6 col text-center"
                            style={{
                                border: "1px solid grey",
                                borderRadius: 10,
                            }}
                        >
                            <h5>ХВС</h5>

                            <InputNumber
                                title="Номер Канала"
                                value={1}
                                disabled={false}
                                onChange={() => {}}
                            />

                            <InputNumber
                                title="Номер счётчика"
                                value={1}
                                disabled={false}
                                onChange={() => {}}
                            />
                            <InputNumber
                                title="Показания"
                                value={1}
                                disabled={false}
                                onChange={() => {}}
                            />
                        </Col>

                        <Col
                            className="col-12 col-sm-6 text-center"
                            style={{
                                border: "1px solid grey",
                                borderRadius: 10,
                            }}
                        >
                            <h5>ГВС</h5>

                            <InputNumber
                                title="Номер Канала"
                                value={1}
                                disabled={false}
                                onChange={() => {}}
                            />

                            <InputNumber
                                title="Номер счётчика"
                                value={1}
                                disabled={false}
                                onChange={() => {}}
                            />
                            <InputNumber
                                title="Показания"
                                value={1}
                                disabled={false}
                                onChange={() => {}}
                            />
                        </Col>
                        <Row>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Комментарий</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={""}
                                    onChange={() => {}}
                                />
                            </Form.Group>
                        </Row>
                    </Row>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Добавить
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    );
};

export default FormAsrTwo;
