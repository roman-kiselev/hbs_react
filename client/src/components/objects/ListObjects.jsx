import React from 'react';
import OneObject from "./OneObject";
import {Row} from "react-bootstrap";
import {useSelector} from "react-redux";

const ListObjects = () => {

    const objects = useSelector((state) => state.objectBuilds.objectsBuild)


    return (
        <Row className="mt-3 justify-content-center">
            {
                objects.map((object) => (
                    <OneObject key={object.id} description={{
                        id: object.id,
                        img: object.img,
                        name: object.name,
                        address: object.address
                    }}/>
                ))
            }
        </Row>
    );
};

export default ListObjects;