import { useState } from "react";
import { Button, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneMeter } from "../../../shared/models/testMeterWater/testWaterMeterSlice";
import CardMeterEditModal from "../../../shared/ui/modals/CardMeterEditModal";

const DeskTableShort = ({ listDesk, isLoading, refetch }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [selectedMeter, setSelectedMeter] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setSelectedMeter(null);
    };

    const handleShow = (data) => {
        setSelectedMeter(data);
        setShow(true);
    };

    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneMeter({ formData })).then((d) => {
                handleClose();
                refetch();
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Row>
            {selectedMeter && (
                <CardMeterEditModal
                    show={show}
                    handleClose={handleClose}
                    data={selectedMeter}
                    handleClickForEdit={handleClickForEdit}
                />
            )}
            {isLoading && listDesk.length === 0 ? (
                <Spinner />
            ) : (
                <>
                    {/* <SelectBlock data={listDesk} /> */}
                    <Table
                        bordered
                        hover
                        responsive
                        style={{ fontSize: 12, marginTop: "10px" }}
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Секция</th>
                                <th>Этаж</th>
                                <th>КВ</th>
                                <th>№</th>
                                <th>Ред</th>
                                <th>Удаление</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listDesk?.map((item, index) => (
                                <>
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {item.section ? item.section : 0}
                                        </td>
                                        <td>{item.floor}</td>
                                        <td>{item.flat}</td>

                                        <td>{item.numberMeter}</td>

                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleShow(item)}
                                                size="sm"
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                        {/* <td>
                                            <AiFillDelete
                                                size={30}
                                                color="red"
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => deltem(item.id)}
                                            />
                                        </td> */}
                                    </tr>
                                    {item.comment && (
                                        <tr
                                            style={{
                                                backgroundColor: "lightgreen",
                                            }}
                                        >
                                            <td colSpan={8}>
                                                {item.comment && (
                                                    <p>{item.comment}</p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Row>
    );
};

export default DeskTableShort;
