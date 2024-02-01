import { Row } from "react-bootstrap";
import OneRadioAsr from "./OneRadioAsr";

const OneFloor = ({ numberFloor, id, handleShow, handleShowStatus, data }) => {
    // const { data, isLoading } = waterApi.useGetLineMeterOneFloorQuery({
    //     id,
    //     floor: numberFloor,
    // });

    // if (isLoading) {
    //     return <Spinner animation="border" />;
    // }

    return (
        <Row
            style={{
                display: "flex",
                justifyContent: "center",
                border: "1px lightgray solid",
                borderRadius: "15px",
                marginTop: "10px",
            }}
        >
            <h4 style={{ display: "flex", justifyContent: "center" }}>
                Этаж №{numberFloor}
            </h4>
            {data.map((item, index) => (
                <OneRadioAsr
                    key={index}
                    item={item}
                    handleShow={handleShow}
                    handleShowStatus={handleShowStatus}
                />
            ))}
        </Row>
    );
};

export default OneFloor;
