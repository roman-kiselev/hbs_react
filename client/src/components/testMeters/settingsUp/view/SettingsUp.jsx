import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    OverlayTrigger,
    Row,
    Table,
    Tooltip,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getChangeTable,
    getMeters,
    sincMeters,
} from "../../../../http/waterMeterApi";

const getAndSetMeters = async (id, setData) => {
    const { metersChange } = await getChangeTable(id);

    setData(metersChange);
};

const SettingsUp = () => {
    const dispatch = useDispatch();
    const [metersList, setMetersList] = useState([]);
    const { id } = useParams();

    const statusState = [
        "Работает",
        "Не работает",
        "Отключен",
        "Не определен",
        "Проблемы связи",
        "Села батарея",
    ];

    const handleOptionChange = (e) => {
        console.log(e.target.value);
    };

    useEffect(() => {
        getAndSetMeters(id, setMetersList);
    }, []);

    //console.log(metersList);
    const handleClick = async () => {
        try {
            console.log("Click");
            sincMeters(id);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Tooltip on <strong>Top</strong>.
                            </Tooltip>
                        }
                    >
                        <Button variant="secondary" onClick={handleClick}>
                            Синхронизировать c основной таблицей
                        </Button>
                    </OverlayTrigger>
                </Col>
            </Row>
            <Row className="mt-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>№ квартиры</th>
                            <th>№ КДЛ</th>
                            <th>№ Канала</th>
                            <th>Тип счётчика</th>
                            <th>№ счётчика</th>
                            <th>Статус</th>
                            <th>Была замена?</th>
                            <th>Комментарий</th>
                            <th>Функции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metersList.map((meter, item) => {
                            const { main_meter } = meter;

                            return (
                                <tr
                                    style={{
                                        backgroundColor:
                                            meter.status === "Работает"
                                                ? "#99FF99"
                                                : "red",
                                    }}
                                    key={meter.id}
                                >
                                    <td>{item + 1}</td>
                                    <td>{main_meter.flat}</td>
                                    <td>{main_meter.numberKdl}</td>
                                    <td>{main_meter.numberAsr}</td>
                                    <td>
                                        {main_meter.typeMeter ===
                                        "Счётчик горячей воды"
                                            ? "ГВС"
                                            : "ХВС"}
                                    </td>
                                    <td>{main_meter.numberMeter}</td>
                                    <td>
                                        <Form.Select
                                            value={
                                                statusState[main_meter.status]
                                            }
                                            onChange={handleOptionChange}
                                        >
                                            {statusState.map((status) => (
                                                <option key={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: meter.replacement
                                                ? "#FF6633"
                                                : "#66CC00",
                                        }}
                                    >
                                        {meter.replacement ? "Да" : "Нет"}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: meter.comment
                                                ? "#66CC00"
                                                : "#FF6633",
                                        }}
                                    >
                                        {meter.comment ? "Есть" : "Нет"}
                                    </td>
                                    <td>Меню</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default SettingsUp;
