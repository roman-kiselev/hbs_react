import React, { URL, useState } from "react";
import { Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import { getAllMetersElectrical } from "../../../../http/electricalMeterApi";
import * as XLSX from "xlsx";

const OperationsElectrical = ({ id: objectBuildId }) => {
    const getExcel = () => {
        try {
            getAllMetersElectrical(objectBuildId);
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState([]);

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
            console.log(lengthWorksheet);

            for (let i = 2; i < lengthWorksheet; i++) {
                const id = worksheet["A" + i].v;
                const section = worksheet["B" + i].v;
                const floor = worksheet["C" + i].v;
                const flat = worksheet["D" + i].v;
                const line = worksheet["E" + i].v;
                const numberMeter = worksheet["F" + i].v;
                const sumMeter = worksheet["G" + i].v;
                const type = worksheet["H" + i].v;

                console.log({
                    id,
                    section,
                    floor,
                    flat,
                    line,
                    numberMeter,
                    sumMeter,
                    type,
                });
            }
            // /* Send data to server */
            // const body = JSON.stringify(worksheetData);
            // fetch("http://example.com/api/data", { method: "POST", body });
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
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Button variant="success" onClick={getExcel}>
                                Скачать Excel
                                <RiFileExcel2Line />
                            </Button>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">2</Tab.Pane>
                        <Tab.Pane eventKey="three">
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

export default OperationsElectrical;
