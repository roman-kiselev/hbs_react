import React, { useState } from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNumberMeter } from "../../../../shared/hooks";
import useFloatingNumber from "../../../../shared/hooks/useFloatingNumber";
import useNumber from "../../../../shared/hooks/useNumber";
import {
    createTestHeatMeter,
    getAllHeatMeter,
} from "../../../../shared/models";
import InputNumber from "../../../../shared/ui/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../../shared/ui/inputs/inputsNumber/InputNumberFloating";
import InputNumberSelected from "../../../../shared/ui/inputs/inputsNumber/InputNumberSelected";
import TestAlertAddHeatMeters from "../../../addMeters/bolid/alerts/TestAlertAddHeatMeters";

const TestFormHeatMeter = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();

    const [section, setSection, handleInputChangeSection] = useNumber("");
    const [floor, setFloor, handleInputChangeFloor] = useNumber("");
    const [flat, setFlat, handleInputChangeFlat] = useNumber("");
    const [line, setLine, handleInputChangeLine] = useNumber("");
    const [
        numberMeter,
        setNumberMeter,
        handleInputChangeNumberMeter,
        statusMeter,
        dataMeter,
    ] = useNumberMeter("", objectBuildId, "heat");
    const [sumMeter, setSumMeter, handleInputChangeSumMeter] =
        useFloatingNumber("");

    const [selectObject, setSelectObject] = useState("flat");

    const [comment, setComment] = useState("");
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
            comment,
            objectBuildId,
            userId,
        };

        inputRef.current.focus();
        console.log(dataMeter);

        dispatch(createTestHeatMeter({ dataMeter })).then((d) => {
            dispatch(getAllHeatMeter({ formQuery }));
            setAlertAdd(true);
            setFlat("");
            setNumberMeter("");
            setComment("");
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
                            onChangeSelect={setSelectObject}
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
                            {dataMeter ? (
                                <Badge bg="danger">
                                    Номер счётчика уже существует
                                </Badge>
                            ) : null}
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
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Комментарий</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
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
