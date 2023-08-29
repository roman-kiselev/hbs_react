import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const WaterIndex = () => {
    useEffect(() => {
        document.title = "Вода";
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
};

export default WaterIndex;
