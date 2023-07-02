import React, { lazy, Suspense } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { LoadingSpin } from "../../entities";
import { LeftMenuAdmin, NavbarAskueFeaters } from "../../features";
import { configNavAdmin, LoadingVariant } from "../../shared/config";

const AdminPanel = lazy(() => import("./AdminPanel"));
const SubPage = lazy(() => import("./SubPage"));
const Users = lazy(() => import("./users"));
const OneUser = lazy(() => import("./users/OneUser"));

const AdminPanelRoute = () => {
    return (
        <>
            <NavbarAskueFeaters configData={configNavAdmin} />
            <Container fluid>
                <Row className="m-1">
                    <Col>
                        <LeftMenuAdmin />
                    </Col>
                    <Col className="col-12 col-xl-9 justify-content-center mt-3">
                        <Row>
                            <Routes>
                                <Route
                                    index
                                    element={
                                        <Suspense
                                            fallback={
                                                <LoadingSpin
                                                    variant={
                                                        LoadingVariant.SECONDARY
                                                    }
                                                />
                                            }
                                        >
                                            <AdminPanel />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="users"
                                    element={
                                        <Suspense
                                            fallback={
                                                <LoadingSpin
                                                    variant={
                                                        LoadingVariant.SECONDARY
                                                    }
                                                />
                                            }
                                        >
                                            <Users />
                                        </Suspense>
                                    }
                                />

                                <Route
                                    path="users/:userId"
                                    element={
                                        <Suspense
                                            fallback={
                                                <LoadingSpin
                                                    variant={
                                                        LoadingVariant.SECONDARY
                                                    }
                                                />
                                            }
                                        >
                                            <OneUser />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="sub"
                                    element={
                                        <Suspense
                                            fallback={
                                                <LoadingSpin
                                                    variant={
                                                        LoadingVariant.SECONDARY
                                                    }
                                                />
                                            }
                                        >
                                            <SubPage />
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

export default AdminPanelRoute;
