import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TreeAskue from "../../entities/tree/TreeAskue";

const TreeHomePage = () => {
    return (
        <Row>
            <Col className="col-4">
                <TreeAskue />
            </Col>
            <Col>
                <Outlet />
            </Col>
        </Row>
    );
};

export default TreeHomePage;
