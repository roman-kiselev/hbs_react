import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import {
    getAllLines,
    getTemplateFromServer,
} from "../../../../../http/heatMeterApi";

const MainTabGenerateTemplate = ({ objectBuildId }) => {
    const [lines, setLines] = useState([]);
    const [selectedLine, setSelectedLine] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const handleOptionSelectTemplate = (e) => {
        const selectedValue = e.target.value;
        setSelectedTemplate(selectedValue);
    };
    const handleOptionSelectLine = (e) => {
        const selectedValue = e.target.value;
        setSelectedLine(selectedValue);
    };

    async function getAllLinesAsync() {
        try {
            const { lines } = await getAllLines(objectBuildId);
            setLines(lines);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllLinesAsync();
    }, []);

    const getTemplateHeat = () => {
        getTemplateFromServer(objectBuildId, selectedTemplate, selectedLine);
    };
    return (
        <Row>
            <Row>
                <Col>
                    <Form.Select
                        onChange={(e) => handleOptionSelectLine(e)}
                        value={selectedLine ? selectedLine : ""}
                        aria-label="Default select example"
                    >
                        <option>Выбор линии</option>
                        {lines.map((line) => (
                            <option key={line.line} value={line.line}>
                                {line.line}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select
                        onChange={(e) => handleOptionSelectTemplate(e)}
                        value={selectedTemplate ? selectedTemplate : ""}
                        aria-label="Default select example"
                    >
                        <option>Выбор шаблона</option>
                        <option value="MeterBus">MeterBus</option>
                        <option value="Pulsar">Pulsar</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Button variant="outline-success" onClick={getTemplateHeat}>
                        Получить шаблон
                    </Button>
                </Col>
            </Row>
        </Row>
    );
};

export default MainTabGenerateTemplate;
