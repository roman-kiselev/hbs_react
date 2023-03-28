import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    createTestHeatMeter,
    getAllHeatMeter,
} from "../../../../features/testMeters/testHeatMeterSlice";
import TestAlertAddHeatMeters from "../../../addMeters/bolid/alerts/TestAlertAddHeatMeters";
import useNumber from "../../../hooks/useNumber";
import InputNumber from "../../../repeat/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../repeat/inputs/inputsNumber/InputNumberFloating";
import InputNumberSelected from "../../../repeat/inputs/inputsNumber/InputNumberSelected";

const TestFormHeatMeter = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();

    const [section, setSection, handleInputChangeSection] = useNumber("");
    const [floor, setFloor, handleInputChangeFloor] = useNumber("");
    const [flat, setFlat, handleInputChangeFlat] = useNumber("");
    const [line, setLine, handleInputChangeLine] = useNumber("");
    const [numberMeter, setNumberMeter, handleInputChangeNumberMeter] =
        useNumber("");
    const [sumMeter, setSumMeter, handleInputChangeSumMeter] = useNumber("");
    const [selectObject, setSelectObject, handleInputChangeSelectObject] =
        useNumber("flat");

    // Состояние уведомлений
    const [alertAdd, setAlertAdd] = useState(false);
    // Создаём массив для проверки перед отправкой данных на сервер
    const arrForCheck = [section, floor, flat, line, numberMeter, sumMeter];
    const checkData = () => {
        if (arrForCheck.every((item) => item !== "")) {
            return false;
        } else {
            return true;
        }
    };

    // Достаём userId
    const { id: userId } = useSelector((state) => state.users.user);
    // Достаём добавленные счётчики для уведомления
    const { lastMeters } = useSelector((state) => state.heatMeter);

    // Создаём ref для того что бы после нажатия проставилась фокусировка
    const inputRef = React.useRef(null);

    // В форму передаём
    const formQuery = { userId, objectBuildId };
    // Добавляем счётчик
    const addMeter = (e) => {
        e.preventDefault();

        const dataMeter = {
            section: section,
            floor: floor,
            flat: selectObject === "flat" ? flat : 0,
            office: selectObject === "office" ? flat : 0,
            line: line,
            numberMeter: numberMeter,
            sumMeter: sumMeter,
            objectBuildId,
            userId,
        };

        inputRef.current.focus();

        dispatch(createTestHeatMeter({ dataMeter })).then((d) => {
            dispatch(getAllHeatMeter({ formQuery }));
            setAlertAdd(true);
            setFlat("");
            setNumberMeter("");
            setSumMeter("");
            setTimeout(() => {
                setAlertAdd(false);
            }, 2000);
        });
    };

    return (
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
                        {/* <InputNumber
                            prop={{ title: "Квартира", value: flat }}
                            onChange={handleInputChangeFlat}
                        /> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputNumber
                            prop={{ title: "Линия", value: line }}
                            onChange={handleInputChangeLine}
                        />
                    </Col>

                    <Row className="m-2">
                        <Col className="col-sm-6 text-center">
                            <InputNumber
                                prop={{
                                    title: "Номер счётчика",
                                    value: numberMeter,
                                }}
                                onChange={handleInputChangeNumberMeter}
                            />
                        </Col>

                        <Col className="col-12 col-sm-6 text-center">
                            <InputNumberFloating
                                prop={{ title: "Показания", value: sumMeter }}
                                onChange={handleInputChangeSumMeter}
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
                                    <TestAlertAddHeatMeters
                                        key={lastMeters.id}
                                        alertAdd={alertAdd}
                                        {...lastMeters}
                                    />
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

export default TestFormHeatMeter;
