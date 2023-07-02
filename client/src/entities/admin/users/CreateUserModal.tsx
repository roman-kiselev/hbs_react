import React, { useState } from "react";
import {  Button, Modal } from "react-bootstrap";
import { authApi } from "../../../shared/api";
import { useAppSelector, useStringForFormInput } from "../../../shared/hooks";
import CreateUserBodyModal from "./CreateUserBodyModal";
import ErrorCreateRole from "./ErrorCreateRole";

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

    const [registerMutation] = authApi.useRegisterMutation();

    const { dataError, isError, isLoading } = useAppSelector(
        (store) => store.roles
    );

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            registerMutation(userData);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Создать пользователя
            </Button>
            {isError ? (
                <ErrorCreateRole message={dataError.data.message} />
            ) : (
                <></>
            )}
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
                        isError={isError}
                        isLoading={isLoading}
                        dataError={dataError ? dataError.data.message : ""}
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
