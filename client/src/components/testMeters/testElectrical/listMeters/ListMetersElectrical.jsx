import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllElectricalMeters,
    getMetersByNumberFlat,
    getOneElectricalMeter,
    setCurrentPage,
} from "../../../../features/testMeters/testElectricalMeterSlice";
import { deleteElectricalMeter } from "../../../../http/electricalMeterApi";
import { useAppSelector } from "../../../../shared/hooks";
import ListMeters from "../../../repeat/listMetersCard/ListMeters";
import Pages from "../../../repeat/pagination/Pages";

const ListMetersElectrical = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { id: userId } = useAppSelector((state) => state.user.user);
    const cardMeter = useSelector((state) => state.electricalMeter.mainTable);
    const [searchValue, setSearchValue] = useState("");
    const { currentPage, limit, perPage, totalCount } = useSelector(
        (state) => state.electricalMeter
    );

    const paginationObject = {
        limit,
        currentPage,
        totalCount,
    };

    const formQuery = {
        userId,
        limit,
        currentPage,
        objectBuildId,
    };
    const handleClick = (page) => {
        dispatch(setCurrentPage(page));
    };
    // Функция для редактирования данных в карточке
    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneElectricalMeter({ formData })).then((d) => {
                dispatch(getAllElectricalMeters({ formQuery }));
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
                await deleteElectricalMeter({ id }).then((d) => {
                    dispatch(getAllElectricalMeters({ formQuery }));
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Функция для поиска
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
            dispatch(getAllElectricalMeters({ formQuery }));
        } catch (e) {
            console.log(e);
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

export default ListMetersElectrical;
