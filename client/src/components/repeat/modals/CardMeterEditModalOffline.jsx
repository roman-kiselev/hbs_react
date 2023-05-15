import React, { useState } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import useNumber from "../../hooks/useNumber";
import InputNumber from "../inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../inputs/inputsNumber/InputNumberFloating";

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
    const [flat, setFlat, handleInputChangeFlat] = useNumber(data.flat);
    const [numberMeter, setNumberMeter, handleInputChangeNumberMeter] =
        useNumber(data.numberMeter);
    const [sumMeter, setSumMeter, handleInputChangeSumMeter] = useNumber(
        data.sumMeter
    );
    const [numberAsr, setNumberAsr, handleInputChangeNumberAsr] = useNumber(
        data.numberAsr
    );
    const [numberKdl, setNumberKdl, handleInputChangeNumberKdl] = useNumber(
        data.numberKdl
    );
    const [line, setLine, handleInputChangeLine] = useNumber(data.line);

    const [office, setOffice, handleInputChangeOffice] = useNumber(data.office);
    const [comment, setComment] = useState(
        data.comment === null ? "" : data.comment
    );
    const { id: idMeter, objectBuildId } = data;

    const formData = {
        section,
        floor,
        flat,
        office: office === null ? 0 : office,
        numberMeter,
        sumMeter,
        numberAsr,
        numberKdl,
        id: idMeter,
        line,
        typeMeter: data.typeMeter,
        comment,
    };

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
                                {flat ? (
                                    <InputNumber
                                        prop={{
                                            title: "Квартира",
                                            value: flat,
                                        }}
                                        onChange={handleInputChangeFlat}
                                    />
                                ) : (
                                    <InputNumber
                                        prop={{
                                            title: "Офис",
                                            value: office,
                                        }}
                                        onChange={handleInputChangeOffice}
                                    />
                                )}
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
                    onClick={() => handleClickForEdit(formData, handleClose)}
                >
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardMeterEditModalOffline;
