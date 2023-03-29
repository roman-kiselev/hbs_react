import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import { useQuery } from "react-query";
import { getAllSections } from "../../../../../http/mainTableApi/objects/sectionsApi";

const MainTabGenerateTemplateWater = ({ objectBuildId }) => {
    // Состояние selected
    const [selectedSection, setSelectedSection] = React.useState("");
    const [selectedKdl, setSelectedKdl] = React.useState("");
    // Изменяем состояние
    const handleChangeSection = (e) => {
        setSelectedSection(e.target.value);
    };
    const handleChangeKdl = (e) => {
        setSelectedKdl(e.target.value);
        //
    };
    // Список всех секций
    const [sections, setSections] = React.useState([]);
    // Список всех КДЛ
    const [kdl, setKdl] = React.useState([]);

    // Используем useQuery для получения данных из БД
    const { isLoading, error, data } = useQuery("sections", async () => {
        const { sections } = await getAllSections(objectBuildId);
        setSections(sections);
    });

    // Проверка пользователей
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Row>
            <Row>
                <Col sm={3}>
                    <Form.Select
                        value={selectedSection}
                        onChange={handleChangeSection}
                        aria-label="Default select example"
                    >
                        {sections.map((section, i) => (
                            <option key={i} value={section.section}>
                                {section.section}
                            </option>
                        ))}
                    </Form.Select>
                </Col>

                <Col sm={3}>
                    <Form.Select
                        value={selectedKdl}
                        onChange={handleChangeKdl}
                        aria-label="Default select example"
                    >
                        {selectedSection === "" ? (
                            <option>Выберите секцию</option>
                        ) : (
                            kdl.map((k, i) => (
                                <option key={i} value={k.listKdl}>
                                    {k.listKdl}
                                </option>
                            ))
                        )}
                    </Form.Select>
                </Col>
                <Col>
                    <Button variant="success" disabled={true}>
                        Скачать шаблон
                        <RiFileExcel2Line />
                    </Button>
                </Col>
            </Row>
        </Row>
    );
};

export default MainTabGenerateTemplateWater;
