import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { IUser } from "../../../shared/interfaces";
import {
    ButtonUI,
    InputString,
    InputStringFormGroup,
} from "../../../shared/ui";

interface IRowUserProps {
    user: IUser;
}

const RowUser: React.FC<IRowUserProps> = ({ user }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Row className="mb-3">
            <InputStringFormGroup
                disabled={false}
                title="Логин"
                value={user.login}
                onChange={() => {}}
            />
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
        </Row>
    );
};

export default RowUser;
