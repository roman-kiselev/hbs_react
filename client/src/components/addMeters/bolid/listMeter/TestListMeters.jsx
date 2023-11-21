import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllMetersByUserAndObject } from "../../../../shared/models/testMeterWater/testWaterMeterSlice";
import Pages from "../../../../shared/ui/pagination/Pages";
import TestCardMeter from "./TestCardMeter";

const TestListMeters = ({ id: objectId }) => {
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
        objectId,
        limit,
        currentPage,
    };

    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({ formQuery }));
    }, [dispatch, currentPage]);

    return (
        <Row>
            <Row>
                {cardMeter.length !== 0 ? (
                    cardMeter.map((card) => (
                        <TestCardMeter
                            key={card.id}
                            {...card}
                            objectId={objectId}
                        />
                    ))
                ) : (
                    <p>Пока ничего нет</p>
                )}
            </Row>
            <Row className="m-3 ">
                <Col>
                    <Pages {...paginationObject} />
                </Col>
            </Row>
        </Row>
    );
};

export default TestListMeters;
