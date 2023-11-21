import { Route, Routes } from "react-router-dom";

const WaterRouter = () => {
    return (
        <Routes>
            <Route index element={<p>Здесь будет описание воды</p>} />
            <Route path="addMeters/*" element={<p>Вода</p>} />
        </Routes>
    );
};

export default WaterRouter;
