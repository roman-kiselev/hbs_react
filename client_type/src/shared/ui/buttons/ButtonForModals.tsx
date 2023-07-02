import React from "react";
import { Button } from "react-bootstrap";

interface IButtonForModals {
    handleShow: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}

const ButtonForModals: React.FC<IButtonForModals> = ({ handleShow, title }) => {
    const handleClick = () => {
        handleShow(true);
    };
    return (
        <>
            <Button variant="primary" onClick={handleClick}>
                {title}
            </Button>
        </>
    );
};

export default ButtonForModals;
