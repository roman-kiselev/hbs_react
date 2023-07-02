import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { authApi } from "../../../shared/api";
import { useStringForFormInput } from "../../../shared/hooks";
import CreateUserBodyModal from "./CreateUserBodyModal";

const CreateUserModal: React.FC = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [login, handleInputChangeLogin] = useStringForFormInput("");
    const [password, handleInputChangePassword] = useStringForFormInput("");

    const userData = {
        login,
        password,
    };

    const [registerMutation, { isError, isLoading, isSuccess, data }] =
        authApi.useRegisterMutation();

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const x = registerMutation(userData);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Создать пользователя
            </Button>

            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создать пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateUserBodyModal
                        login={login}
                        password={password}
                        handleInputChangeLogin={handleInputChangeLogin}
                        handleInputChangePassword={handleInputChangePassword}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                        Создать
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateUserModal;
