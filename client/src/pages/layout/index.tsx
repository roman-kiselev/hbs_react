import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { NavbarAskueFeaters } from "../../features";
import { configNav } from "../../shared/config";

const Layout: React.FC = () => {
    return (
        <>
            <NavbarAskueFeaters configData={configNav} />
            <Container fluid={true}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
