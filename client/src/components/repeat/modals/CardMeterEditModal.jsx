import React from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllMetersByUserAndObject,
    getOneMeter,
} from "../../../features/testMeters/testWaterMeterSlice";
import useNumber from "../../hooks/useNumber";
import InputNumber from "../inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../inputs/inputsNumber/InputNumberFloating";

const CardMeterEditModal = ({ data, show, handleClose }) => {
    const dispatch = useDispatch();

    const { id: userId } = useSelector((state) => state.users.user);

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

    const { id: idMeter, objectBuildId } = data;

    const formQuery = {
        userId,
        objectBuildId,
    };

    // Сохраняем изменения
    const saveNewData = () => {
        const formData = new FormData();
        formData.append("section", section);
        formData.append("floors", floor);
        formData.append("flat", flat);
        formData.append("numberMeter", numberMeter);
        formData.append("sum", sumMeter);
        formData.append("asr", numberAsr);
        formData.append("kdl", numberKdl);
        formData.append("id", idMeter);
        formData.append("typeMeter", data.typeMeter);

        try {
            dispatch(getOneMeter({ formData })).then((d) => {
                dispatch(getAllMetersByUserAndObject({ formQuery }));
                handleClose();
            });
        } catch (e) {
            console.log(e);
        }
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
                                <InputNumber
                                    prop={{ title: "Квартира", value: flat }}
                                    onChange={handleInputChangeFlat}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputNumber
                                    prop={{ title: "КДЛ", value: numberKdl }}
                                    onChange={handleInputChangeNumberKdl}
                                />
                            </Col>
                            <Col>
                                <InputNumber
                                    prop={{
                                        title: "Номер канала",
                                        value: numberAsr,
                                    }}
                                    onChange={handleInputChangeNumberAsr}
                                />
                            </Col>
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
                    </Form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={() => saveNewData()}>
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CardMeterEditModal;
