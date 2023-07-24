import React, { lazy } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { LeftMenuMain, SuspenseAndLoading } from "../../features";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { setShow } from "../../shared/models";
import ElectricsRouter from "./electrics";
import HeatRouter from "./heat";
import WaterIndex from "./water";

const MainOneObject = lazy(() => import("./mainOneObject"));
const AddMetersAsrTwoPage = lazy(() => import("./water/AddMetersAsrTwoPage"));
const WaterMainPage = lazy(() => import("./water/WaterMainPage"));
const OneObjectRouter = () => {
    const { show } = useAppSelector((state) => state.leftMenu);
    const dispatch = useAppDispatch();
    const handleClose = () => dispatch(setShow(false));
    const handleShow = () => dispatch(setShow(true));

    return (
        <>
            <Container fluid>
                <Row className="m-1">
                    <Button
                        variant="primary"
                        className="d-lg-none"
                        onClick={handleShow}
                    >
                        Открыть меню
                    </Button>
                    <Col>
                        <LeftMenuMain show={show} handleClose={handleClose} />
                    </Col>
                    <Col className="col-12 col-xl-9 justify-content-center mt-3">
                        <Row>
                            <Routes>
                                <Route
                                    index
                                    element={
                                        <SuspenseAndLoading>
                                            <MainOneObject />
                                        </SuspenseAndLoading>
                                    }
                                />
                                <Route
                                    path="water/*"
                                    element={
                                        <SuspenseAndLoading>
                                            <WaterIndex />
                                        </SuspenseAndLoading>
                                    }
                                >
                                    <Route
                                        index
                                        element={
                                            <SuspenseAndLoading>
                                                <WaterMainPage />
                                            </SuspenseAndLoading>
                                        }
                                    />
                                    <Route
                                        path="addMetersAsrTwo/*"
                                        element={
                                            <SuspenseAndLoading>
                                                <AddMetersAsrTwoPage />
                                            </SuspenseAndLoading>
                                        }
                                    />
                                </Route>
                                <Route
                                    path="heat/*"
                                    element={
                                        <SuspenseAndLoading>
                                            <HeatRouter />
                                        </SuspenseAndLoading>
                                    }
                                />
                                <Route
                                    path="electrics/*"
                                    element={
                                        <SuspenseAndLoading>
                                            <ElectricsRouter />
                                        </SuspenseAndLoading>
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

export default OneObjectRouter;
