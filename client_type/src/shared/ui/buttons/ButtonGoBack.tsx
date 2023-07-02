import React from "react";
import { useNavigate } from "react-router";
import ButtonUI from "./ButtonUI";

interface IButtonGoBackProps {
    label?: string;
}

const ButtonGoBack: React.FC<IButtonGoBackProps> = ({ label = "К списку" }) => {
    const navigate = useNavigate();
    const goToBack = () => {
        return navigate(-1);
    };

    return (
        <ButtonUI onClick={goToBack} label={label} variant="secondary" />
        // <Button onClick={goToBack} variant="secondary">
        //     К списку
        // </Button>
    );
};

export default ButtonGoBack;
