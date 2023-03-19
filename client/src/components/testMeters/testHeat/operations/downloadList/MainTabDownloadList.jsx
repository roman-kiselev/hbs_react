import React from "react";
import { Button } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";

const MainTabDownloadList = ({ objectBuildId, getExcel }) => {
    return (
        <>
            <Button variant="success" onClick={getExcel}>
                Скачать Excel
                <RiFileExcel2Line />
            </Button>
        </>
    );
};

export default MainTabDownloadList;
