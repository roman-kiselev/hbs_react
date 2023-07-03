import React from "react";
import { useShowAndClose } from "../../../shared/hooks";
import { ModalUi } from "../../../shared/ui";
import ButtonAddObject from "./ButtonAddObject";
import ModalBodyAddObject from "./ModalBodyAddObject";

interface IButtonAndModalAddObject {
    setStateFile: React.Dispatch<React.SetStateAction<File>>;
    handleAddObject: () => void;
}

const ButtonAndModalAddObject: React.FC<IButtonAndModalAddObject> = ({
    handleAddObject,
    setStateFile,
}) => {
    const [show, handleClose, handleShow] = useShowAndClose(false);

    return (
        <>
            <ButtonAddObject handleAddObject={handleShow} />
            <ModalUi
                show={show}
                handleAction={handleAddObject}
                handleClose={handleClose}
                title="Создаём объект"
            >
                <ModalBodyAddObject setStateFile={setStateFile} />
            </ModalUi>
        </>
    );
};

export default ButtonAndModalAddObject;
