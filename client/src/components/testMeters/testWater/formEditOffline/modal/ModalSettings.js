import React, { useState } from "react";
import { Button, Col, Form, FormLabel, Modal, Row } from "react-bootstrap";

const ModalSettings = ({
    kdl,
    handleSelectKdl,
    selectedKdl,
    saveKdl,
    handleShow,
    handleClose,
    show,
}) => {
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Параметры
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Параметры</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Row>
                            <Col>
                                <FormLabel>Выбор КДЛ</FormLabel>
                                <Form.Select
                                    size="sm"
                                    value={selectedKdl}
                                    onChange={handleSelectKdl}
                                >
                                    {kdl.map((kdl, item) => (
                                        <option key={item}>{kdl}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={saveKdl}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSettings;
