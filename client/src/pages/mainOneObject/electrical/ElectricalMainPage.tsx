import CardLinkList from "../../../entities/cardLink/CardLinkList";
import { cardElectricalConfig } from "../../../shared/config";

const ElectricalMainPage = () => {
    return (
        <>
            <CardLinkList config={cardElectricalConfig} />
        </>
    );
};

export default ElectricalMainPage;
