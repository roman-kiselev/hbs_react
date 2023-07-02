import React from "react";
import { Form, Image, ListGroup } from "react-bootstrap";
import { Row, Button, Col } from "react-bootstrap";

import { useNavigate, useParams } from "react-router";
import { OneUserForm } from "../../../features";
import { userApi } from "../../../shared/api";

const OneUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const { isSuccess, isError, data } = userApi.useGetUserByIdQuery(userId);

    // По клику возвращаемся назад
    const goToBack = () => {
        return navigate(-1);
    };

    return (
        // <Row>
        //     <Row>
        //         <Col sm={3}>
        //             <Button onClick={goToBack} variant="secondary">
        //                 К списку
        //             </Button>
        //         </Col>
        //     </Row>

        //     <Row className="mt-3">
        //         {isSuccess ? (
        //             <Form>
        //                 <Row className="mb-3">
        //                     <Form.Group as={Col} controlId="formGridLogin">
        //                         <Form.Label>Логин</Form.Label>
        //                         <Form.Control
        //                             type="text"
        //                             value={data.login ? data.login : ""}
        //                         />
        //                     </Form.Group>

        //                     <Form.Group as={Col} controlId="formGridPassword">
        //                         <Form.Label>Пароль</Form.Label>
        //                         <Form.Control
        //                             type="text"
        //                             placeholder="Password"
        //                         />
        //                     </Form.Group>
        //                 </Row>

        //                 <Row className="mb-3">
        //                     <Form.Group as={Col} controlId="formGridCity">
        //                         <Form.Label>Имя</Form.Label>
        //                         <Form.Control
        //                             value={
        //                                 data.userDescriptions
        //                                     ? data.userDescriptions.name
        //                                     : ""
        //                             }
        //                         />
        //                     </Form.Group>

        //                     <Form.Group as={Col} controlId="formGridCity">
        //                         <Form.Label>Фамилия</Form.Label>
        //                         <Form.Control
        //                             value={
        //                                 data.userDescriptions
        //                                     ? data.userDescriptions.lastName
        //                                     : ""
        //                             }
        //                         />
        //                     </Form.Group>
        //                 </Row>

        //                 <Row className="mb-3">
        //                     <Form.Group as={Col} controlId="formGridCity">
        //                         <Form.Label>Должность</Form.Label>
        //                         <Form.Control
        //                             value={
        //                                 data.userDescriptions
        //                                     ? data.userDescriptions.post
        //                                     : ""
        //                             }
        //                         />
        //                     </Form.Group>

        //                     <Form.Group as={Col} controlId="formGridCity">
        //                         <Form.Label>Почта</Form.Label>
        //                         <Form.Control
        //                             type="email"
        //                             value={
        //                                 data.userDescriptions
        //                                     ? data.userDescriptions.email
        //                                     : ""
        //                             }
        //                         />
        //                     </Form.Group>
        //                 </Row>

        //                 <Row className="mb-3">
        //                     <Col>
        //                         <h6>Список ролей</h6>
        //                         <ListGroup>
        //                             {data.roles.map((role) => (
        //                                 <ListGroup.Item key={role.id}>
        //                                     {role.name}
        //                                 </ListGroup.Item>
        //                             ))}
        //                         </ListGroup>
        //                     </Col>
        //                     <Col>
        //                         <Col xs={6} md={4}>
        //                             <Image
        //                                 src={
        //                                     data.userDescriptions
        //                                         ? data.userDescriptions.image
        //                                         : ""
        //                                 }
        //                                 // src="https://img.freepik.com/premium-vector/cool-man-profile-photo-icon-profile-icon-male-head-face-flat-design-vector-illustration_750364-393.jpg"
        //                                 rounded
        //                                 height={200}
        //                                 width={200}
        //                             />
        //                         </Col>
        //                     </Col>
        //                 </Row>

        //                 <Row>
        //                     <Col sm={3}>
        //                         <Button variant="primary" type="submit">
        //                             Сохранить
        //                         </Button>
        //                     </Col>
        //                     <Col sm={3}>
        //                         <Button variant="danger">Удалить</Button>
        //                     </Col>
        //                 </Row>
        //             </Form>
        //         ) : (
        //             <></>
        //         )}
        //     </Row>
        // </Row>
        <OneUserForm />
    );
};

export default OneUser;
