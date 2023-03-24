import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllMetersByUserAndObject,
    getOneMeter,
} from "../../../../features/testMeters/testWaterMeterSlice";
import ListMeters from "../../../repeat/listMetersCard/ListMeters";
import Pages from "../../../repeat/pagination/Pages";
import { useQuery } from "react-query";
import { setCurrentPage } from "../../../../features/testMeters/testWaterMeterSlice";

const ListMeterWater = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { id: userId } = useSelector((state) => state.users.user);
    // Получаем все счётчики
    const cardMeter = useSelector((state) => state.mainTable.mainTable);

    const { currentPage, limit } = useSelector((state) => state.mainTable);
    const { perPage } = useSelector((state) => state.mainTable);
    const { totalCount } = useSelector((state) => state.mainTable);
    // Отслеживаем включения чекбокса
    const [checked, setChecked] = useState(false);

    // Создаём объект для передачи данных для пагинации
    const paginationObject = {
        limit,
        currentPage,
        totalCount,
    };
    // Данные для запроса
    const formQuery = {
        userId: checked ? userId : 0,
        objectBuildId,
        limit,
        currentPage,
    };
    console.log(formQuery);
    // Устанавливаем текущую страницу
    const handleClick = (page) => {
        dispatch(setCurrentPage(page));
    };
    // Функция для редактирования одного счётчика, передаётся в модальное окно
    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneMeter({ formData })).then((d) => {
                dispatch(getAllMetersByUserAndObject({ formQuery }));
                handleClose();
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleSearch = (e) => {
        const numSearch = e.target.value;
    };
    // Функция при переключении check
    const handleChangeCheck = (e) => {
        const check = e.target.checked;
        console.log(check);
        setChecked(check);
        dispatch(getAllMetersByUserAndObject({ formQuery }));
    };

    // Получаем все счётчики
    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({ formQuery }));
    }, [dispatch, currentPage]);

    return (
        <Row>
            <Row className="mt-3">
                <Col sm={3}>
                    <Form className="d-flex">
                        <Form.Control
                            type="number"
                            placeholder="Поиск"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Col>
                <Col sm={3}>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Только мои"
                            checked={checked}
                            onChange={(e) => handleChangeCheck(e)}
                        />
                    </Form>
                </Col>
            </Row>
            <Row>
                <ListMeters
                    listCards={cardMeter}
                    objectId={objectBuildId}
                    handleClickForEdit={handleClickForEdit}
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

export default ListMeterWater;
