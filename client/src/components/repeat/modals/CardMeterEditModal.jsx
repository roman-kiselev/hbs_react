import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../shared/hooks";
import useNumber from "../../hooks/useNumber";
import InputNumber from "../inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../inputs/inputsNumber/InputNumberFloating";

const CardMeterEditModal = ({
    data,
    show,
    handleClose,
    handleEditMeter,
    handleClickForEdit,
}) => {
    const dispatch = useDispatch();

    const { id: userId } = useAppSelector((state) => state.user.user);

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

    const formQuery = {
        userId,
        objectBuildId,
    };

    const formData = new FormData();
    formData.append("section", section);
    formData.append("floor", floor);
    formData.append("flat", flat);
    formData.append("office", office === null ? 0 : office);
    formData.append("numberMeter", numberMeter);
    formData.append("sumMeter", sumMeter);
    formData.append("numberAsr", numberAsr);
    formData.append("numberKdl", numberKdl);
    formData.append("id", idMeter);
    formData.append("line", line);
    formData.append("typeMeter", data.typeMeter);
    formData.append("comment", comment);

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
                        <Row>
                            <Button variant="primary">Изменить на офис</Button>
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
                        handleClickForEdit(formData, formQuery, handleClose)
                    }
                >
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardMeterEditModal;
