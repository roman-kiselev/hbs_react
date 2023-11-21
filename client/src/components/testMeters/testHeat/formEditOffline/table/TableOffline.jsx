import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import CardMeterEditModalOffline from "../../../../../shared/ui/modals/CardMeterEditModalOffline";
import editRecordById from "../../db/service/editRecordById";

const TableOffline = ({ data, handleUpdateMeter }) => {
    const [show, setShow] = useState(false);
    const [selectedMeter, setSelectedMeter] = useState(null);
    const handleClose = () => {
        setSelectedMeter(null);
        setShow(false);
    };
    const handleShow = (data) => {
        setSelectedMeter(data);
        setShow(true);
    };

    const handleClickForEdit = (formData, handleClose) => {
        const response = editRecordById(formData.idIndex, formData);
        handleClose();
    };

    return (
        <>
            <Table striped bordered hover size="sm">
                {data !== undefined && data.length > 0 ? (
                    <thead>
                        <tr style={{ fontSize: "12px" }}>
                            <th>№Секц.</th>
                            <th>№Эт.</th>
                            <th>№Лин.</th>
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
                                <td>{meter.line}</td>
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
                    handleClickForEdit={handleClickForEdit}
                />
            )}
        </>
    );
};

export default TableOffline;
