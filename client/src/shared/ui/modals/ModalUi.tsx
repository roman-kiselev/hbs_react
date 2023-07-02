import React from "react";
import { Button, Modal } from "react-bootstrap";
import { IModalUiProps } from "../../interfaces";

const ModalUi: React.FC<IModalUiProps> = ({
    show,
    handleClose,
    children,
    titleClose = "Закрыть",
    titleSave = "Сохранить",
    title,
    animation = false,
    handleAction,
}) => {
    const handleCloseModal = () => {
        handleClose(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} animation={animation}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        {titleClose}
                    </Button>
                    <Button variant="primary" onClick={handleAction}>
                        {titleSave}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUi;
