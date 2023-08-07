import React from "react";
import { Button, Offcanvas } from "react-bootstrap";

interface OffCanvasProps {
    handleClose: () => void;
    handleShow: () => void;
    show: boolean;
}

const OffCanvas = ({ handleShow, show, handleClose }) => {
    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Лист счётчиков</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>Список</Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default OffCanvas;
