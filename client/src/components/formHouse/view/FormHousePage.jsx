import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Card,
  Table,
} from "react-bootstrap";
import ModalInfoHome from "../modals/ModalInfoHome";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../../features/formHouse/formHouseSlice";
import LineRowHeader from "../form/formTable/LineRowHeader";

const FormHousePage = () => {
  const [show, setShow] = useState(false);
  const [activeNumberSection, setActiveNumberSection] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { formHouse } = useSelector((state) => state.formHouse);
  const dispatch = useDispatch();
  const handleClickForActive = (numberSection) => {
    setActiveNumberSection(numberSection);
    dispatch(setActive(numberSection));
  };

  console.log(activeNumberSection);

  return (
    <Container>
      <Row>Gjk</Row>
      <Row>
        <Row className="justify-content-end">
          <Col className="text-end">
            <Button variant="info" onClick={handleShow}>
              Задать параметры
            </Button>
          </Col>
        </Row>
        <ModalInfoHome handleClose={handleClose} show={show} />
      </Row>
      <Row style={{ height: "80vh" }}>
        <Col sm={2}>
          <Row>
            <ListGroup>
              {formHouse.length === 0 ? (
                <h6>Добавьте секцию</h6>
              ) : (
                formHouse.map((item, index) => (
                  <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={item.active}
                    key={index}
                    action
                    onClick={() => handleClickForActive(item.numberSection)}
                  >
                    {item.numberSection}
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Row>
        </Col>
        <Col sm={10}>
          <Container style={{ width: "100%", height: "100%" }}>
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              <Table striped bordered hover>
                <LineRowHeader numberSection={activeNumberSection} />
                <tbody>
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
                  </tr>
                </tbody>
              </Table>
            </Scrollbars>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default FormHousePage;
