import { useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
    addDataExcelWater,
    getAllWaterMeter,
    getAllWaterMeterPulsar,
} from "../../../../http/waterMeterApi";
import { getAllMetersByUserAndObject } from "../../../../shared/models/testMeterWater/testWaterMeterSlice";
import MainTabDownloadListWater from "./downloadList/MainTabDownloadListWater";
import MainTabGenerateTemplateWater from "./generateTemplate/MainTabGenerateTemplateWater";
import MainTabReadFileWater from "./readFile/MainTabReadFileWater";

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

    const getPulsarExcel = () => {
        try {
            getAllWaterMeterPulsar(objectBuildId);
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
    const [stateCheck, setStateCheck] = useState(false);
    const handleSelectCheck = () => {
        setStateCheck(!stateCheck);
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
                const comment =
                    worksheet["H" + i].v !== undefined
                        ? worksheet["H" + i].v
                        : null;

                mainData.push({
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    numberMeter,
                    sumMeter,
                    comment,
                });
            }
            const dataJson = JSON.stringify(mainData);

            addDataExcelWater(objectBuildId, userId, stateCheck, dataJson).then(
                (res) => {
                    dispatch(getAllMetersByUserAndObject({ formQuery }));
                }
            );
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
                            <MainTabDownloadListWater
                                objectBuildId={objectBuildId}
                                getExcel={getExcel}
                                getPulsarExcel={getPulsarExcel}
                            />
                        </Tab.Pane>
                        {/* Второй таб для скачивания шаблонов для загрузки */}
                        <Tab.Pane eventKey="second">
                            <MainTabGenerateTemplateWater
                                objectBuildId={objectBuildId}
                            />
                        </Tab.Pane>
                        {/* Третий таб для загрузки файлов */}
                        <Tab.Pane eventKey="three">
                            <MainTabReadFileWater
                                objectBuildId={objectBuildId}
                                handleFileUpload={handleFileUpload}
                                stateCheck={stateCheck}
                                handleSelectCheck={handleSelectCheck}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default OperationsWater;
