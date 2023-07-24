import React from "react";
import CardLinkList from "../../../entities/cardLink/CardLinkList";
import { cardWaterConfig } from "../../../shared/config";

const WaterMainPage = () => {
    return (
        <>
            <CardLinkList config={cardWaterConfig} />
        </>
    );
};

export default WaterMainPage;
