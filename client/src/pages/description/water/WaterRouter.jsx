import { Route, Routes } from "react-router-dom";
import MainWaterPage from "./MainWaterPage";

const WaterRouter = () => {
    return (
        <Routes>
            <Route index element={<MainWaterPage />} />
            <Route path="addMeters/*" element={<p>Вода</p>} />
        </Routes>
    );
};

export default WaterRouter;
