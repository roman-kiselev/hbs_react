import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ElectricalIndex = () => {
    useEffect(() => {
        document.title = "Электроэнергия";
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
};

export default ElectricalIndex;
