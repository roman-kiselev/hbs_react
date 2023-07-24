import React, { useState } from "react";
import { LeftMenu, LinkGroup } from "../../entities";
import { configPanel } from "../../shared/config";

interface LeftMenuAdminProps {
    show: boolean;
    handleClose: () => void;
}

const LeftMenuMain: React.FC<LeftMenuAdminProps> = ({ show, handleClose }) => {
    return (
        <LeftMenu show={show} handleClose={handleClose}>
            <LinkGroup configList={configPanel} />
        </LeftMenu>
    );
};

export default LeftMenuMain;
