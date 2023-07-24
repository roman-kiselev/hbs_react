import React, { useEffect } from "react";
import { Outlet } from "react-router";
import CardLinkItem from "../../../entities/cardLink/CardLinkItem";
import CardLinkList from "../../../entities/cardLink/CardLinkList";
import { cardWaterConfig } from "../../../shared/config";

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
