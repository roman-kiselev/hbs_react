import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import MainTable from "../../testWater/formEditOffline/table/MainTable";
import TableOffline from "./table/TableOffline";

const FormOfflineHeat = () => {
    // Здесь секции для пагинации по секциям
    // [1, 2, 3, 4]
    const [listSection, setListSection] = useState([]);

    // Здесь лист счётчиков
    const [listMeters, setListMeters] = useState([
        {
            id: 1,
            section: 1,
            floor: 1,
            flat: 1,
            office: 0,
            line: 1,
            typeMeter: "Счётчик тепла",
            numberMeter: 1,
            sumMeter: 0.33,
            comment: "",
        },
        {
            id: 2,
            section: 2,
            floor: 1,
            flat: 2,
            office: 0,
            line: 1,
            typeMeter: "Счётчик тепла",
            numberMeter: 1,
            sumMeter: 0.22,
            comment: "",
        },
    ]);
    // Здесь список счётчиков по выбранной секции
    const [listSelectedSection, setListSelectedSection] = useState([]);
    const handleClick = () => {
        console.log("Отправить на сервер");
    };

    return (
        <Container>
            <Row className="d-flex ">
                {/* <Col className="d-flex justify-content-center">
                    <Button variant="primary">Primary</Button>
                </Col> */}
                <Col className="d-flex justify-content-center">
                    <Button variant="warning">
                        Синхронизировать для оффлайн
                    </Button>
                </Col>
                <Col className="d-flex justify-content-center mt-3">
                    <Button variant="success">Отправить на сервер</Button>
                </Col>
            </Row>

            <Row>
                {listSection > 0 ? listSection.map((item) => item) : <></>}
            </Row>
            <Row>
                <TableOffline />
                {listMeters.length > 0 ? (
                    listMeters.map((item) => item.id)
                ) : (
                    <p>Нет данных</p>
                )}
            </Row>
            <Row className="mt-3">
                <BsPlusCircleFill
                    cursor={"pointer"}
                    size={50}
                    color="green"
                    onClick={handleClick}
                />
            </Row>
        </Container>
    );
};

export default FormOfflineHeat;
