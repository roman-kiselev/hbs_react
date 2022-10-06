import React from 'react';
import {Button, Card} from "react-bootstrap";
import { BsFillXCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { removeObject } from '../features/objectBuild/objectBuildSlice';
import { useNavigate } from "react-router-dom"

const CardObjects = ({id, name, address}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeObjectHandler = (id) => {
        dispatch(removeObject(id))
    } 

    const question = (id) => {
        
        const isDel = window.confirm(`Точно удаляем ${name}?`)
        if (isDel) {
            removeObjectHandler(id)
        }
    }

    return (
        <Card className="mt-3" style={{ width: '15rem', margin: "10px 10px 0 0" }}>

            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {address}
                </Card.Text>
                <Button variant="primary" onClick={() => navigate()}>Вперёд</Button>
                < BsFillXCircleFill 
                    onClick={() => question(id)}
                color={"red"} 
                style={{marginLeft: "2rem", cursor: "pointer"}}
                />
            </Card.Body>
        </Card>
    );
};

export default CardObjects;