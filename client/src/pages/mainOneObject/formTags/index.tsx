import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useInput } from "../../../shared/hooks";

interface CheckboxState {
    floor: number;
    checked: boolean;
}

interface ITagPrint {
    kdl: string;
    section: string;
    channel: string;
    floor: string;
}

interface IForm {
    section: number;
    floor: number;
    arrFloors: CheckboxState[];
    checkYesFloor: boolean;
    meters: number;
    kdl: number;
}
const findFloor = (arr: CheckboxState[], num: number) => {
    let bool = false;
    arr.map(({ floor, checked }) => {
        if (floor === num && checked) {
            bool = true;
        }
    });
    return bool;
};
const formArr = (dataForm: IForm) => {
    const { section, kdl, arrFloors, floor, checkYesFloor, meters } = dataForm;

    const x: ITagPrint[] = [];
    let n: number = 0;

    arrFloors.map((item) => {
        const { floor, checked } = item;
        if (checked) {
            for (let i = 0; i < meters; i++) {
                n = n + 1;

                x.push({
                    kdl: `КДЛ ${kdl}`,
                    channel: `Канал ${n}`,
                    section: `Секция ${section}`,
                    floor: `Этаж ${floor}`,
                });
            }
        }
    });

    return x;
};

const findAndEditArr = (arr: CheckboxState[], num: number) => {
    const newArr: CheckboxState[] = arr.map(({ floor, checked }) => {
        if (floor === num) {
            return {
                floor: floor,
                checked: !checked,
            };
        }
        return {
            floor: floor,
            checked: checked,
        };
    });
    return newArr;
};

const FormTags = () => {
    // Секции
    const [section, setSection] = useInput(0);
    const [floor, setFloor] = useInput(0);
    const [arrFloors, setArrFloors] = useState<CheckboxState[]>([]);
    const [check, setCheck] = useState(false);
    const [checkYesFloor, setCheckYesFloor] = useState<boolean>(false);
    const [meters, setMeters] = useInput<number>(0);
    const [kdl, setKdl] = useInput<number>(0);

    const [tag, setTag] = useState<ITagPrint[]>([]);

    const handleYesFloor = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setCheckYesFloor(value);
        let arr: CheckboxState[] = [];
        if (floor > 0) {
            for (let i = 0; i < floor; i++) {
                arr.push({
                    floor: i + 1,
                    checked: true,
                });
            }
        }
        setArrFloors(arr);
    };

    const handleCheckBox = (
        e: ChangeEvent<HTMLInputElement>,
        floor: number
    ) => {
        // Найдём и изменим check
        const arr: CheckboxState[] = findAndEditArr(arrFloors, floor);
        setArrFloors(arr);
    };

    const handleChangeFloor = (e: ChangeEvent<HTMLInputElement>) => {
        setFloor(e);
        const newFloor: number = Number(e.target.value);
        let arr: CheckboxState[] = [];
        if (newFloor > 0) {
            for (let i = 0; i < newFloor; i++) {
                arr.push({
                    floor: i + 1,
                    checked: true,
                });
            }
        }

        setArrFloors(arr);
    };

    const handleTest = () => {
        const data: IForm = {
            arrFloors,
            floor,
            meters,
            kdl,
            checkYesFloor,
            section,
        };

        const arrTag = formArr(data);
        setTag(arrTag);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Номер секции</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        value={section}
                                        onChange={setSection}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Количество этажей</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        value={floor}
                                        onChange={handleChangeFloor}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>Есть незанятые этажи?</Form.Label>
                                <Form.Check
                                    type={"checkbox"}
                                    id={`default-${"checkbox"}`}
                                    label={`Да`}
                                    checked={checkYesFloor}
                                    onChange={handleYesFloor}
                                />
                            </Col>
                        </Row>
                        <Row>
                            {checkYesFloor
                                ? arrFloors.map((floor) => (
                                      <Col key={floor.floor}>
                                          <Form.Check
                                              type={"checkbox"}
                                              id={`default-${"checkbox"}`}
                                              label={floor.floor}
                                              checked={floor.checked}
                                              onChange={(e) =>
                                                  handleCheckBox(e, floor.floor)
                                              }
                                          />
                                      </Col>
                                  ))
                                : null}
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Счётчиков на этаже</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        value={meters}
                                        onChange={setMeters}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Номер КДЛ</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        value={kdl}
                                        onChange={setKdl}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={() => handleTest()}
                                >
                                    Сформировать Бирки
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="primary">
                                    Сформировать для загрузки
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    {tag.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>КДЛ</th>
                                    <th>Канал</th>
                                    <th>Секция</th>
                                    <th>Этаж</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tag.map((t, index) => (
                                    <tr key={index}>
                                        <td>{t.kdl}</td>
                                        <td>{t.channel}</td>
                                        <td>{t.section}</td>
                                        <td>{t.floor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : null}
                </Row>
            </Container>
        </div>
    );
};

export default FormTags;
