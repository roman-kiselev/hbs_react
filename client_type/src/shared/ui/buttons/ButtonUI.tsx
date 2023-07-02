import React from "react";
import { Button, Row } from "react-bootstrap";
import { IButtonUI } from "../../interfaces";

const ButtonUI: React.FC<IButtonUI> = ({ label, onClick, variant }) => {
    return (
        // <Row className="d-flex justify-content-between">
        <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onClick(e)
            }
            className="mt-3 pointer-event"
            variant={variant}
        >
            {label}
        </Button>
        // </Row>
    );
};

export default ButtonUI;
