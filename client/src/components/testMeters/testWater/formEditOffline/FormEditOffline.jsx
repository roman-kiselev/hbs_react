import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
    getMeters,
    getTable,
    updateBulk,
} from "../../../../http/waterMeterApi";
import { addAllDataInDb } from "../db/service/addAllDataInDb";
import ModalSettings from "./modal/ModalSettings";
import db from "../db/db";
import MainTable from "./table/MainTable";
import getUniqueKdl from "../db/service/getUniqueKdl";
import { useState } from "react";
import getRowsByNumberKdl from "../db/service/getRowsByNumberKdl";
import useLiveQuery from "dexie-react-hooks";
import getAllTable from "../db/service/getAllTable";
import { delDbAndClose } from "../db/service/delDb";
// Добавляем все счётчики из БД
const getWaterMeters = async (idObject, dataOld, setState) => {
    try {
        const { table } = await getTable(idObject);
        if (table) {
            delDbAndClose().then(async () => {
                await addAllDataInDb(table);
            });
        }
        if (dataOld !== undefined && table !== undefined) {
            setState((dataOld) => {
                table.map((d) => (d.id === dataOld.id ? dataOld : d));
            });
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

// Получаем всю таблицу
const getAllTableWater = async () => {
    try {
        const data = await getAllTable();
        if (data) {
            // Преобразуем данные в json
            const jsonData = JSON.stringify(data);
            console.log(jsonData);
            const result = await updateBulk(jsonData);
            console.log(result);
        }
    } catch (e) {
        console.log(e);
    }
};

const FormEditOffline = ({ id }) => {
    const handleClick = () => {
        getWaterMeters(id);
        // Перезагрузить страницу
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

    // Получает , сравнивает , и добавляет в state

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
                    <Button
                        variant="warning"
                        onClick={() => getWaterMeters(id, meters, setMeters)}
                    >
                        Синхронизировать для оффлайн
                    </Button>
                </Col>
                <Col className="mt-3" sm={4}>
                    <Button variant="success" onClick={getAllTableWater}>
                        Отправить данные
                    </Button>
                </Col>
                <Col className="mt-3" sm={4}>
                    <Button variant="danger" onClick={delDbAndClose}>
                        Удалить
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
