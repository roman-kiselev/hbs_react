import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { BsCircle, BsCircleFill } from "react-icons/bs";

const MainKdlInObject = () => {
    const [kdl, setKdl] = React.useState([
        {
            name: "КДЛ №1",
        },
        {
            name: "КДЛ №2",
        },
        {
            name: "КДЛ №3",
        },
    ]);

    const handleClick = () => {};

    return (
        <Row>
            <Row>
                <h5>Кдл к объекту</h5>
            </Row>
            <Row className="mt-3">
                <Row className="mt-3">
                    <Col sm={4}>
                        <ListGroup>
                            {kdl.map((item, index) => (
                                <ListGroup.Item
                                    className="mb-1 mt-1"
                                    style={{ cursor: "pointer" }}
                                    key={index}
                                >
                                    {item.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col sm={8}>
                        <BsCircle>1</BsCircle>

                        <BsCircleFill>49</BsCircleFill>
                    </Col>
                </Row>
            </Row>
        </Row>
    );
};

export default MainKdlInObject;
