import React from "react";
import { Button, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

const OneObject = ({ description }) => {
    return (
        <Card style={{ width: "18rem", margin: 10 }}>
            <Figure className="text-center">
                <Figure.Image
                    className="mt-2"
                    width={160}
                    fluid={true}
                    rounded={true}
                    alt="171x180"
                    src={`${process.env.REACT_APP_URL_API}/${description.img}`}
                />
            </Figure>
            {/* <Card.Img
                className="mt-2"
                variant="top"
                src={`${process.env.REACT_APP_URL_API}/${description.img}`}
            /> */}
            <Card.Body>
                <Card.Title>{description.name}</Card.Title>
                <Card.Text>{description.description}</Card.Text>

                <Link to={`/object/${description.id}`}>
                    <Button variant="primary">Перейти</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default OneObject;
