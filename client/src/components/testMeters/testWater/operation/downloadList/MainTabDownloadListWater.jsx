import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { RiFileExcel2Line } from "react-icons/ri";

const MainTabDownloadListWater = ({
    objectBuildId,
    getExcel,
    getPulsarExcel,
}) => {
    return (
        <>
            <Row>
                <Col>
                    <Button variant="success" onClick={getExcel}>
                        Скачать Excel
                        <RiFileExcel2Line />
                    </Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={getPulsarExcel}>
                        Скачать Excel Pulsar
                        <RiFileExcel2Line />
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default MainTabDownloadListWater;
