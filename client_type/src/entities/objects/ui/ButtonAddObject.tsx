import React from "react";
import { ButtonForModals } from "../../../shared/ui";

interface IButtonAddObject {
    handleAddObject: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonAddObject: React.FC<IButtonAddObject> = ({ handleAddObject }) => {
    return (
        <>
            <ButtonForModals
                title="Создать объект"
                handleShow={handleAddObject}
            />
        </>
    );
};

export default ButtonAddObject;
