import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { InputNumber } from "../../../shared/ui";

const FormAsrTwo = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Row>
            <Form>
                <Row>
                    <Row>
                        <Col>
                            <Badge bg="primary">
                                Счётчики ХВС -<span>10 шт</span>
                            </Badge>
                        </Col>
                        <Col>
                            <Badge bg="danger">
                                Счётчики ГВС -<span>10 шт</span>
                            </Badge>
                        </Col>
                        <Col>
                            <Badge bg="warning" text="dark">
                                АСР -<span>10 шт</span>
                            </Badge>
                        </Col>
                    </Row>
                    <OffCanvas
                        handleClose={handleClose}
                        handleShow={handleShow}
                        show={show}
                    />
                    <LocationGroup />
                </Row>

                <Row>
                    <KdlInput />

                    <Row className="m-2">
                        <ColdWaterGroup />
                        <HotWaterGroup />
                        <Comment />
                    </Row>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Добавить
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleShow}>
                            Launch
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <OneAsrForList />
            </Row>
        </Row>
    );
};

export default FormAsrTwo;
