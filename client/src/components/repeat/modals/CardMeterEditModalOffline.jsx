import React, { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import useNumber from "../../hooks/useNumber";
import InputNumber from "../inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../inputs/inputsNumber/InputNumberFloating";
import InputNumberSelected from "../inputs/inputsNumber/InputNumberSelected";

const CardMeterEditModalOffline = ({
    data,
    show,
    handleClose,
    handleEditMeter,
    handleClickForEdit,
}) => {
    const [section, setSection, handleInputChangeSection] = useNumber(
        data.section
    );
    const [floor, setFloors, handleInputChangeFloor] = useNumber(data.floor);
    const [object, setObject, handleInputChangeObject] = useNumber(
        data.flat !== 0 ? data.flat : data.office
    );
    // Если есть data => data иначе 2
    const getMeter = (number) => {
        if (Number(number) === 0) {
            return 2;
        } else {
            return number;
        }
    };
    const [numberMeter, setNumberMeter, handleInputChangeNumberMeter] =
        useNumber(getMeter(data.numberMeter));
    const getSumMeter = (number) => {
        if (Number(number) === 0) {
            return 0.1;
        } else {
            return number;
        }
    };
    const [sumMeter, setSumMeter, handleInputChangeSumMeter] = useNumber(
        getSumMeter(data.sumMeter)
    );
    const [numberAsr, setNumberAsr, handleInputChangeNumberAsr] = useNumber(
        data.numberAsr
    );
    const [numberKdl, setNumberKdl, handleInputChangeNumberKdl] = useNumber(
        data.numberKdl
    );

    const [line, setLine, handleInputChangeLine] = useNumber(data.line);

    //const [office, setOffice, handleInputChangeOffice] = useNumber(data.office);
    const [comment, setComment] = useState(
        data.comment === null ? "" : data.comment
    );

    // Для выбора офис или квартиры
    const [selectObject, setSelectObject, handleInputChangeSelectObject] =
        useNumber(data.flat !== null ? "flat" : "office");

    const { id: idMeter, objectBuildId } = data;
    const isDisabledHeat =
        !section || !floor || !object || !numberMeter || !sumMeter || !line;
    const isDisabledWater =
        !section ||
        !floor ||
        !object ||
        !numberMeter ||
        !sumMeter ||
        !numberKdl ||
        !numberAsr;
    const formData = {
        section,
        floor,
        flat: selectObject === "flat" ? object : null,
        office: selectObject === "office" ? object : null,
        numberMeter,
        sumMeter,
        numberAsr,
        numberKdl,
        id: idMeter,
        line,
        typeMeter: data.typeMeter,
        comment,
    };

    const dataHeat = {
        section,
        floor,
        flat: selectObject === "flat" ? object : null,
        office: selectObject === "office" ? object : null,
        numberMeter,
        sumMeter,
        idIndex: idMeter,
        idDb: data.idDb,
        line,
        typeMeter: data.typeMeter,
        comment,
    };

    const getDataByTypeMeter = (typeMeter) => {
        if (
            typeMeter === "Счётчик горячей воды" ||
            typeMeter === "Счётчик холодной воды"
        ) {
            return formData;
        } else {
            return dataHeat;
        }
    };

    // Создаём ref для того что бы после нажатия проставилась фокусировка
    const inputRef = React.useRef(null);
    //console.log(dataHeat);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{data.typeMeter}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <InputNumber
                                    prop={{ title: "Секция", value: section }}
                                    onChange={handleInputChangeSection}
                                />
                            </Col>
                            <Col>
                                <InputNumber
                                    prop={{ title: "Этаж", value: floor }}
                                    onChange={handleInputChangeFloor}
                                />
                            </Col>
                            <Col>
                                <InputNumberSelected
                                    prop={{
                                        titles: [
                                            {
                                                title: "Квартира",
                                                value: "flat",
                                            },
                                            { title: "Офис", value: "office" },
                                        ],
                                        value: object,
                                    }}
                                    value={selectObject}
                                    onChangeSelect={
                                        handleInputChangeSelectObject
                                    }
                                    onChangeFlat={handleInputChangeObject}
                                    inputRef={inputRef}
                                />
                            </Col>
                        </Row>
                        <Row>
                            {data.typeMeter === "Счётчик тепла" ||
                            data.typeMeter === "Счётчик электроэнергии" ? (
                                <InputNumber
                                    prop={{
                                        title: "Линия",
                                        value: line,
                                    }}
                                    onChange={handleInputChangeLine}
                                />
                            ) : (
                                <>
                                    <Col>
                                        <InputNumber
                                            prop={{
                                                title: "КДЛ",
                                                value: numberKdl,
                                            }}
                                            onChange={
                                                handleInputChangeNumberKdl
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <InputNumber
                                            prop={{
                                                title: "Номер канала",
                                                value: numberAsr,
                                            }}
                                            onChange={
                                                handleInputChangeNumberAsr
                                            }
                                        />
                                    </Col>
                                </>
                            )}

                            <InputNumber
                                prop={{
                                    title: "Номер счётчика",
                                    value: numberMeter,
                                }}
                                onChange={handleInputChangeNumberMeter}
                            />

                            <InputNumberFloating
                                prop={{ title: "Показания", value: sumMeter }}
                                onChange={handleInputChangeSumMeter}
                            />
                        </Row>
                        <Row>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Комментарий</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={comment === null ? "" : comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button
                    variant="primary"
                    disabled={
                        data.typeMeter === "Счётчик тепла"
                            ? isDisabledHeat
                            : isDisabledWater
                    }
                    onClick={() =>
                        handleClickForEdit(
                            getDataByTypeMeter(data.typeMeter),
                            handleClose
                        )
                    }
                >
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardMeterEditModalOffline;
