import React from 'react';
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

const OneObject = ({description}) => {

    return (
        <Card style={{ width: '18rem' , margin: 10}}>
            <Card.Img className="mt-2" variant="top" src="https://www.novostroy.su/regions//u/editor_2/wm_5e0ddbbd8fb05.jpg" />
            <Card.Body>

                <Card.Title>{description.name}</Card.Title>
                <Card.Text>
                    {description.address}
                </Card.Text>

                <Link to={`/object/${description.id}`}><Button variant="primary">Перейти</Button></Link>

            </Card.Body>
        </Card>
    );
};

export default OneObject;