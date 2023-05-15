import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import CardMeterEditModalOffline from "../../../../repeat/modals/CardMeterEditModalOffline";

const TableOffline = ({ data, handleUpdateMeter }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        console.log(data);
        setSelectedMeter(data);
        setShow(true);
    };
    const [selectedMeter, setSelectedMeter] = useState(null);

    return (
        <>
            <Table striped bordered hover size="sm">
                {data !== undefined && data.length > 0 ? (
                    <thead>
                        <tr style={{ fontSize: "12px" }}>
                            <th>№Секц.</th>
                            <th>№Эт.</th>
                            <th>№Счётчика</th>
                            <th>№Кв</th>
                            <th>Ред</th>
                        </tr>
                    </thead>
                ) : (
                    <></>
                )}
                <tbody>
                    {data !== undefined && data.length > 0 ? (
                        data.map((meter) => (
                            <tr key={meter.id}>
                                <td>{meter.section}</td>
                                <td>{meter.floor}</td>
                                <td>{meter.numberMeter}</td>
                                <td>{meter.flat}</td>
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
                    handleClickForEdit={() =>
                        handleUpdateMeter(selectedMeter, handleClose)
                    }
                />
            )}
        </>
    );
};

export default TableOffline;
