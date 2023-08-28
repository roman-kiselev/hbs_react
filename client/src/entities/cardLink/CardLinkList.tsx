import React from "react";
import { ICardLink } from "../../shared/interfaces";
import CardLinkItem from "./CardLinkItem";

interface CardLinkListProps {
    config: ICardLink[];
}

const CardLinkList: React.FC<CardLinkListProps> = ({ config }) => {
    return (
        <>
            {config.map((item, index) => (
                <CardLinkItem {...item} key={index} />
            ))}
        </>
    );
};

export default CardLinkList;
