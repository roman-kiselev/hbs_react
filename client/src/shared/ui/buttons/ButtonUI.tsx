import React from "react";
import { Button } from "react-bootstrap";
import { IButtonUI } from "../../interfaces";

const ButtonUI: React.FC<IButtonUI> = ({ label, onClick, variant }) => {
    return (
        <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                onClick(e)
            }
            className="mt-3 pointer-event"
            variant={variant}
        >
            {label}
        </Button>
    );
};

export default ButtonUI;
