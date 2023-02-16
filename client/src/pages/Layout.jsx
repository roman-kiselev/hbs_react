import React from 'react';
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap"
import MyNavBar from "../components/MyNavBar";

const Layout = () => {
    return (
        <>
            <MyNavBar />
            <Container fluid={true}>
                <Outlet />
            </Container>
        </>

    );
};

export default Layout;