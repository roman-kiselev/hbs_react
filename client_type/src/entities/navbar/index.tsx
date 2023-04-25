import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { configNav } from "../../shared/config";
import { NavAskue } from "./ui";
import { IRole } from "../../shared/interfaces";

interface INavAskue {
    role: IRole[];
}

const NavbarAskue: React.FC<INavAskue> = ({ role }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">АСКУЭ</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <NavAskue configData={configNav} role={role} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarAskue;
