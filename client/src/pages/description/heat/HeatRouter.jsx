import { Route, Routes } from "react-router-dom";
import MainHeatPage from "./MainHeatPage";

const HeatRouter = () => {
    return (
        <Routes>
            <Route index element={<MainHeatPage />} />
            <Route path="addHeat/*" element={<p>Вода</p>} />
        </Routes>
    );
};

export default HeatRouter;
