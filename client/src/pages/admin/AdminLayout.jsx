import React from 'react';
import MyNavBar from "../../components/MyNavBar";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            <MyNavBar />
            <Container fluid={true}>
                <Outlet />
            </Container>
        </>
    );
};

export default AdminLayout;