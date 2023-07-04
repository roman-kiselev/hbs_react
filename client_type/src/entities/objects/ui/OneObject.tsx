import React from "react";
import { Button, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IObject } from "../../../shared/interfaces/store";

const OneObject: React.FC<IObject> = ({ name, description, img, id }) => {
    return (
        <Card style={{ width: "18rem", margin: 10 }}>
            <Figure className="text-center">
                <Figure.Image
                    className="mt-2"
                    width={160}
                    fluid={true}
                    rounded={true}
                    alt="171x180"
                    src={`${process.env.REACT_APP_URL_API}/${img}`}
                />
            </Figure>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>

                <Link to={`/object/${id}`}>
                    <Button variant="primary">Перейти</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default OneObject;
