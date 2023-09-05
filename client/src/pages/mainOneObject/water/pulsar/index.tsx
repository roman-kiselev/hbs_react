import { Row } from "react-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import ListDevice from "./ListDevice";
import MainStatistics from "./MainStatistics";

const PulsarRouter = () => {
    return (
        <>
            <Row>
                <MainStatistics />
            </Row>
            <Routes>
                <Route index element={<ListDevice />} />
                <Route
                    path="addMeters"
                    element={<h6>Добавление счётчиков</h6>}
                />
                <Route path="list" element={<ListDevice />} />
                <Route path="operation" element={<h6>Операции счётчиков</h6>} />
            </Routes>
            <Row>
                <Outlet />
            </Row>
        </>
    );
};

export default PulsarRouter;
