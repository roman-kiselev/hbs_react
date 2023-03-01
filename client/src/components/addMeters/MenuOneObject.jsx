import React, {useState} from 'react';
import {ListGroup, Offcanvas, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const MenuOneObject = ({id, show, handleClose}) => {



    return (
        <Row>
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Навигация</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <Row xl={12} className="mt-3">
                        <ListGroup>
                            <Link style={{textDecoration: "none"}} to="description">
                                <ListGroup.Item action variant="light">
                                    Описание
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="settings">
                                <ListGroup.Item action variant="light">
                                    Настройка
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addCoolMeterBolid">
                                <ListGroup.Item action variant="light">
                                    Добавить ХВС - Болид
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addHotMeterBolid">
                                <ListGroup.Item action variant="light">
                                    Добавить ГВС - Болид
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addMeterCoolHotBolid">
                                <ListGroup.Item action variant="light">
                                    Добавить ХГВС - Болид
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addCoolMeterPulsar">
                                <ListGroup.Item action variant="light">
                                    Добавить ХВС - Пульсар
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addHotMeterPulsar">
                                <ListGroup.Item action variant="light">
                                    Добавить ГВС - Пульсар
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addMeterPulsar">
                                <ListGroup.Item action variant="light">
                                    Добавить ХГВС - Пульсар
                                </ListGroup.Item>
                            </Link>

                            <Link style={{textDecoration: "none"}} to="addHeat">
                                <ListGroup.Item action variant="light">
                                    Добавить счётчики тепла
                                </ListGroup.Item>
                            </Link>
                            <Link style={{textDecoration: "none"}} to="addHeat">
                                <ListGroup.Item action variant="light">
                                    Добавить счётчики электроэнергии
                                </ListGroup.Item>
                            </Link>
                            <Link style={{textDecoration: "none"}} to={`temporaryPage?id=${id}`}>
                                <ListGroup.Item action variant="light">
                                    Добавить воду (Test)
                                </ListGroup.Item>
                            </Link>




                        </ListGroup>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Row>
    );
};

export default MenuOneObject;