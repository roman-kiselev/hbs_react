import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const RowSectionAndFloor = ({
  index,
  item,
  handleSectionChange,
  handleLinesChange,
}) => {
  const [floor, setFloor] = React.useState(item.sumFloors);
  const [lines, setLines] = React.useState(item.lines);
  const handleChangeFloor = (e) => {
    setFloor(e.target.value);
    handleSectionChange(index, e.target.value);
  };

  const handleChangeLines = (e) => {
    setLines(e.target.value);
    handleLinesChange(index, e.target.value);
  };
  return (
    <Row key={index}>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Секция</Form.Label>
          <Form.Control
            type="number"
            value={item.numberSection}
            disabled={true}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Количество этажей</Form.Label>
          <Form.Control
            type="number"
            value={floor}
            onChange={(e) => handleChangeFloor(e)}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group className="mb-3">
          <Form.Label>Количество стояков</Form.Label>
          <Form.Control
            type="number"
            value={lines}
            onChange={(e) => handleChangeLines(e)}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default RowSectionAndFloor;
