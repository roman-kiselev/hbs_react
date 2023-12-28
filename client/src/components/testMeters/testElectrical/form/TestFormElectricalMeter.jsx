import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useNumber from "../../../../shared/hooks/useNumber";
import {
    createTestElectricalMeter,
    getAllElectricalMeters,
} from "../../../../shared/models/testMeterElectrical/testElectricalMeterSlice";
import AlertMeters from "../../../../shared/ui/alert/AlertMeters";
import InputNumber from "../../../../shared/ui/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../../shared/ui/inputs/inputsNumber/InputNumberFloating";
import InputNumberSelected from "../../../../shared/ui/inputs/inputsNumber/InputNumberSelected";

const TestFormElectricalMeter = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { number: preNumber } = useSelector((store) => store.electricalMeter);
    const [section, setSection, handleInputChangeSection] = useNumber("");
    const [floor, setFloor, handleInputChangeFloor] = useNumber("");
    const [flat, setFlat, handleInputChangeFlat] = useNumber("");
    const [line, setLine, handleInputChangeLine] = useNumber("");

    const [numberMeter, setNumberMeter, handleInputChangeNumberMeter] =
        useNumber("");

    const [sumMeter, setSumMeter, handleInputChangeSumMeter] = useNumber("");
    const [selectObject, setSelectObject, handleInputChangeSelectObject] =
        useNumber("flat");

    const [comment, setComment] = useState("");
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
    // Создаём ref для того что бы после нажатия проставилась фокусировка
    const inputRef = React.useRef(null);

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
            flat: selectObject === "flat" ? flat : 0,
            office: selectObject === "office" ? flat : 0,
            line,
            numberMeter: `${preNumber}${numberMeter}`,
            sumMeter,
            comment,
        };
        inputRef.current.focus();
        dispatch(createTestElectricalMeter({ dataMeter })).then((d) => {
            dispatch(getAllElectricalMeters({ formQuery }));
            setAlertAdd(true);
            setFlat("");
            setNumberMeter("");
            setSumMeter("");
            setComment("");
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
                            <Row>
                                {preNumber !== "" ? (
                                    <Col md="auto">
                                        <InputNumber
                                            prop={{
                                                title: "Начальные",
                                                value: preNumber,
                                                disabled: true,
                                            }}
                                            onChange={() => {}}
                                        />
                                    </Col>
                                ) : null}
                                <Col md="auto">
                                    <InputNumber
                                        prop={{
                                            title: "Номер счётчика",
                                            value: numberMeter,
                                            defaultValue: preNumber,
                                        }}
                                        onChange={handleInputChangeNumberMeter}
                                    />
                                </Col>
                            </Row>
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
