import React from "react";
import CardMeter from "../cardMeter/CardMeter";

const ListMeters = ({ listCards, objectId, handleClickForEdit }) => {
    return (
        <>
            {listCards.length !== 0 ? (
                listCards.map((card) => (
                    <CardMeter
                        key={card.id}
                        cardData={card}
                        objectId={objectId}
                        handleClickForEdit={handleClickForEdit}
                    />
                ))
            ) : (
                <p>Пока ничего нет</p>
            )}
        </>
    );
};

export default ListMeters;
