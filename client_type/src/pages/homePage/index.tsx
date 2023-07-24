import React, { lazy, Suspense } from "react";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { LoadingSpin } from "../../entities";
import { LoadingVariant } from "../../shared/config";

const ListObjects = lazy(() => import("./objects/ListObjects"));
const OneObjectRouting = lazy(() => import("../oneObject"));
const HomePageRoute = () => {
    return (
        <>
            <Container fluid>
                <Row className="m-1">
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
                                        <ListObjects />
                                    </Suspense>
                                }
                            />

                            <Route path="/*" element={<h3>404</h3>} />
                        </Routes>
                    </Row>
                </Row>
            </Container>
        </>
    );
};

export default HomePageRoute;
