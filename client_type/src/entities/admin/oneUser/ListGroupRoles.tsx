import React from "react";
import { Col, ListGroup, Row, Toast } from "react-bootstrap";
import { IRole } from "../../../shared/interfaces";
import { ButtonUI } from "../../../shared/ui";

import { AiTwotoneDelete } from "react-icons/ai";
import ToastListRoles from "./ToastListRoles";
import LoadingSpin from "../../loadingSpin";

interface IListGroupRolesProps {
    roleUser: IRole[];
    dataAllRoles: IRole[];
    onDelete?: (nameRole: string) => void;
    handleAddRole?: (e, nameRole: string) => void;
}

const ListGroupRoles: React.FC<IListGroupRolesProps> = ({
    roleUser,
    onDelete,
    dataAllRoles,
    handleAddRole,
}) => {
    const [showA, setShowA] = React.useState(false);
    const toggleShowA = () => setShowA(!showA);

    if (!roleUser) {
        return (
            <Col>
                <h6>Список ролей</h6>
                <ListGroup>
                    <ListGroup.Item>
                        <div style={{ position: "relative" }}>
                            <LoadingSpin />
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        );
    }

    return (
        <>
            <Col>
                <h6>Список ролей</h6>
                <ListGroup>
                    {roleUser.map((role, index) => (
                        <ListGroup.Item key={role.id}>
                            <Row>
                                <Col sm={10}>
                                    {index + 1}. {role.name}
                                </Col>
                                <Col>
                                    <AiTwotoneDelete
                                        cursor={"pointer"}
                                        size={25}
                                        color="red"
                                        // onMouseEnter={() => setSize(28)}
                                        // onMouseLeave={() => setSize(25)}
                                        onClick={() => onDelete(role.name)}
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Row>
                    <Col>
                        <ButtonUI
                            variant="success"
                            label="Присвоить роль"
                            onClick={toggleShowA}
                        />
                        <Toast show={showA} onClose={toggleShowA}>
                            <Toast.Header>
                                <strong className="me-auto">Выбор роли</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <ListGroup>
                                    <ToastListRoles
                                        handleAddRole={handleAddRole}
                                        data={dataAllRoles}
                                    />
                                </ListGroup>
                            </Toast.Body>
                        </Toast>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default ListGroupRoles;
