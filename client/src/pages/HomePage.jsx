import React, {useState} from 'react'
import {  Row, Button, Col, Card } from "react-bootstrap"
import AddObject from "../modals/AddObject";
import {useSelector} from "react-redux";
import OneObject from "../components/objects/OneObject";
import ListObjects from "../components/objects/ListObjects";




const HomePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




  return (
    <Row className="m-5">
        <Row className="mt-3 justify-content-center">
            <Col className="col-4 text-center">
                <Button className="btn" onClick={() => handleShow()} variant="primary">Добавить объект</Button>
            </Col>
        </Row>

        <Row>
            <AddObject  show={show} onHide={() => handleClose()}/>
        </Row>

        <ListObjects />

    </Row>

  )
}

export default HomePage;
