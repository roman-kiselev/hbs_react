import React, {useState} from 'react';
import {Row} from "react-bootstrap";
import CardMeter from "./CardMeter";

const ListMeters = () => {

    const [cardMeter, setCardMeter] = useState([
        {
            id: 1,
            section: 1,
            floors: 5,
            flat: 100,
            kdl: 2,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        },
        {
            id: 2,
            section: 1,
            floors: 5,
            flat: 99,
            kdl: 2,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        },
        {
            id: 3,
            section: 1,
            floors: 5,
            flat: 90,
            kdl: 2,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        },
        {
            id: 5,
            section: 1,
            floors: 5,
            flat: 95,
            kdl: 3,
            asr: 45,
            numberMeter: 84375393,
            sum: 0.12
        }
    ])


    return (
        <Row>

            <Row>
                {
                    cardMeter.map((card) => (
                        <CardMeter {...card}/>
                    ))
                }
            </Row>

        </Row>
    );
};

export default ListMeters;