import React from "react";
import { Row } from "react-bootstrap";
import { IObject } from "../../../shared/interfaces/store";
import OneObject from "./OneObject";

interface IObjectList {
    objects: IObject[];
}

const ListObjects: React.FC<IObjectList> = ({ objects }) => {
    return (
        <>
            {objects != undefined ? (
                <Row className="mt-3 justify-content-center">
                    {objects.map((object) => (
                        <OneObject key={object.id} {...object} />
                    ))}
                </Row>
            ) : (
                <p>Пока нет объектов</p>
            )}
        </>
    );
};

export default ListObjects;
