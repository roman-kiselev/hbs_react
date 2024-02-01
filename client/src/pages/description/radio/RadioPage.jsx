import { useState } from "react";
import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Container,
    Row,
    Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OneFloor } from "../../../entities/radio";
import FloorsOffCanvas from "../../../entities/radio/FloorsOffCanvas";
import { objectsApi } from "../../../shared/api/objects";
import { waterApi } from "../../../shared/api/water";
import { getOneMeter } from "../../../shared/models/testMeterWater/testWaterMeterSlice";
import CardMeterEditModal from "../../../shared/ui/modals/CardMeterEditModal";
import ModalRadioAsr from "../../../shared/ui/modals/ModalRadioAsr";

const checkRadio = (arr, id) => {
    if (arr !== undefined || arr !== null || arr.length > 0) {
        const findedItem = arr.find((item) => item.id == id);
        if (!findedItem) {
            return false;
        }
        return findedItem.radio;
    }
    return false;
};

const RadioPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: arrObjects, isLoading: isLoadingObject } =
        objectsApi.useGetAllObjectsQuery();

    const { listMetersRadio, selectedFloors } = useSelector(
        (store) => store.water
    );
    const {
        data: dataArrLine,
        isLoading: isLoadingDataArrLine,
        refetch: refetchLine,
    } = waterApi.useGetLineMeterOneFloorQuery({
        id,
        floor: selectedFloors,
    });

    const { data: uniqSection, isLoading: isLoadingUniqSection } =
        objectsApi.useGetUniqSectionQuery({
            objectBuildId: id,
        });
    const [stateSection, setStateSection] = useState(null);
    const {
        data: dataFloors,
        isLoading: isLoadingFloors,
        refetch,
    } = objectsApi.useGetUniqFloorsQuery({
        objectBuildId: id,
        numberSection: stateSection,
    });
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
    };
    const handleShowOffcanvas = (numberSection) => {
        refetch();
        setStateSection(numberSection);
        setShowOffcanvas(true);
    };

    const [selectedMeter, setSelectedMeter] = useState(null);
    const [show, setShow] = useState(false);

    const [dataForStatus, setDataForStatus] = useState(null);
    const [showStatus, setShowStatus] = useState(false);
    const handleCloseStatus = () => {
        refetchLine();
        setShowStatus(false);
    };
    const handleShowStatus = (data) => {
        setDataForStatus(data);
        setShowStatus(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedMeter(null);
    };

    const handleShow = (data) => {
        setSelectedMeter(data);
        setShow(true);
    };

    // const { objects } = useSelector((store) => store.objectBuilds.objectsBuild);

    // Получаем по номеру этажа отсортированные данные
    const { data, isLoading } = waterApi.useGetUniqueFloorsQuery({ id });
    //const radio = true;
    if (isLoading || isLoadingObject) {
        return <Spinner animation="border" />;
    }

    const radio = checkRadio(arrObjects.objects, id);

    const handleClickForEdit = (formData, formQuery, handleClose) => {
        try {
            dispatch(getOneMeter({ formData })).then((d) => {
                handleClose();
                refetchLine();
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            {selectedMeter && (
                <CardMeterEditModal
                    show={show}
                    handleClose={handleClose}
                    data={selectedMeter}
                    handleClickForEdit={handleClickForEdit}
                />
            )}
            {dataForStatus && (
                <ModalRadioAsr
                    dataForStatus={dataForStatus}
                    handleCloseStatus={handleCloseStatus}
                    showStatus={showStatus}
                    refetch={refetchLine}
                />
            )}

            {stateSection !== null ? (
                <FloorsOffCanvas
                    show={showOffcanvas}
                    handleClose={handleCloseOffcanvas}
                    numberSection={stateSection}
                    objectBuildId={id}
                    dataFloors={dataFloors}
                />
            ) : null}
            <Row>
                <h6>Секции</h6>
                {uniqSection ? (
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="First group">
                            {uniqSection.map((item) => (
                                <Button
                                    onClick={() =>
                                        handleShowOffcanvas(item.section)
                                    }
                                    key={item.section}
                                >
                                    {item.section}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </ButtonToolbar>
                ) : null}
            </Row>

            {radio && listMetersRadio !== null && listMetersRadio.length > 0 ? (
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <OneFloor
                        id={id}
                        numberFloor={selectedFloors}
                        handleShow={handleShow}
                        handleShowStatus={handleShowStatus}
                        data={listMetersRadio}
                    />
                </Row>
            ) : null}
        </Container>
    );
};

export default RadioPage;
