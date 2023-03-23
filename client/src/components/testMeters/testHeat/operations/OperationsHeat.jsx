import React, { URL, useState } from "react";
import { Button, Col, Form, Nav, Row, Tab, Table } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";

import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import {
    addDataExcelHeat,
    getAllMetersHeat,
} from "../../../../http/heatMeterApi";
import { getAllHeatMeter } from "../../../../features/testMeters/testHeatMeterSlice";
import MainTabReadFile from "./readFile/MainTabReadFile";
import MainTabDownloadList from "./downloadList/MainTabDownloadList";
import MainTabGenerateTemplate from "./generateTemplate/MainTabGenerateTemplate";

const OperationsHeat = ({ id: objectBuildId }) => {
    //LДиспатч для вызова функции
    const dispatch = useDispatch();
    // Получаем excel по api
    const getExcel = () => {
        try {
            getAllMetersHeat(objectBuildId);
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

            console.log(lengthWorksheet, body);
            const mainData = [];
            for (let i = 2; i < lengthWorksheet; i++) {
                const section = worksheet["A" + i].v;
                const floor = worksheet["B" + i].v;
                const flat = worksheet["C" + i].v;
                const line = worksheet["D" + i].v;
                const numberMeter = worksheet["E" + i].v;
                const sumMeter = worksheet["F" + i].v;

                mainData.push({
                    section,
                    floor,
                    flat,
                    line,
                    numberMeter,
                    sumMeter,
                });
            }
            const dataJson = JSON.stringify(mainData);

            addDataExcelHeat(objectBuildId, userId, dataJson).then((res) => {
                dispatch(getAllHeatMeter({ formQuery }));
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
                            <MainTabDownloadList
                                objectBuildId={objectBuildId}
                                getExcel={getExcel}
                            />
                        </Tab.Pane>
                        {/* Второй таб для скачивания шаблонов для загрузки */}
                        <Tab.Pane eventKey="second">
                            <MainTabGenerateTemplate
                                objectBuildId={objectBuildId}
                            />
                        </Tab.Pane>
                        {/* Третий таб для загрузки файлов */}
                        <Tab.Pane eventKey="three">
                            <MainTabReadFile
                                objectBuildId={objectBuildId}
                                handleFileUpload={handleFileUpload}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default OperationsHeat;
