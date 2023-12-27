import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TestAlertAddMeters from "../../../../components/addMeters/bolid/alerts/TestAlertAddMeters";
import { mainTableDb } from "../../../../shared/db";
import { createWaterBulkMeter } from "../../../../shared/db/mainTable/serviceMainTableDbWater";
import useNumber from "../../../../shared/hooks/useNumber";
import { getAllChannel } from "../../../../shared/models/devices/DeviceSlice";
import {
    createTestMeter,
    getAllMetersByUserAndObject,
} from "../../../../shared/models/testMeterWater/testWaterMeterSlice";
import InputNumber from "../../../../shared/ui/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../../shared/ui/inputs/inputsNumber/InputNumberFloating";
import InputNumberSelected from "../../../../shared/ui/inputs/inputsNumber/InputNumberSelected";

const TestFormCoolHotMeterBolid = ({ id }) => {
    const { id: objectBuildId } = useParams();
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

    const [selectObject, setSelectObject, handleInputChangeSelectObject] =
        useNumber("flat");

    mainTableDb.open();

    // Прибавляем канал
    const addChannelHot = (e) => {
        setChannelCool(e.target.value);
        setChannelHot(Number(e.target.value) + 1);
    };

    // Создаём ref для того что бы после нажатия проставилась фокусировка
    const inputRef = React.useRef(null);

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
            flat: selectObject === "flat" ? flat : 0,
            office: selectObject === "office" ? flat : 0,
            kdl: kdl,
            channelCool: channelCool,
            channelHot: channelHot,
            numberMeterCool: numberMeterCool,
            numberMeterHot: numberMeterHot,
            sumMeterCool: sumMeterCool,
            sumMeterHot: sumMeterHot,
            userId: userId,
            objectId: objectBuildId,
        };
        // В форму передаём
        const formQuery = { userId, objectBuildId: objectBuildId };

        const setNewAlert = () => {
            setAlertAdd(false);
        };
        inputRef.current.focus();

        dispatch(createTestMeter({ dataWith })).then((d) => {
            dispatch(getAllMetersByUserAndObject({ formQuery }));
            setNumberMeterCool("");
            setNumberMeterHot("");
            setSumMeterCool("");
            setSumMeterHot("");
            setChannelCool("");
            setChannelHot("");
            setFlat("");
            setAlertAdd(true);
            // Уведомление о добавлении
            setTimeout(setNewAlert, 2000);
            dispatch(
                getAllChannel({
                    objectId: objectBuildId,
                    numberKdl: kdl,
                })
            );
        });
    };

    const addMetersInDb = async (e) => {
        e.preventDefault();
        const data = {
            section: section,
            floors: floors,
            flat: selectObject === "flat" ? flat : 0,
            office: selectObject === "office" ? flat : 0,
            kdl: kdl,
            channelCool: channelCool,
            channelHot: channelHot,
            numberMeterCool: numberMeterCool,
            numberMeterHot: numberMeterHot,
            sumMeterCool: sumMeterCool,
            sumMeterHot: sumMeterHot,
            userId: userId,
            objectBuildId: objectBuildId,
        };
        const water = await createWaterBulkMeter(data);
        console.log(water);
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
                        <InputNumberSelected
                            prop={{
                                titles: [
                                    { title: "Квартира", value: "flat" },
                                    { title: "Офис", value: "office" },
                                ],
                                value: flat,
                            }}
                            value={selectObject}
                            onChangeSelect={handleInputChangeSelectObject}
                            onChangeFlat={handleInputChangeFlat}
                            inputRef={inputRef}
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
                            // onClick={(e) => addMetersInDb(e)}
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
