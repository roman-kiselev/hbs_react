import { Route, Routes } from "react-router-dom";
import MainElectricalPage from "./MainElectricalPage";

const ElectricalRouter = () => {
    return (
        <Routes>
            <Route index element={<MainElectricalPage />} />
            <Route path="addElectrical/*" element={<p>Вода</p>} />
        </Routes>
    );
};

export default ElectricalRouter;
