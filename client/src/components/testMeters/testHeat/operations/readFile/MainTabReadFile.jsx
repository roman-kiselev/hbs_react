import React from "react";
import { Form, Row, Table } from "react-bootstrap";

const MainTabReadFile = ({ objectBuildId, handleFileUpload }) => {
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
                                <th>Линия</th>
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
                                <td>192168233</td>
                                <td>1.2</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>27</td>
                                <td>1</td>
                                <td>192168234</td>
                                <td>1.5</td>
                            </tr>
                        </tbody>
                    </Table>
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

export default MainTabReadFile;
