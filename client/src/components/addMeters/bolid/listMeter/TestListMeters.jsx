import React, {useEffect} from 'react';
import {Row} from "react-bootstrap";
import TestCardMeter from "./TestCardMeter";
import {useDispatch, useSelector} from "react-redux";
import {getAllMetersByUserAndObject} from "../../../../features/testMeters/testWaterMeterSlice";

const TestListMeters = ({id: objectId}) => {
    const dispatch = useDispatch()
    const {id: userId} = useSelector((state) => state.users.user)
    const cardMeter = useSelector((state) => state.mainTable.mainTable)

    const {currentPage} = useSelector((state) => state.mainTable)
    const {perPage} = useSelector((state) => state.mainTable)
    const {totalCount} = useSelector((state) => state.mainTable)



    const formQuery = {
        userId,
        objectId
    }

    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({formQuery}))
    },[dispatch])



    return (
        <Row>

            <Row>
                {
                    cardMeter.length !== 0 ?
                        cardMeter.map((card) => (
                            <TestCardMeter key={card.id} {...card}/>
                        )) :
                        <p>Пока ничего нет</p>
                }
            </Row>

        </Row>
    );
};

export default TestListMeters;