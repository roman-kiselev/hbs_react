import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { getMeters } from "../../../../http/waterMeterApi";
import { addAllDataInDb } from "../db/service/addAllDataInDb";
import ModalSettings from "./modal/ModalSettings";
import db from "../db/db";
import MainTable from "./table/MainTable";
import getUniqueKdl from "../db/service/getUniqueKdl";
import { useState } from "react";
import getRowsByNumberKdl from "../db/service/getRowsByNumberKdl";
import useLiveQuery from "dexie-react-hooks";
// Добавляем все счётчики из БД
const getWaterMeters = async (idObject) => {
    try {
        const { meters } = await getMeters(idObject);
        if (meters) {
            const result = await addAllDataInDb(meters);
        }
    } catch (e) {
        console.log(e);
    }
};
// Получаем массив из уникальных номеров
const getKdl = async (setState) => {
    try {
        const data = await getUniqueKdl();
        setState(data);
    } catch (e) {
        console.log(e);
    }
};
// Получаем массив строк по одной КДЛ
const getArrOneKdl = async (kdl, setState) => {
    try {
        const data = await getRowsByNumberKdl(Number(kdl));
        setState(data);
    } catch (e) {
        console.log(e);
    }
};

const FormEditOffline = ({ id }) => {
    const handleClick = () => {
        getWaterMeters(id);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [kdlList, setKdlList] = useState([]);
    const [meters, setMeters] = useState([]);

    // const metersTwo = useLiveQuery(() => getArrOneKdl(selectedKdl, setMeters));

    const [selectedKdl, setSelectedKdl] = useState("");

    const handleSelectKdl = (e) => {
        setSelectedKdl(e.target.value);
    };
    const saveKdl = () => {
        getArrOneKdl(selectedKdl, setMeters);
        handleClose();
    };
    useEffect(() => {
        getKdl(setKdlList);
        getArrOneKdl(1, setMeters);
    }, []);

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    <ModalSettings
                        kdl={kdlList}
                        handleSelectKdl={handleSelectKdl}
                        selectedKdl={selectedKdl}
                        saveKdl={saveKdl}
                        handleShow={handleShow}
                        handleClose={handleClose}
                        show={show}
                    />
                </Col>
                <Col className="mt-3" sm={4}>
                    <Button variant="warning" onClick={handleClick}>
                        Синхронизировать для оффлайн
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <MainTable data={meters} />
            </Row>
        </Container>
    );
};

export default FormEditOffline;
