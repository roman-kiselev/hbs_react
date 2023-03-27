import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { getAllRoles, getAllUsers } from "../../../../http/userApi";
import { useQuery } from "react-query";
import ModalUser from "../modals/ModalUser";
import ModalRole from "../modals/ModalRole";

const MainPageUsers = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showRole, setShowRole] = useState(false);
    const handleCloseRole = () => setShowRole(false);
    const handleShowRole = () => setShowRole(true);

    const getAllUsersAdmin = async () => {
        const { users } = await getAllUsers();
        setUsers(users);
    };

    const { isLoading, error, data } = useQuery("users", getAllUsersAdmin);
    const {
        isLoading: isLoadingRoles,
        error: errorRoles,
        data: dataRoles,
    } = useQuery("roles", async () => {
        const { roles } = await getAllRoles();

        setRoles(roles);
    });

    // Проверка пользователей
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // Проверка ролей
    if (isLoadingRoles) {
        return <div>Loading...</div>;
    }
    if (errorRoles) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Row>
            <Row>
                <Col sm={6}>
                    <Row>
                        <h6>Список пользователей</h6>
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col
                            className="d-flex justify-content-center align-items-center"
                            sm={10}
                        >
                            <Button variant="primary" onClick={handleShow}>
                                Добавить пользователя
                            </Button>
                        </Col>
                        <ModalUser show={show} handleClose={handleClose} />
                    </Row>
                    <Row className="mt-3">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Наименование</th>
                                    <th>Роли</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.login}</td>
                                        <td>
                                            {user.roles.map((role) => (
                                                <p key={role.id}>{role.name}</p>
                                            ))}
                                        </td>
                                        <td>Кнопка</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <h6>Список ролей</h6>
                    </Row>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col
                            className="d-flex justify-content-center align-items-center"
                            sm={10}
                        >
                            <Button variant="primary" onClick={handleShowRole}>
                                Добавить роль
                            </Button>
                        </Col>
                        <ModalRole
                            showRole={showRole}
                            handleCloseRole={handleCloseRole}
                        />
                    </Row>
                    <Row className="mt-3">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Наименование</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        <td>{role.id}</td>
                                        <td>{role.name}</td>
                                        <td>Кнопка</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        </Row>
    );
};

export default MainPageUsers;
