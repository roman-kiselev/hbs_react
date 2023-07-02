import React from "react";
import { useNavigate } from "react-router";
import { ButtonUI } from "../../shared/ui";

const NoAccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <h6>Нет доступа</h6>

            <ButtonUI
                variant="success"
                onClick={() => navigate("/")}
                label="Перейти на главную"
            />
        </>
    );
};

export default NoAccess;
