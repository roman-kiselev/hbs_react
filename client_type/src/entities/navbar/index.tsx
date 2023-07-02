import React from "react";
import { Col, Container, Navbar } from "react-bootstrap";
import { NavAskue, Profile } from "./ui";
import { INavLinkAskueProps, IRole } from "../../shared/interfaces";
import { useAppSelector } from "../../shared/hooks";

interface INavAskue {
    roles: IRole[];
    configData: INavLinkAskueProps[];
    logout: () => void;
}

const NavbarAskue: React.FC<INavAskue> = ({ roles, configData, logout }) => {
    // Получаем данные пользователя
    const { login } = useAppSelector((store) => store.user.user);
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
                    <Profile name={login} logout={logout} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarAskue;
