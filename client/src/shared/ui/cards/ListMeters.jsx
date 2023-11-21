import CardMeter from "./CardMeter";

const ListMeters = ({
    listCards,
    objectId,
    handleClickForEdit,
    handleClickDel,
}) => {
    return (
        <>
            {listCards.length !== 0 ? (
                listCards.map((card) => (
                    <CardMeter
                        key={card.id}
                        cardData={card}
                        objectId={objectId}
                        handleClickForEdit={handleClickForEdit}
                        handleClickDel={handleClickDel}
                    />
                ))
            ) : (
                <p>Пока ничего нет</p>
            )}
        </>
    );
};

export default ListMeters;
