import React from "react";
import { Offcanvas, Row } from "react-bootstrap";

interface ILeftMenu {
    show: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const LeftMenu: React.FC<ILeftMenu> = ({ show, handleClose, children }) => {
    return (
        <Row>
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Навигация</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row xl={12} className="mt-3">
                        {children}
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Row>
    );
};

export default LeftMenu;
