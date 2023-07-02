import React from "react";
import { Row, Form, Col, ListGroup, Image, Button } from "react-bootstrap";
import { useAppSelector } from "../../../shared/hooks";
import { IUsersResponse } from "../../../shared/interfaces";
import { ButtonUI, InputStringFormGroup } from "../../../shared/ui";
import RowUser from "./RowUser";
import RowUserDescription from "./RowUserDescription";

const FormRowsOneUser: React.FC = () => {
    const { user, roles, userDescriptions } = useAppSelector(
        (store) => store.oneUser
    );

    return (
        <>
            <Form>
                <RowUser user={user} />
                <RowUserDescription {...userDescriptions} />

                {/* <Row className="mb-3">
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
                    <Col>
                        <Col xs={6} md={4}>
                            <Image
                                src={
                                    data.userDescriptions
                                        ? data.userDescriptions.image
                                        : ""
                                }
                                // src="https://img.freepik.com/premium-vector/cool-man-profile-photo-icon-profile-icon-male-head-face-flat-design-vector-illustration_750364-393.jpg"
                                rounded
                                height={200}
                                width={200}
                            />
                        </Col>
                    </Col>
                </Row> */}

                <Row>
                    <Col sm={3}>
                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Col>
                    <Col sm={3}>
                        <Button variant="danger">Удалить</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormRowsOneUser;
