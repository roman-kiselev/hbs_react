import React, {useState} from 'react';
import {Row} from "react-bootstrap";
import CardMeter from "./CardMeter";
import {useSelector} from "react-redux";

const ListMeters = () => {

    const cardMeter = useSelector((state) => state.coolBolid.coolBolidList)


    return (
        <Row>

            <Row>
                {
                    cardMeter.map((card) => (
                        <CardMeter key={card.id} {...card}/>
                    ))
                }
            </Row>

        </Row>
    );
};

export default ListMeters;