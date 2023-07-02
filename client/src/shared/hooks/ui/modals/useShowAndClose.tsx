import React, { useState } from "react";

const useShowAndClose = (
    value: boolean
): [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    React.Dispatch<React.SetStateAction<boolean>>
] => {
    const [show, setShow] = useState(value);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return [show, handleClose, handleShow];
};

export default useShowAndClose;
