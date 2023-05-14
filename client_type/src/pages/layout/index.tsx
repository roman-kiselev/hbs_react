import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { NavbarAskueFeaters } from "../../features";

const Layout: React.FC = () => {
    return (
        <>
            <NavbarAskueFeaters />
            <Container fluid={true}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
