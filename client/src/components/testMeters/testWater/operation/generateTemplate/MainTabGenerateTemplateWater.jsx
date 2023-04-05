import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";
import { useQuery } from "react-query";
import { getAllKdlBySectionId } from "../../../../../http/mainTableApi/device/deviceApi";
import { getAllSections } from "../../../../../http/mainTableApi/objects/sectionsApi";
import { getTemplateFromServerWater } from "../../../../../http/waterMeterApi";
import GenerateDat from "./GenerateDat";
import UpdateDat from "./UpdateDat";

const MainTabGenerateTemplateWater = ({ objectBuildId }) => {
    // Состояние selected
    const [selectedSection, setSelectedSection] = React.useState("");
    const [selectedKdl, setSelectedKdl] = React.useState("");
    // Список всех КДЛ
    const [kdl, setKdl] = React.useState([]);
    // Список всех секций
    const [sections, setSections] = React.useState([]);
    const [listMultiplier, setListMultiplier] = React.useState([
        {
            id: 1,
            name: "10",
        },
        {
            id: 2,
            name: "100",
        },
        {
            id: 3,
            name: "1000",
        },
    ]);
    const [multiplier, setMultiplier] = React.useState("");
    // Отслеживаем состояние кнопки для скачивания
    const [stateButton, setStateButton] = React.useState(true);
    const handleGetKdl = async (objectBuildId, section) => {
        const { listKdl } = await getAllKdlBySectionId(objectBuildId, section);

        setKdl(listKdl, section);
    };

    // Изменяем состояние
    const handleChangeSection = (e) => {
        setSelectedSection(e.target.value);
        handleGetKdl(objectBuildId, e.target.value);
    };
    const handleChangeKdl = (e) => {
        setSelectedKdl(e.target.value);
        setStateButton(false);
    };
    const handleChangeMultiplier = (e) => {
        setMultiplier(e.target.value);
    };

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

    const handleClickForDowloadTemplate = () => {
        getTemplateFromServerWater(
            objectBuildId,
            selectedSection,
            selectedKdl,
            multiplier
        );
    };

    return (
        <Row>
            <Row>
                <Col sm={3}>
                    <Form.Select
                        value={selectedSection}
                        onChange={handleChangeSection}
                        aria-label="Default select example"
                    >
                        <option>Выберите секцию</option>
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
                            <>
                                <option>Выберите KDL</option>
                                {kdl.map((k, i) => (
                                    <option key={i} value={k.numberKdl}>
                                        {k.numberKdl}
                                    </option>
                                ))}
                            </>
                        )}
                    </Form.Select>
                </Col>
                <Col sm={3}>
                    <Form.Select
                        value={multiplier}
                        onChange={handleChangeMultiplier}
                        aria-label="Default select example"
                    >
                        <option>Выберите множитель</option>
                        {listMultiplier.map((item, i) => (
                            <option key={i} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Button
                        variant="success"
                        disabled={stateButton}
                        onClick={handleClickForDowloadTemplate}
                    >
                        Скачать шаблон
                        <RiFileExcel2Line />
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <GenerateDat
                    stateButton={stateButton}
                    objectBuildId={objectBuildId}
                    selectedSection={selectedSection}
                    selectedKdl={selectedKdl}
                />
            </Row>
            <Row className="mt-3">
                <UpdateDat
                    objectBuildId={objectBuildId}
                    selectedSection={selectedSection}
                    selectedKdl={selectedKdl}
                />
            </Row>
        </Row>
    );
};

export default MainTabGenerateTemplateWater;
