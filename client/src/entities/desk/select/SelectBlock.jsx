import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const SelectBlock = ({ data }) => {
    const [sectionState, setSectionState] = useState();
    const [floorState, setFloorState] = useState();

    const uniqueSection = new Set();
    data &&
        data.forEach((item) => {
            uniqueSection.add(item.main_meter.section);
        });

    console.log(Array.from(uniqueSection));

    const handleChangeSection = (e) => {
        // setSectionState(e.target.value);
        console.log(e.target.value);
    };

    return (
        <Row>
            <Col>
                <Form.Select onChange={handleChangeSection} size="sm">
                    {Array.from(uniqueSection).map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </Form.Select>
            </Col>
            <Col>
                <Form.Select size="sm">
                    <option>Выбор этажа</option>
                </Form.Select>
            </Col>
        </Row>
    );
};

export default SelectBlock;
