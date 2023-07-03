import React from "react";
import { useShowAndClose } from "../../../../shared/hooks";
import { ButtonForModals, ModalUi } from "../../../../shared/ui";
import BodyCreateObject from "./BodyCreateObject";

interface CreateObjectsProps {
    handleAction: () => void;
}

const CreateObject: React.FC<CreateObjectsProps> = ({ handleAction }) => {
    const [show, handleClose, handleShow] = useShowAndClose(false);

    return (
        <>
            <ButtonForModals title="Создать" handleShow={handleShow} />
            <ModalUi
                handleClose={handleClose}
                title="Создать объект"
                show={show}
                handleAction={handleAction}
            >
                <BodyCreateObject />
            </ModalUi>
        </>
    );
};

export default CreateObject;
