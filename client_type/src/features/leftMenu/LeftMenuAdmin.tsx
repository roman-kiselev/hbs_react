import React, { useState } from "react";
import { LeftMenu, LinkGroup } from "../../entities";
import { configAdminPanel } from "../../shared/config";

interface LeftMenuAdminProps {
    show: boolean;
    handleClose: () => void;
}

const LeftMenuAdmin: React.FC<LeftMenuAdminProps> = ({ show, handleClose }) => {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <LeftMenu show={show} handleClose={handleClose}>
            <LinkGroup configList={configAdminPanel} />
        </LeftMenu>
    );
};

export default LeftMenuAdmin;
