import React, {useState} from 'react';
import {Alert, Button, ListGroup, Offcanvas, Row, Col, Form} from "react-bootstrap"
import {Outlet, useParams} from "react-router-dom";
import MenuOneObject from "../components/addMeters/MenuOneObject";

const DescriptionObject = () => {

    let {id} = useParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [active, setActive] = useState(false)
    const clickActive = () => setActive(true)


    return (

        <Row className="m-1">
            <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                Открыть меню
            </Button>

            <Col className="col-xl-2">
                <MenuOneObject id={id} show={show} handleClose={() => handleClose()}/>
            </Col>
            <Col  className="col-12 col-xl-9 justify-content-center mt-3">
                <Row>
                    
                    <Outlet/>
                </Row>
            </Col>


        </Row>
    );
};

export default DescriptionObject;