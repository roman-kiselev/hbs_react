import React from "react";
import { Button, Row } from "react-bootstrap";
import { IButtonUI } from "../../interfaces";

const ButtonUI: React.FC<IButtonUI> = ({ label, onClick }) => {
    return (
        <Row className="d-flex justify-content-between">
            <Button
                onClick={onClick}
                className="mt-3 pointer-event"
                variant={"outline-success"}
            >
                {label}
            </Button>
        </Row>
    );
};

export default ButtonUI;
