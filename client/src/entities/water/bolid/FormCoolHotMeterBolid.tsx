import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppSelector, useType } from "../../../shared/hooks";
import { InputNumber } from "../../../shared/interfaces";

const FormCoolHotMeterBolid = () => {
    // Состояние форм
    const [section, setSection, handleInputChangeSection] = useType<number>(0);
    const [floors, setFloors, handleInputChangeFloors] = useType<number>(0);
    const [flat, setFlat, handleInputChangeFlat] = useType<number>(0);
    const [kdl, setKdl, handleInputChangeKdl] = useType<number>(0);
    const [channelCool, setChannelCool, handleInputChangeChannelCool] =
        useType<number>(0);
    const [channelHot, setChannelHot, handleInputChangeChannelHot] =
        useType<number>(0);
    const [
        numberMeterCool,
        setNumberMeterCool,
        handleInputChangeNumberMeterCool,
    ] = useType<number>(0);
    const [numberMeterHot, setNumberMeterHot, handleInputChangeNumberMeterHot] =
        useType<number>(0);
    const [sumMeterCool, setSumMeterCool, handleInputChangeSumMeterCool] =
        useType<number>(0);
    const [sumMeterHot, setSumMeterHot, handleInputChangeSumMeterHot] =
        useType<number>(0);
    const [selectObject, setSelectObject, handleInputChangeSelectObject] =
        useType<string>("flat");

    // Прибавляем канал
    const addChannelHot = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannelCool(Number(e.target.value));
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
    // const checkData = () => {
    //     if (arrForCheck.every((item) => item !== "")) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // };
    // Достаём id пользователя
    const { id: userId } = useAppSelector((state) => state.user.user);
    // Достаём добавленные счётчики
    const { lastMeters } = useAppSelector((state) => state.mainTable);

    // Данные для добавления
    // const addMeter = (e) => {
    //     e.preventDefault();
    //     const dataWith = {
    //         section: section,
    //         floors: floors,
    //         flat: selectObject === "flat" ? flat : 0,
    //         office: selectObject === "office" ? flat : 0,
    //         kdl: kdl,
    //         channelCool: channelCool,
    //         channelHot: channelHot,
    //         numberMeterCool: numberMeterCool,
    //         numberMeterHot: numberMeterHot,
    //         sumMeterCool: sumMeterCool,
    //         sumMeterHot: sumMeterHot,
    //         userId: userId,
    //         objectId: id,
    //     };
    //     // В форму передаём
    //     const formQuery = { userId, objectBuildId: id };

    //     const setNewAlert = () => {
    //         setAlertAdd(false);
    //     };
    //     inputRef.current.focus();
    //     dispatch(createTestMeter({ dataWith })).then((d) => {
    //         dispatch(getAllMetersByUserAndObject({ formQuery }));
    //         setNumberMeterCool("");
    //         setNumberMeterHot("");
    //         setSumMeterCool("");
    //         setSumMeterHot("");
    //         setChannelCool("");
    //         setChannelHot("");
    //         setFlat("");
    //         setAlertAdd(true);
    //         // Уведомление о добавлении
    //         setTimeout(setNewAlert, 2000);
    //     });
    // };

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
