import React, { useState } from "react";
import { LeftMenu, LinkGroup } from "../../entities";
import { configManagerPanel } from "../../shared/config";
const LeftMenuManager = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <LeftMenu show={show} handleClose={handleClose}>
            <LinkGroup configList={configManagerPanel} />
        </LeftMenu>
    );
};

export default LeftMenuManager;
