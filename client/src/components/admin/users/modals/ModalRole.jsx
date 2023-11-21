import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { createRole } from "../../../../http/userApi";

const ModalRole = ({ showRole, handleCloseRole }) => {
    const [nameRole, setNameRole] = useState("");

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(
        (newRole) => createRole(newRole),
        {
            onSuccess: () => {
                // Обновляем кэш запроса с ролями
                queryClient.invalidateQueries("roles");
            },
        }
    );

    const handleClick = (e) => {
        e.preventDefault();
        mutate(nameRole);
        handleCloseRole();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Modal
            show={showRole}
            onHide={handleCloseRole}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Роли</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Введите наименование</Form.Label>
                <Form.Control
                    type="text"
                    value={nameRole}
                    onChange={(e) => setNameRole(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseRole}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={(e) => handleClick(e)}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRole;
