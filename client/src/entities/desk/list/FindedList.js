import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deskApi } from "../../../shared/api/desk";
import FindedItem from "./FindedItem";

const FindedList = () => {
    const { findedList } = useSelector((store) => store.desk);
    const { id } = useParams();

    const [createFieldInDesk, { data }] = deskApi.useCreateMutation();
    // Крепим к доске
    const handleClick = (mainMeterId) => {
        createFieldInDesk({ mainMeterId, objectBuildId: id });
    };

    return (
        <Row>
            {findedList.map((item, index) => (
                <FindedItem
                    key={index}
                    id={item.id}
                    number={item.numberMeter}
                    section={item.section}
                    flat={item.flat}
                    floor={item.floor}
                    typeMeter={item.typeMeter}
                    handleClick={handleClick}
                />
            ))}
        </Row>
    );
};

export default FindedList;
