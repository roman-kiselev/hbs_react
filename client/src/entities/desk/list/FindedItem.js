import { Alert } from "react-bootstrap";

const FindedItem = ({
    handleClick,
    number,
    flat,
    floor,
    typeMeter,
    section,
    id,
}) => {
    return (
        <Alert
            variant="secondary"
            style={{
                cursor: "pointer",
                margin: 5,
                padding: 3,
            }}
            onClick={() => handleClick(id)}
        >
            Секция- {section}; Этаж-{floor}; Квартира-{flat}; {typeMeter}-
            {number}
        </Alert>
    );
};

export default FindedItem;
