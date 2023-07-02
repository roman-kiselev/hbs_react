import React from "react";
import { Col, ListGroup } from "react-bootstrap";

interface IListGroupRolesProps {
    data: any;
}

const ListGroupRoles: React.FC<IListGroupRolesProps> = ({ data }) => {
    return (
        <>
            <Col>
                <h6>Список ролей</h6>
                <ListGroup>
                    {data.roles.map((role) => (
                        <ListGroup.Item key={role.id}>
                            {role.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </>
    );
};

export default ListGroupRoles;
