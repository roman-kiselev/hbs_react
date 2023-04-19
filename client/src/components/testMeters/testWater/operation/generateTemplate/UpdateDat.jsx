import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { VscJson } from "react-icons/vsc";

const generateObject = (value) => {
    let timeForArr = "";
    let arrSum = [];
    const isEmpty = Object.keys(value).length === 0;
    if (!isEmpty) {
        // Присваиваем массив показаний

        timeForArr = JSON.parse(value);
        arrSum = JSON.parse(value).Показания;
    } else {
        return {};
    }

    return {
        timeForArr,
        arrSum,
    };
};

// Поиск по ключу в массиве с объектами
const findKey = (arrOne, key) => {
    let result = arrOne.find((item) => item.hasOwnProperty(key));
    if (result) {
        return result[key];
    } else {
        return 0;
    }
};
// Функция для массива
const findIndex = (arrOne, arrTwo) => {
    let x = arrOne.map((a) => {
        let key = Object.keys(a)[0];
        let value = a[key];
        let valueTwo = findKey(arrTwo, key);

        return { [key]: (a[key] += valueTwo).toFixed(2) };
    });

    return x;
};

function updateArray(arrMain, arrTwo) {
    let finishArr = findIndex(arrMain, arrTwo);

    return finishArr;
}

const UpdateDat = ({
    objectBuildId,
    selectedSection,
    selectedKdl,
    stateTextMain,
}) => {
    // Это массив с показаниями из БД
    const { timeForArr, arrSum: arrSumMain } = generateObject(stateTextMain);
    // Состояние текстового поля
    const [stateText, setStateText] = React.useState("");
    // Состояние отредактированного поля
    const [stateTextEdit, setStateTextEdit] = React.useState("");
    // Выполняем те же действия с массивом других показаний
    let timeForArr2;
    let arrSum2;

    const handleStateText = (e) => {
        setStateText(e.target.value);
    };

    // Функция принимает 2 массива
    // Далее пробегается по массиву показаний
    // И изменяем первый массив
    const handleChangeText = () => {
        const { timeForArr, arrSum } = generateObject(stateText);
        timeForArr2 = timeForArr;
        arrSum2 = arrSum;

        const finishArr = updateArray(arrSum2, arrSumMain);

        setStateTextEdit(JSON.stringify(finishArr));
    };

    return (
        <Row>
            <Row>
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="Прибавить мои показания к полученным"
                    />
                </Col>
                <Col>
                    <Form.Check type="checkbox" label="Заменить показания" />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={12}>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Введите текст из файла .dat</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                value={stateText}
                                onChange={(e) => handleStateText(e)}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Col sm={3}>
                <Button variant="secondary" onClick={() => handleChangeText()}>
                    Изменить <VscJson color="black" /> .dat
                </Button>
            </Col>
            <Row className="mt-3">
                <Col sm={12}>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Введите текст из файла .dat</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                disabled={true}
                                value={stateTextEdit}
                                onChange={(e) =>
                                    setStateTextEdit(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Row>
    );
};

export default UpdateDat;
