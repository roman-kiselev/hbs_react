import React, {useState} from 'react';
import {Alert, Button, ListGroup, Offcanvas, Row, Col, Form} from "react-bootstrap"

const DescriptionObject = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [active, setActive] = useState(false)
    const clickActive = () => setActive(true)

    return (

        <Row className="m-1">
            <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                Открыть меню
            </Button>

            <Col className="col-xl-2">
                <Row>
                    <Offcanvas show={show} onHide={handleClose} responsive="lg">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Навигация</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>

                            <Row xl={12} className="mt-3">
                                <ListGroup defaultActiveKey="#link1">
                                    <ListGroup.Item action href="..">
                                        Назад
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link14">
                                        Добавление ХВС - Болид
                                    </ListGroup.Item>
                                    <ListGroup.Item action href="#link2">
                                        Добавление ГВС - Болид
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={() => handleClose()} action href="#link3">
                                        Добавление ХВС-ГВС
                                    </ListGroup.Item>
                                    <ListGroup.Item onClick={() => handleClose()} action href="#link5">
                                        Добавление ХВС - Пульсар
                                    </ListGroup.Item>
                                </ListGroup>
                            </Row>




                        </Offcanvas.Body>
                    </Offcanvas>
                </Row>
            </Col>
            <Col  className="col-12 col-xl-9 justify-content-center mt-3">
                <Row>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Col>


        </Row>
    );
};

export default DescriptionObject;