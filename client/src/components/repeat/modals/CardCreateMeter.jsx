import React, { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllMetersByUserAndObject,
    getOneMeter,
} from "../../../features/testMeters/testWaterMeterSlice";
import useNumber from "../../hooks/useNumber";
import InputNumber from "../inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../inputs/inputsNumber/InputNumberFloating";
import InputNumberSelected from "../inputs/inputsNumber/InputNumberSelected";

const CardCreateMeter = ({
    show,
    id: objectBuildId,
    userId,
    handleClose,
    handleEditMeter,
    handleClickForEdit,
}) => {
    const [section, setSection, handleInputChangeSection] = useNumber(0);
    const [floor, setFloors, handleInputChangeFloor] = useNumber(0);
    const [object, setFlat, handleInputChangeFlat] = useNumber(0);
    const [numberMeter, setNumberMeter, handleInputChangeNumberMeter] =
        useNumber(0);
    const [sumMeter, setSumMeter, handleInputChangeSumMeter] = useNumber(0);
    const [line, setLine, handleInputChangeLine] = useNumber(0);
    const [comment, setComment] = useState("");

    // Для выбора офис или квартиры
    const [selectObject, setSelectObject, handleInputChangeSelectObject] =
        useNumber("flat");
    // Создаём ref для того что бы после нажатия проставилась фокусировка
    const inputRef = React.useRef(null);
    // Блокируем кнопку сохранить пока не заполнены поля
    // Проверяем все state
    const isDisabled =
        !section || !floor || !object || !numberMeter || !sumMeter || !line;
    const formData = {
        section,
        floor,
        flat: selectObject === "flat" ? object : 0,
        office: selectObject === "office" ? object : 0,
        numberMeter,
        sumMeter,
        line,
        typeMeter: "Счётчик тепла",
        comment,
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Счётчик тепла</Modal.Title>
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
                                    onChangeFlat={handleInputChangeFlat}
                                    inputRef={inputRef}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <InputNumber
                                prop={{
                                    title: "Номер счётчика",
                                    value: numberMeter,
                                }}
                                onChange={handleInputChangeNumberMeter}
                            />

                            <Col>
                                <InputNumberFloating
                                    prop={{
                                        title: "Линия",
                                        value: line,
                                    }}
                                    onChange={handleInputChangeLine}
                                />
                            </Col>
                            <Col>
                                <InputNumberFloating
                                    prop={{
                                        title: "Показания",
                                        value: sumMeter,
                                    }}
                                    onChange={handleInputChangeSumMeter}
                                />
                            </Col>
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
                    onClick={() =>
                        handleClickForEdit(
                            formData,
                            handleClose,
                            setSection,
                            setFloors,
                            setFlat,
                            setNumberMeter,
                            setSumMeter,
                            setLine,
                            setComment
                        )
                    }
                    disabled={isDisabled}
                >
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardCreateMeter;
