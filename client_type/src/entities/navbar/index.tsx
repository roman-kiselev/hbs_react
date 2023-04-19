import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { configNav } from "../../shared/config";
import { NavAskue } from "./ui";
const NavbarAskue: React.FC = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">АСКУЭ</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <NavAskue configData={configNav} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarAskue;
