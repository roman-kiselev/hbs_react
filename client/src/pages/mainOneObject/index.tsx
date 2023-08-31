import { Button, Col, Container, Row } from "react-bootstrap";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import MenuOneObject from "../../components/addMeters/leftMenu/MenuOneObject";
import TestMainElectricalPage from "../../components/testMeters/testElectrical/view/TestMainElectricalPage";
import TestMainHeatPage from "../../components/testMeters/testHeat/view/TestMainHeatPage";
import TestMainWaterPage from "../../components/testMeters/testWater/view/TestMainWaterPage";
import { useAppSelector } from "../../shared/hooks";
import { setShow } from "../../shared/models";
import ElectricalIndex from "./electrical";
import ElectricalMainPage from "./electrical/ElectricalMainPage";
import FormTags from "./formTags";
import HeatIndex from "./heat";
import HeatMainPage from "./heat/HeatMainPage";
import WaterIndex from "./water";
import WaterMainPage from "./water/WaterMainPage";

const MainOneObject = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { show } = useAppSelector((state) => state.leftMenu);
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
                        <MenuOneObject
                            id={id}
                            show={show}
                            handleClose={handleClose}
                        />
                        {/* <LeftMenuMain show={show} handleClose={handleClose} /> */}
                    </Col>
                    <Col className="col-12 col-xl-9 justify-content-center mt-3">
                        <Row>
                            <Routes>
                                <Route index element={<h6>Главная</h6>} />
                                <Route path="water/*" element={<WaterIndex />}>
                                    <Route index element={<WaterMainPage />} />
                                    <Route
                                        path="temporaryPage"
                                        element={<TestMainWaterPage />}
                                    />
                                </Route>
                                <Route path="heat/*" element={<HeatIndex />}>
                                    <Route index element={<HeatMainPage />} />
                                    <Route
                                        path="addHeatTest"
                                        element={<TestMainHeatPage />}
                                    />
                                </Route>
                                <Route
                                    path="electrics/*"
                                    element={<ElectricalIndex />}
                                >
                                    <Route
                                        index
                                        element={<ElectricalMainPage />}
                                    />
                                    <Route
                                        path="addElectricalTest"
                                        element={<TestMainElectricalPage />}
                                    />
                                </Route>
                                <Route
                                    path="formTagsWater"
                                    element={<FormTags />}
                                />
                            </Routes>
                            <Outlet />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MainOneObject;
