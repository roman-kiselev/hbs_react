import { useState } from "react";
import { Button, Form, Row, Spinner, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deskApi } from "../../../shared/api/desk";
import { getOneMeter } from "../../../shared/models/testMeterWater/testWaterMeterSlice";
import CardMeterEditModal from "../../../shared/ui/modals/CardMeterEditModal";

const DeskTable = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [selectState, setSelectState] = useState("check");
    // const { data } = deskApi.useGetAllQuery(id);
    const { data, status, refetch } = dispatch(
        deskApi.endpoints.getAll.initiate(id)
    );
    const [deltem, { data: dataDel }] = deskApi.useDeleteMutation();

    const [selectedMeter, setSelectedMeter] = useState(null);
    const [show, setShow] = useState(false);
    const { listDesk, isLoading } = useSelector((store) => store.desk);
    const handleClose = () => {
        setShow(false);
        setSelectedMeter(null);
    };
    const [changeStatusOneItem, { data: dataChangeStatus }] =
        deskApi.useChangeStatusMutation();
    const handleShow = (data) => {
        setSelectedMeter(data);
        setShow(true);
    };

    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneMeter({ formData })).then((d) => {
                refetch();
                handleClose();
            });
        } catch (e) {
            console.log(e);
        }
    };

    const changeStatus = (id, e) => {
        const currentValue = e.target.value;
        setSelectState(currentValue);
        changeStatusOneItem({ id, status: currentValue });
        refetch();
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
                <Table bordered hover responsive style={{ fontSize: 12 }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Секция</th>
                            <th>Этаж</th>
                            <th>КВ</th>
                            <th>№</th>
                            <th>Статус</th>
                            <th>Ред</th>
                            <th>Удаление</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listDesk?.map((item, index) => (
                            <>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.main_meter.section}</td>
                                    <td>{item.main_meter.floor}</td>
                                    <td>{item.main_meter.flat}</td>

                                    <td>{item.main_meter.numberMeter}</td>
                                    <td>
                                        <Form.Select
                                            size="sm"
                                            defaultValue={item.status}
                                            onChange={(e) =>
                                                changeStatus(item.id, e)
                                            }
                                        >
                                            <option value="ready">
                                                Выполнен
                                            </option>
                                            <option value="check">
                                                Проверка
                                            </option>
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleShow(item.main_meter)
                                            }
                                            size="sm"
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <AiFillDelete
                                            size={30}
                                            color="red"
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            onClick={() => deltem(item.id)}
                                        />
                                    </td>
                                </tr>
                                {item.main_meter.comment && (
                                    <tr
                                        style={{
                                            backgroundColor: "lightgreen",
                                        }}
                                    >
                                        <td colSpan={8}>
                                            {item.main_meter.comment && (
                                                <p>{item.main_meter.comment}</p>
                                            )}
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </Table>
            )}
        </Row>
    );
};

export default DeskTable;
