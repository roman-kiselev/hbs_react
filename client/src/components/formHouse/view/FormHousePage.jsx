import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const items = [
  {
    id: 1,
    name: "Секции",
    children: [
      {
        id: 11,
        name: "Описание",
      },
    ],
  },
];

const FormHousePage = () => {
  return (
    <Container>
      <Row>Gjk</Row>
      <Row style={{ height: "80vh" }}>
        <Col sm={2}>Секции</Col>
        <Col sm={10}></Col>
      </Row>
    </Container>
  );
};

export default FormHousePage;
