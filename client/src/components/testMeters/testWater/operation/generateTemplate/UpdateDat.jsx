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

const UpdateDat = ({
    objectBuildId,
    selectedSection,
    selectedKdl,
    stateTextMain,
}) => {
    // Это массив с показаниями из БД
    const { timeForArr, arrSum } = generateObject(stateTextMain);
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
        let editedMain = [...arrSum];
        updateArray(arrSum, arrSum2);

        setStateTextEdit(JSON.stringify(editedMain));
    };

    function updateArray(arrMain, arrTwo) {
        arrMain.forEach((obj1) => {
            // перебираем все объекты в arr1
            const key = Object.keys(obj1)[0]; // получаем ключ первого (и единственного) свойства объекта
            const obj2 = arrTwo.find((item) => item.hasOwnProperty(key)); // ищем объект в arr2 с тем же ключом
            if (obj2) {
                obj1[key] += obj2[key]; // обновляем значение ключа в объекте из arr1
            }
        });
    }

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
