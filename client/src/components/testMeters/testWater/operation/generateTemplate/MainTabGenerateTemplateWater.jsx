import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";

const MainTabGenerateTemplateWater = ({ objectBuildId }) => {
    return (
        <Row>
            <Row>
                <Col sm={3}>
                    <Form.Select aria-label="Default select example">
                        <option>Выбор секции</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                </Col>

                <Col sm={3}>
                    <Form.Select aria-label="Default select example">
                        <option>Выбор КДЛ</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button variant="success" disabled={true}>
                        Скачать шаблон
                        <RiFileExcel2Line />
                    </Button>
                </Col>
            </Row>
        </Row>
    );
};

export default MainTabGenerateTemplateWater;
