import React from 'react';
import {Button, Card} from "react-bootstrap";
import { BsFillXCircleFill } from 'react-icons/bs';
const CardObjects = ({name}) => {


    return (
        <Card classname="mt-3" style={{ width: '15rem', margin: "10px 10px 0 0" }}>

            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Дополнительно
                </Card.Text>
                <Button variant="primary">Вперёд</Button>
                < BsFillXCircleFill color={"red"} style={{marginLeft: "2rem", cursor: "pointer"}}/>
            </Card.Body>
        </Card>
    );
};

export default CardObjects;