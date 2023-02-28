import React from 'react';
import {Nav, Navbar, NavDropdown, Container, Form, Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const MyNavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">АСКУЭ</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/*<NavLink style={{textDecoration: "none"}} to="/"><Nav.Link href="/">Домашняя</Nav.Link></NavLink>*/}
                        <NavLink style={{textDecoration: "none", margin: 7, color: "grey"}} to="/">Домашняя</NavLink>
                        <NavLink style={{textDecoration: "none", margin: 7, color: "grey"}} to="/admin">Админ панель</NavLink>
                       {/* <NavLink style={{textDecoration: "none"}} to="/"><Nav.Link href="#action2">Link</Nav.Link></NavLink>*/}

                        <NavDropdown title="Пусто" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" disabled>
                            Пусто
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavBar;