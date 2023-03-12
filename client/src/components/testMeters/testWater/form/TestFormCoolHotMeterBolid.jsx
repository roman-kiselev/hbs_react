import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createTestMeter,
    getAllMetersByUserAndObject,
} from "../../../../features/testMeters/testWaterMeterSlice";
import TestAlertAddMeters from "../../../addMeters/bolid/alerts/TestAlertAddMeters";
import useNumber from "../../../hooks/useNumber";
import InputNumber from "../../../repeat/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../repeat/inputs/inputsNumber/InputNumberFloating";

const TestFormCoolHotMeterBolid = ({ id }) => {
    const dispatch = useDispatch();
    // Состояние форм

    const [section, setSection, handleInputChangeSection] = useNumber("");
    const [floors, setFloors, handleInputChangeFloors] = useNumber("");
    const [flat, setFlat, handleInputChangeFlat] = useNumber("");
    const [kdl, setKdl, handleInputChangeKdl] = useNumber("");
    const [channelCool, setChannelCool, handleInputChangeChannelCool] =
        useNumber("");
    const [channelHot, setChannelHot, handleInputChangeChannelHot] =
        useNumber("");
    const [
        numberMeterCool,
        setNumberMeterCool,
        handleInputChangeNumberMeterCool,
    ] = useNumber("");
    const [numberMeterHot, setNumberMeterHot, handleInputChangeNumberMeterHot] =
        useNumber("");
    const [sumMeterCool, setSumMeterCool, handleInputChangeSumMeterCool] =
        useNumber("");
    const [sumMeterHot, setSumMeterHot, handleInputChangeSumMeterHot] =
        useNumber("");

    // Прибавляем канал
    const addChannelHot = (e) => {
        setChannelCool(e.target.value);
        setChannelHot(Number(e.target.value) + 1);
    };

    // Состояние уведомлений
    const [alertAdd, setAlertAdd] = useState(false);
    // Создаём массив для проверки перед отправкой данных на сервер
    const arrForCheck = [
        section,
        floors,
        flat,
        kdl,
        channelCool,
        channelHot,
        numberMeterCool,
        numberMeterHot,
        sumMeterCool,
        sumMeterHot,
    ];
    // Фукнция для отправки данных на сервер
    // Если значения в массиве не пустые, то отправляем данные на сервер
    const checkData = () => {
        if (arrForCheck.every((item) => item !== "")) {
            return false;
        } else {
            return true;
        }
    };
    // Достаём id пользователя
    const { id: userId } = useSelector((state) => state.users.user);
    // Достаём добавленные счётчики
    const { lastMeters } = useSelector((state) => state.mainTable);

    // Данные для добавления
    const addMeter = (e) => {
        e.preventDefault();
        const dataWith = {
            section: section,
            floors: floors,
            flat: flat,
            kdl: kdl,
            channelCool: channelCool,
            channelHot: channelHot,
            numberMeterCool: numberMeterCool,
            numberMeterHot: numberMeterHot,
            sumMeterCool: sumMeterCool,
            sumMeterHot: sumMeterHot,
            userId: userId,
            objectId: id,
        };
        // В форму передаём
        const formQuery = { userId, objectId: id };

        const setNewAlert = () => {
            setAlertAdd(false);
        };

        dispatch(createTestMeter({ dataWith })).then((d) => {
            dispatch(getAllMetersByUserAndObject({ formQuery }));
            setNumberMeterCool("");
            setNumberMeterHot("");
            setSumMeterCool("");
            setSumMeterHot("");
            setAlertAdd(true);
            // Уведомление о добавлении
            setTimeout(setNewAlert, 2000);
        });
    };

    return (
        <Row>
            <Form>
                <Row>
                    <Col>
                        <InputNumber
                            prop={{ title: "Секции", value: section }}
                            onChange={handleInputChangeSection}
                        />
                    </Col>
                    <Col>
                        <InputNumber
                            prop={{ title: "Этаж", value: floors }}
                            onChange={handleInputChangeFloors}
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
                            prop={{ title: "КДЛ", value: kdl }}
                            onChange={handleInputChangeKdl}
                        />
                    </Col>

                    <Row className="m-2">
                        <Col
                            className="col-sm-6 text-center"
                            style={{
                                border: "1px solid grey",
                                borderRadius: 10,
                            }}
                        >
                            <h5>ХВС</h5>
                            <Col>
                                <InputNumber
                                    prop={{
                                        title: "Номер Канала",
                                        value: channelCool,
                                    }}
                                    onChange={addChannelHot}
                                />
                            </Col>

                            <InputNumber
                                prop={{
                                    title: "Номер счётчика",
                                    value: numberMeterCool,
                                }}
                                onChange={handleInputChangeNumberMeterCool}
                            />
                            <InputNumber
                                prop={{
                                    title: "Показания",
                                    value: sumMeterCool,
                                }}
                                onChange={handleInputChangeSumMeterCool}
                            />
                        </Col>

                        <Col
                            className="col-12 col-sm-6 text-center"
                            style={{
                                border: "1px solid grey",
                                borderRadius: 10,
                            }}
                        >
                            <h5>ГВС</h5>
                            <Col>
                                <InputNumber
                                    prop={{
                                        title: "Номер Канала",
                                        value: channelHot,
                                        disabled: true,
                                    }}
                                    onChange={handleInputChangeChannelHot}
                                />
                            </Col>

                            <InputNumber
                                prop={{
                                    title: "Номер Счётчика",
                                    value: numberMeterHot,
                                }}
                                onChange={handleInputChangeNumberMeterHot}
                            />

                            <InputNumberFloating
                                prop={{
                                    title: "Показания",
                                    value: sumMeterHot,
                                }}
                                onChange={handleInputChangeSumMeterHot}
                            />
                        </Col>
                    </Row>
                </Row>

                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => addMeter(e)}
                            disabled={checkData()}
                        >
                            Добавить
                        </Button>
                    </Col>
                    <Row className="fixed-top justify-content-end mt-3">
                        <Col className="col-sm-3">
                            <Row>
                                {alertAdd ? (
                                    lastMeters.data.map((meter) => (
                                        <TestAlertAddMeters
                                            key={meter.id}
                                            alertAdd={alertAdd}
                                            {...meter}
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Row>
    );
};

export default TestFormCoolHotMeterBolid;
