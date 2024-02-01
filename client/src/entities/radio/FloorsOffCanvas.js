import { useState } from "react";
import { Button, Offcanvas, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { waterApi } from "../../shared/api/water";
import { setSelectedfloors } from "../../shared/models/water/waterSlice";

const FloorsOffCanvas = ({
    show,
    handleClose,
    numberSection,
    objectBuildId,
    dataFloors,
}) => {
    const dispatch = useDispatch();

    const [stateFloor, setStateFloor] = useState(null);

    const { data, isLoading, refetch } = waterApi.useGetLineMeterOneFloorQuery({
        id: objectBuildId,
        floor: stateFloor,
    });

    const handleClick = (numberFloor) => {
        setStateFloor(numberFloor);
        dispatch(setSelectedfloors(numberFloor));
        handleClose();
    };

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Этажи</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {dataFloors
                    ? dataFloors.map((item) => (
                          <Row style={{ margin: 2 }} key={item.floor}>
                              <Button onClick={() => handleClick(item.floor)}>
                                  {item.floor}
                              </Button>
                          </Row>
                      ))
                    : null}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default FloorsOffCanvas;
