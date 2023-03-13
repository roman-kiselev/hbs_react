import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
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
    const cardMeter = useSelector((state) => state.mainTable.mainTable);

    const { currentPage, limit } = useSelector((state) => state.mainTable);
    const { perPage } = useSelector((state) => state.mainTable);
    const { totalCount } = useSelector((state) => state.mainTable);
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
            dispatch(getOneMeter({ formData })).then((d) => {
                dispatch(getAllMetersByUserAndObject({ formQuery }));
                handleClose();
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({ formQuery }));
    }, [dispatch, currentPage]);

    return (
        <Row>
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
