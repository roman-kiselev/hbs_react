import React from "react";
import { Col, Container, Navbar } from "react-bootstrap";
import { NavAskue, Profile } from "./ui";
import { INavLinkAskueProps, IRole } from "../../shared/interfaces";
import { userDescriptionApi } from "../../shared/api";

interface INavAskue {
    roles: IRole[];
    configData: INavLinkAskueProps[];
}

const NavbarAskue: React.FC<INavAskue> = ({ roles, configData }) => {
    // Получаем данные пользователя
    // const { isError, data } = userDescriptionApi.useGetUserDescriptionQuery();
    // console.log(data, isError);
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">АСКУЭ</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Col>
                        <NavAskue configData={configData} roles={roles} />
                    </Col>
                    <Profile />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarAskue;
