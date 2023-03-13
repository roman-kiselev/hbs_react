import React from "react";
import { Form, Row } from "react-bootstrap";
import InputNumber from "../../../repeat/inputs/inputsNumber/InputNumber";
import InputNumberFloating from "../../../repeat/inputs/inputsNumber/InputNumberFloating";

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

export default TestFormElectricalMeter;
