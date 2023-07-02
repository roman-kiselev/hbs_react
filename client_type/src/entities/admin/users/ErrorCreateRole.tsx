import React from "react";
import { Alert, Button, Modal, Row } from "react-bootstrap";
import { useAppDispatch } from "../../../shared/hooks";
import { setIsError } from "../../../shared/models";

interface IErrorCreateRoleProps {
    message: string;
}

const ErrorCreateRole: React.FC<IErrorCreateRoleProps> = ({ message }) => {
    const dispatch = useAppDispatch();
    const [show, setShow] = React.useState(false);
    //const { isError } = useAppSelector((store) => store.roles);

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    const closeAlert = () => {
        dispatch(setIsError(false));
    };

    return (
        <>
            <Row className="mt-3">
                <Alert variant="danger" onClose={closeAlert} dismissible>
                    <Alert.Heading>Ошибка</Alert.Heading>
                    <p>{message}</p>
                </Alert>
                {/* <Alert variant="danger">
                    {message} <Button onClick={handleShow}>Создать роль</Button>
                </Alert> */}
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание роли</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ErrorCreateRole;
