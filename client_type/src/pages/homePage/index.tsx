import React, { lazy, Suspense } from "react";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { LoadingSpin } from "../../entities";

const ListObjects = lazy(() => import("./objects/ListObjects"));

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
                            {/* <Route
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
                                /> */}
                        </Routes>
                    </Row>
                </Row>
            </Container>
        </>
    );
};

export default HomePageRoute;
