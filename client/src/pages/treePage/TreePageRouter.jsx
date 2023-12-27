import { Route, Routes } from "react-router-dom";
import TreeHomePage from "./TreeHomePage";

const TreePageRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<TreeHomePage />}>
                <Route index element={<p>All</p>} />
                <Route path="all2" element={<p>All2</p>} />
            </Route>
        </Routes>
    );
};

export default TreePageRouter;
