import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ListMeters from "../../../repeat/listMetersCard/ListMeters";
import Pages from "../../../repeat/pagination/Pages";
import {
    getAllHeatMeter,
    getOneHeatMeter,
} from "../../../../features/testMeters/testHeatMeterSlice";
import { setCurrentPage } from "../../../../features/testMeters/testHeatMeterSlice";

const ListMeterHeat = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { id: userId } = useSelector((state) => state.users.user);
    const cardMeter = useSelector((state) => state.heatMeter.mainTable);

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
    useEffect(() => {
        try {
            dispatch(getAllHeatMeter({ formQuery }));
        } catch (error) {
            console.log(error);
        }
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

export default ListMeterHeat;
