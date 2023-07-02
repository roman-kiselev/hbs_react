import React from "react";
import { useNavigate } from "react-router";
import ButtonUI from "./ButtonUI";

interface IButtonGoBackProps {}

const ButtonGoBack: React.FC<IButtonGoBackProps> = () => {
    const navigate = useNavigate();
    const goToBack = () => {
        return navigate(-1);
    };

    return (
        <ButtonUI onClick={goToBack} label="К списку" variant="secondary" />
        // <Button onClick={goToBack} variant="secondary">
        //     К списку
        // </Button>
    );
};

export default ButtonGoBack;
