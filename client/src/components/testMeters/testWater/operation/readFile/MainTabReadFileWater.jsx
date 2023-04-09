import React, { useState } from "react";
import { Badge, Form, Row, Table } from "react-bootstrap";

const MainTabReadFileWater = ({
    objectBuildId,
    handleFileUpload,
    stateCheck,
    handleSelectCheck,
}) => {
    return (
        <>
            <Row>
                <Row>
                    <h6>Таблица должна быть следующего вида</h6>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Секция</th>
                                <th>Этаж</th>
                                <th>Квартира</th>
                                <th>Номер КДЛ</th>
                                <th>Номер Канала</th>
                                <th>Номер счётчика</th>
                                <th>Показания</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>26</td>
                                <td>1</td>
                                <td>1</td>
                                <td>192168233</td>
                                <td>1.2</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>27</td>
                                <td>1</td>
                                <td>2</td>
                                <td>192168234</td>
                                <td>1.5</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row>
                        <Badge bg="warning" text="dark">
                            Важно!!! Счётчик холодной воды - Канал нечётный!
                            Счётчик горячей воды - Канал чётный
                        </Badge>
                    </Row>
                    <Row className="mt-3">
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                value={stateCheck}
                                onChange={handleSelectCheck}
                                label="Разрешить загрузку с повторными номерами"
                            />
                        </Form>
                    </Row>
                </Row>
            </Row>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Выберите файл</Form.Label>
                <Form.Control
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                />
            </Form.Group>
        </>
    );
};

export default MainTabReadFileWater;
