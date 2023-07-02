import React, { useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import { ButtonUI, InputString } from "../../../shared/ui";

const ChangePassword = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Col className="mt-3">
                <ButtonUI
                    label="Изменить пароль"
                    onClick={handleShow}
                    variant="danger"
                />
            </Col>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение пароля</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputString
                        disabled={false}
                        title="Новый пароль"
                        onChange={() => {}}
                        type="text"
                        value=""
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChangePassword;
