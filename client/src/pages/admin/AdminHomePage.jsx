import React, {useState} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import AdminLeftMenu from "../../components/admin/AdminLeftMenu";

const AdminHomePage = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [active, setActive] = useState(false)
    const clickActive = () => setActive(true)

    return (
        <Row className="m-1">
            <Button variant="primary" className="d-lg-none" onClick={handleShow}>
                Панель администратора
            </Button>

            <Col className="col-xl-2">
                <AdminLeftMenu show={show} handleClose={() => handleClose()}/>
            </Col>
            <Col  className="col-12 col-xl-9 justify-content-center mt-3">
                <Row>

                    <Outlet />
                </Row>
            </Col>


        </Row>
    );
};

export default AdminHomePage;