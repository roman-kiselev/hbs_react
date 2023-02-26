import React, {useEffect} from 'react';
import OneObject from "./OneObject";
import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getAllObjects} from "../../features/objectBuild/objectBuildSlice";

const ListObjects = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllObjects())
    },[])
    const objects = useSelector((state) => state.objectBuilds.objectsBuild)

    console.log(objects)

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