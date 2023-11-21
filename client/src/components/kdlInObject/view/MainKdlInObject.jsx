import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import TestFlow from "./testFlow/TestFlow";

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
