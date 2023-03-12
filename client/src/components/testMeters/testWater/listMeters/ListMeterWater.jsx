import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllMetersByUserAndObject } from "../../../../features/testMeters/testWaterMeterSlice";
import ListMeters from "../../../repeat/listMetersCard/ListMeters";
import Pages from "../../../repeat/pagination/Pages";
import { useQuery } from "react-query";

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

    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({ formQuery }));
    }, [dispatch, currentPage]);

    return (
        <Row>
            <Row>
                <ListMeters listCards={cardMeter} objectId={objectBuildId} />
            </Row>
            <Row className="m-3 ">
                <Col>
                    <Pages {...paginationObject} />
                </Col>
            </Row>
        </Row>
    );
};

export default ListMeterWater;
