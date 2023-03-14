import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllElectricalMeters,
    getOneElectricalMeter,
    setCurrentPage,
} from "../../../../features/testMeters/testElectricalMeterSlice";
import ListMeters from "../../../repeat/listMetersCard/ListMeters";
import Pages from "../../../repeat/pagination/Pages";

const ListMetersElectrical = ({ id: objectBuildId }) => {
    const dispatch = useDispatch();
    const { id: userId } = useSelector((state) => state.users.user);
    const cardMeter = useSelector((state) => state.electricalMeter.mainTable);

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

    useEffect(() => {
        try {
            dispatch(getAllElectricalMeters({ formQuery }));
        } catch (e) {
            console.log(e);
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

export default ListMetersElectrical;
