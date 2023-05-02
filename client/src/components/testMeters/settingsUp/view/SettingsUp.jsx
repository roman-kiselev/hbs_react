import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMeters } from "../../../../http/waterMeterApi";

const getAndSetMeters = async (id, setData) => {
    const { meters } = await getMeters(id);
    setData(meters);
};

const SettingsUp = () => {
    const dispatch = useDispatch();
    const [metersList, setMetersList] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getAndSetMeters(id, setMetersList);
    }, []);

    console.log(metersList);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Номер квартиры</th>
                    <th>Номер КДЛ</th>
                    <th>Номер Канала</th>
                    <th>Тип счётчика</th>
                    <th>Номер счётчика</th>
                    <th>Функции</th>
                </tr>
            </thead>
            <tbody>
                {metersList.map((meter, item) => {
                    return (
                        <tr key={meter.id}>
                            <td>{item + 1}</td>
                            <td>{meter.flat}</td>
                            <td>{meter.numberKdl}</td>
                            <td>{meter.numberAsr}</td>
                            <td>{meter.typeMeter}</td>
                            <td>{meter.numberMeter}</td>
                            <td>Пусто</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default SettingsUp;
