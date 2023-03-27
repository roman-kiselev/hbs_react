import React, { useCallback } from "react";
import TestFlow from "./testFlow/TestFlow";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

const MainKdlInObject = () => {
    return (
        <Row>
            <Row>
                <h6>Test</h6>
            </Row>
            <Container fluid>
                <div className="flow-container" style={{ height: "80vh" }}>
                    <TestFlow />
                </div>
            </Container>
        </Row>
    );
};

export default MainKdlInObject;
