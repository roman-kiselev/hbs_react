import React, { lazy, Suspense } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { LoadingSpin } from "../../entities";
import { LeftMenuManager, NavbarAskueFeaters } from "../../features";
import { configNav } from "../../shared/config";
const ManagerPanelIndex = lazy(() => import("./ManagerPanel"));
const ObjectsMain = lazy(() => import("./objects"));
const CountingRoute = () => {
    return (
        <>
            <NavbarAskueFeaters configData={configNav} />
            <Container fluid>
                <Row className="m-1">
                    <Col>
                        <LeftMenuManager />
                    </Col>
                    <Col className="col-12 col-xl-9 justify-content-center mt-3">
                        <Row>
                            <Routes>
                                <Route
                                    index
                                    element={
                                        <Suspense
                                            fallback={
                                                <LoadingSpin variant="secondary" />
                                            }
                                        >
                                            <ManagerPanelIndex />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="objects"
                                    element={
                                        <Suspense
                                            fallback={
                                                <LoadingSpin variant="secondary" />
                                            }
                                        >
                                            <ObjectsMain />
                                        </Suspense>
                                    }
                                />
                            </Routes>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CountingRoute;
