import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ListMeters from "../../../repeat/listMetersCard/ListMeters";
import Pages from "../../../repeat/pagination/Pages";
import {
    getAllHeatMeter,
    getMetersByNumberFlat,
    getOneHeatMeter,
} from "../../../../features/testMeters/testHeatMeterSlice";
import { setCurrentPage } from "../../../../features/testMeters/testHeatMeterSlice";
import { deleteHeatMeter } from "../../../../http/heatMeterApi";

const ListMeterHeat = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { id: userId } = useSelector((state) => state.users.user);
    const cardMeter = useSelector((state) => state.heatMeter.mainTable);
    const [searchValue, setSearchValue] = useState("");
    const { currentPage, limit } = useSelector((state) => state.heatMeter);
    const { perPage } = useSelector((state) => state.heatMeter);
    const { totalCount } = useSelector((state) => state.heatMeter);

    // Создаём объект для передачи данных для пагинации
    const paginationObject = {
        limit,
        currentPage,
        totalCount,
    };

    const formQuery = {
        userId,
        objectBuildId,
        limit,
        currentPage,
    };

    const handleClick = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneHeatMeter({ formData })).then((d) => {
                dispatch(getAllHeatMeter({ formQuery }));
                handleClose();
            });
        } catch (e) {
            console.log(e);
        }
    };
    // Функция для удаления счётчика
    const handleClickDel = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Вы уверены что хотите удалить этот счётчик?"
            );
            if (confirmDelete) {
                await deleteHeatMeter({ id }).then((d) => {
                    dispatch(getAllHeatMeter({ formQuery }));
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleSearch = (e) => {
        const numSearch = e.target.value;
        setSearchValue(numSearch);
        const formQuery = {
            userId,
            objectBuildId,
            limit,
            currentPage,
            num: numSearch,
        };

        dispatch(getMetersByNumberFlat({ formQuery }));
    };

    useEffect(() => {
        try {
            dispatch(getAllHeatMeter({ formQuery }));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, currentPage]);

    return (
        <Row>
            <Row className="mt-3">
                <Col sm={5}>
                    <Form className="d-flex">
                        <Form.Control
                            type="number"
                            placeholder="Поиск квартиры"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => handleSearch(e)}
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <ListMeters
                    listCards={cardMeter}
                    objectId={objectBuildId}
                    handleClickForEdit={handleClickForEdit}
                    handleClickDel={handleClickDel}
                />
            </Row>
            <Row className="m-3 ">
                <Col>
                    <Pages {...paginationObject} clickAction={handleClick} />
                </Col>
            </Row>
        </Row>
    );
};

export default ListMeterHeat;
