import { useState } from "react";
import { Button, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../../features/formHouse/formHouseSlice";
import ConfigHouse from "../config/ConfigHouse";
import Kdl from "../config/Kdl.js";
import Sections from "../config/Sections";
import ColFloors from "../form/formTable/ColFloors";
import LineRowHeader from "../form/formTable/LineRowHeader";
import ModalInfoHome from "../modals/ModalInfoHome";

const FormHousePage = () => {
    let sectionObject = [
        {
            numberSection: 1,
            sumFloors: 18,
            lines: 5,
            typeAsr: ["ASR2", "ASR8"],
            active: false,
        },
        {
            numberSection: 2,
            sumFloors: 18,
            lines: 4,
            typeAsr: ["ASR2", "ASR8"],
            active: false,
        },
    ];

    const configHome = new ConfigHouse(sectionObject);
    const nSection = new Sections({
        numberSection: 2,
        sumFloors: 18,
        lines: 7,
        typeAsr: ["ASR2", "ASR8"],
        active: false,
    });

    nSection.dataCount();

    const myKdl = new Kdl();

    let data = [
        {
            typeAsr: "ASR2",
            numberMeter: "1234541",
            typeMeter: "Счётчик холодной воды",
            sumMeter: "0.1",
        },
        {
            typeAsr: "ASR2",
            numberMeter: "1234541",
            typeMeter: "Счётчик горячей воды",
            sumMeter: "0.1",
        },
    ];

    let data2 = [
        {
            typeAsr: "ASR2",
            numberMeter: "1234541",
            typeMeter: "Счётчик холодной воды",
            sumMeter: "0.1",
        },
    ];

    let data8 = [
        {
            typeAsr: "ASR8",
            numberMeter: "1234541",
            typeMeter: "Счётчик холодной воды",
            sumMeter: "0.1",
        },
        {
            typeAsr: "ASR8",
            numberMeter: "1234541",
            typeMeter: "Счётчик горячей воды",
            sumMeter: "0.1",
        },
        {
            typeAsr: "ASR8",
            numberMeter: "1234541",
            typeMeter: "Счётчик горячей воды",
            sumMeter: "0.1",
        },
        {
            typeAsr: "ASR8",
            numberMeter: "1234541",
            typeMeter: "Счётчик холодной воды",
            sumMeter: "0.1",
        },
        {
            typeAsr: "ASR8",
            numberMeter: "1234541",
            typeMeter: "Счётчик горячей воды",
            sumMeter: "0.1",
        },
        {
            typeAsr: "ASR8",
            numberMeter: "1234541",
            typeMeter: "Счётчик горячей воды",
            sumMeter: "0.1",
        },
    ];

    const [show, setShow] = useState(false);
    const [activeNumberSection, setActiveNumberSection] = useState("");
    const [floors, setFloors] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { formHouse } = useSelector((state) => state.formHouse);
    const dispatch = useDispatch();
    const handleClickForActive = (numberSection) => {
        setActiveNumberSection(numberSection);
        // Установить этаж в соответствии с номероом секции
        const floor = formHouse.find(
            (item) => item.numberSection === numberSection
        );
        setFloors(floor.sumFloors);
        dispatch(setActive(numberSection));
    };

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
                                        onClick={() =>
                                            handleClickForActive(
                                                item.numberSection
                                            )
                                        }
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
                                <LineRowHeader
                                    numberSection={activeNumberSection}
                                />
                                <tbody>
                                    <ColFloors floors={formHouse.sumFloors} />
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
