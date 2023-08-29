import { Button, Col, Container, Row } from "react-bootstrap";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import MenuOneObject from "../../components/addMeters/leftMenu/MenuOneObject";
import TestMainWaterPage from "../../components/testMeters/testWater/view/TestMainWaterPage";
import { useAppSelector } from "../../shared/hooks";
import { setShow } from "../../shared/models";
import FormTags from "./formTags";
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
