import React from "react";
import { Card, Row, Table } from "react-bootstrap";

const ColFloors = ({ floors }) => {
  const [arrFloors, setArrFloors] = React.useState([]);

  return (
    <tr>
      <td>1</td>
      <td>
        <Card
          bg={"light"}
          key={"light"}
          text={"light" === "light" ? "dark" : "white"}
          style={{ width: "20rem" }}
          className="mb-2"
        >
          <Card.Header>АСР</Card.Header>
          <Card.Body>
            {/* <Card.Title>Card Title</Card.Title> */}

            <Row>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>3</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Card.Body>
        </Card>
      </td>
      <td>
        <Card
          bg={"light"}
          key={"light"}
          text={"light" === "light" ? "dark" : "white"}
          style={{ width: "20rem" }}
          className="mb-2"
        >
          <Card.Header>АСР</Card.Header>
          <Card.Body>
            {/* <Card.Title>Card Title</Card.Title> */}

            <Row>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>3</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Card.Body>
        </Card>
      </td>
    </tr>
  );
};

export default ColFloors;
