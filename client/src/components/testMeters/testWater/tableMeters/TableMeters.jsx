import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllChannel,
    getAllKdl,
} from "../../../../features/devices/DeviceSlice";
import {
    getAllMetersByUserAndObject,
    getOneMeter,
} from "../../../../features/testMeters/testWaterMeterSlice";
import { deleteWaterMeter } from "../../../../http/waterMeterApi";
import CardMeterEditModal from "../../../repeat/modals/CardMeterEditModal";

const TableMeters = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedMeter, setSelectedMeter] = useState(null);
    const [selectedKdl, setSelectedKdl] = useState();
    useEffect(() => {
        dispatch(getAllKdl({ objectId: objectBuildId }));
    }, []);
    const { allKdl } = useSelector((store) => store.device.listKdlInobject);
    const { listChannelInKdl } = useSelector((store) => store.device);
    const changeNumberKdl = (e) => {
        setSelectedKdl(e.target.value);
        dispatch(
            getAllChannel({
                objectId: objectBuildId,
                numberKdl: e.target.value,
            })
        );
        setTableData(listChannelInKdl);
    };

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
                dispatch(getAllMetersByUserAndObject({ formQuery }));
                dispatch(
                    getAllChannel({
                        objectId: objectBuildId,
                        numberKdl: selectedKdl,
                    })
                );
                handleClose();
            });
            console.log(selectedKdl);
        } catch (e) {
            console.log(e);
        }
    };

    const handleClickDel = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Вы уверены что хотите удалить этот счётчик?"
            );
            if (confirmDelete) {
                await deleteWaterMeter({ id }).then((d) => {
                    dispatch(getAllMetersByUserAndObject({ formQuery: id }));
                    dispatch(
                        getAllChannel({
                            objectId: objectBuildId,
                            numberKdl: selectedKdl,
                        })
                    );
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Row>
                <Row className="mb-3">
                    <Col sm={5}>
                        <Form.Select
                            onChange={changeNumberKdl}
                            aria-label="Default select example"
                        >
                            <option>Выберите КДЛ</option>
                            {allKdl?.map((item) => (
                                <option
                                    key={item.numberKdl}
                                    value={item.numberKdl}
                                >
                                    {item.numberKdl}
                                </option>
                            ))}

                            {/* <option value="2">Two</option>
                        <option value="3">Three</option> */}
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr style={{ fontSize: "12px" }}>
                                <th>КДЛ</th>
                                <th>Канал</th>
                                <th>№Счётчика</th>
                                <th>Показания</th>
                                <th>№Кв.</th>
                                <th>Ред.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listChannelInKdl ? (
                                listChannelInKdl.map((meter) => (
                                    <tr key={meter.id}>
                                        <td>{meter.numberKdl}</td>
                                        <td>{meter.numberAsr}</td>
                                        <td>{meter.numberMeter}</td>
                                        <td>{meter.sumMeter}</td>
                                        <td>{meter.flat}</td>
                                        <td>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() =>
                                                            handleShow(meter)
                                                        }
                                                        size="sm"
                                                    >
                                                        Edit
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <AiFillDelete
                                                        size={30}
                                                        color="red"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            handleClickDel(
                                                                meter.id
                                                            )
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </Table>
                    {selectedMeter && (
                        <CardMeterEditModal
                            data={selectedMeter}
                            show={show}
                            handleClose={handleClose}
                            handleShow={handleShow}
                            handleClickForEdit={handleClickForEdit}
                        />
                    )}
                </Row>
            </Row>
        </>
    );
};

export default TableMeters;
