import React, { URL, useState } from "react";
import {
    Badge,
    Button,
    Col,
    Form,
    Nav,
    Row,
    Tab,
    Table,
} from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";

import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import {
    addDataExcelWater,
    getAllWaterMeter,
} from "../../../../http/waterMeterApi";
import { getAllMetersByUserAndObject } from "../../../../features/testMeters/testWaterMeterSlice";

const OperationsWater = ({ id: objectBuildId }) => {
    //Диспатч для вызова функции
    const dispatch = useDispatch();
    // Получаем excel по api
    const getExcel = () => {
        try {
            getAllWaterMeter(objectBuildId);
        } catch (error) {
            console.log(error);
        }
    };
    // Формируем query для запроса
    const { id: userId } = useSelector((state) => state.users.user);
    const [data, setData] = useState([]);
    const formQuery = {
        userId,
        objectBuildId,
        currentPage: 1,
    };

    //Функция для считывания файла
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const binaryString = evt.target.result;
            const workbook = XLSX.read(binaryString, { type: "binary" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const worksheetData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
            });
            setData(worksheetData);
            const body = JSON.stringify(worksheetData);
            const lengthWorksheet = worksheetData.length + 1;

            const mainData = [];
            for (let i = 2; i < lengthWorksheet; i++) {
                const section = worksheet["A" + i].v;
                const floor = worksheet["B" + i].v;
                const flat = worksheet["C" + i].v;
                const numberKdl = worksheet["D" + i].v;
                const numberAsr = worksheet["E" + i].v;
                const numberMeter = worksheet["F" + i].v;
                const sumMeter = worksheet["G" + i].v;

                mainData.push({
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    numberMeter,
                    sumMeter,
                });
            }
            const dataJson = JSON.stringify(mainData);

            addDataExcelWater(objectBuildId, userId, dataJson).then((res) => {
                dispatch(getAllMetersByUserAndObject({ formQuery }));
            });
            // addDataExcel(objectBuildId, userId, dataJson).then((res) => {
            //     dispatch(getAllElectricalMeters({ formQuery }));
            //     // В res лежат счётчики с повторным номером и ответ
            //     console.log(res);
            // });
        };
        reader.readAsBinaryString(file);
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Весь лист</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">
                                Лист с параметрами
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="three">
                                Загрузить из файла
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                {/*  Здесь вкладки табов */}
                <Col sm={9}>
                    <Tab.Content>
                        {/* Первый таб для скачивания общего файла */}
                        <Tab.Pane eventKey="first">
                            <Button variant="success" onClick={getExcel}>
                                Скачать Excel
                                <RiFileExcel2Line />
                            </Button>
                        </Tab.Pane>
                        {/* Второй таб для скачивания шаблонов для загрузки */}
                        <Tab.Pane eventKey="second">2</Tab.Pane>
                        {/* Третий таб для загрузки файлов */}
                        <Tab.Pane eventKey="three">
                            <Row>
                                <Row>
                                    <h6>Таблица должна быть следующего вида</h6>
                                </Row>
                                <Row>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Секция</th>
                                                <th>Этаж</th>
                                                <th>Квартира</th>
                                                <th>Номер КДЛ</th>
                                                <th>Номер Канала</th>
                                                <th>Номер счётчика</th>
                                                <th>Показания</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>2</td>
                                                <td>26</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>192168233</td>
                                                <td>1.2</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>2</td>
                                                <td>27</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>192168234</td>
                                                <td>1.5</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Row>
                                        <Badge bg="warning" text="dark">
                                            Важно!!! Счётчик холодной воды -
                                            Канал нечётный! Счётчик горячей воды
                                            - Канал чётный
                                        </Badge>
                                    </Row>
                                </Row>
                            </Row>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Выберите файл</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileUpload}
                                />
                            </Form.Group>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default OperationsWater;
