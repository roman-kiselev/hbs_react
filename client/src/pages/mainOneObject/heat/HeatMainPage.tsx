import CardLinkList from "../../../entities/cardLink/CardLinkList";
import { cardHeatConfig } from "../../../shared/config";

const HeatMainPage = () => {
    return (
        <>
            <CardLinkList config={cardHeatConfig} />
        </>
    );
};

export default HeatMainPage;
