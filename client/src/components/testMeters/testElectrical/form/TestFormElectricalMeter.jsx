import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import InputNumber from "../../../repeat/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../repeat/inputs/inputsNumber/InputNumberFloating";
import useNumber from "../../../hooks/useNumber";
import { useDispatch, useSelector } from "react-redux";
import AlertMeters from "../../../repeat/alert/AlertMeters";
import {
    createTestElectricalMeter,
    getAllElectricalMeters,
} from "../../../../features/testMeters/testElectricalMeterSlice";

const TestFormElectricalMeter = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const [section, setSection, handleInputChangeSection] = useNumber("");
    const [floor, setFloor, handleInputChangeFloor] = useNumber("");
    const [flat, setFlat, handleInputChangeFlat] = useNumber("");
    const [line, setLine, handleInputChangeLine] = useNumber("");
    const [numberMeter, setNumberMeter, handleInputChangeNumberMeter] =
        useNumber("");
    const [sumMeter, setSumMeter, handleInputChangeSumMeter] = useNumber("");

    // Состояние уведомлений
    const [alertAdd, setAlertAdd] = useState(false);
    // Создаём массив для проверки перед отправкой данных на сервер
    const arrForCheck = [section, floor, flat, line, numberMeter, sumMeter];

    // Достаём userId
    const { id: userId } = useSelector((state) => state.users.user);

    const checkData = () => {
        if (arrForCheck.every((item) => item !== "")) {
            return false;
        } else {
            return true;
        }
    };

    // В форму передаём
    const formQuery = { userId, objectBuildId };

    const { lastMeters } = useSelector((state) => state.electricalMeter);

    const addMeter = (e) => {
        e.preventDefault();

        const dataMeter = {
            userId,
            objectBuildId,
            section,
            floor,
            flat,
            line,
            numberMeter,
            sumMeter,
        };

        dispatch(createTestElectricalMeter({ dataMeter })).then((d) => {
            dispatch(getAllElectricalMeters({ formQuery }));
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
                        <InputNumber
                            prop={{ title: "Квартира", value: flat }}
                            onChange={handleInputChangeFlat}
                        />
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
                                    <AlertMeters
                                        key={lastMeters.id}
                                        alertAdd={alertAdd}
                                        meterData={lastMeters}
                                    />
                                ) : null}
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Row>
    );
};

export default TestFormElectricalMeter;
