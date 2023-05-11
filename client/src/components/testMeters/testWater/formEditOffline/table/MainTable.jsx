import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Table } from "react-bootstrap";
import CardMeterEditModalOffline from "../../../../repeat/modals/CardMeterEditModalOffline";
import editRecordById from "../../db/service/editRecordById";

const editRecord = async (id, data) => {
    try {
        const response = await editRecordById(id, data);

        return response;
    } catch (e) {
        console.log(e);
    }
};

const MainTable = ({ data }) => {
    const [tableData, setTableData] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedMeter, setSelectedMeter] = useState(null);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleClose = () => {
        setShow(false);
        setSelectedMeter(null);
    };
    const handleShow = (data) => {
        setSelectedMeter(data);
        setShow(true);
    };

    const handleClickForEdit = (formData, handleClose) => {
        const response = editRecord(formData.id, formData);
        if (response) {
            handleEditData(formData);
        }
        handleClose();
    };

    const handleEditData = (newData) => {
        setTableData((data) =>
            data.map((d) => (d.id === newData.id ? newData : d))
        );
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr style={{ fontSize: "12px" }}>
                        <th>КДЛ</th>
                        <th>Канал</th>
                        <th>№Счётчика</th>
                        <th>Показания</th>
                        <th>Ред.</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData ? (
                        tableData.map((meter) => (
                            <tr key={meter.id}>
                                <td>{meter.numberKdl}</td>
                                <td>{meter.numberAsr}</td>
                                <td>{meter.numberMeter}</td>
                                <td>{meter.sumMeter}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(meter)}
                                        size="sm"
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </Table>
            {selectedMeter && (
                <CardMeterEditModalOffline
                    data={selectedMeter}
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    handleClickForEdit={handleClickForEdit}
                />
            )}
        </>
    );
};

export default MainTable;
