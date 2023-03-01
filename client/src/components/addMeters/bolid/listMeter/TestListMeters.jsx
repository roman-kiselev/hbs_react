import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import TestCardMeter from "./TestCardMeter";
import {useDispatch, useSelector} from "react-redux";
import {getAllMetersByUserAndObject} from "../../../../features/testMeters/testWaterMeterSlice";

const TestListMeters = ({id: objectId}) => {
    const dispatch = useDispatch()
    const {id: userId} = useSelector((state) => state.users.user)
    const cardMeter = useSelector((state) => state.mainTable.mainTable)

    const formQuery = {
        userId,
        objectId
    }

    useEffect(() => {
        dispatch(getAllMetersByUserAndObject({formQuery}))
    },[])



    return (
        <Row>

            <Row>
                {
                    cardMeter.map((card) => (
                        <TestCardMeter key={card.id} {...card}/>
                    ))
                }
            </Row>

        </Row>
    );
};

export default TestListMeters;