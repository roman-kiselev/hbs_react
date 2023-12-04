import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import MenuOneObject from "../components/addMeters/leftMenu/MenuOneObject";
import { setShow } from "../shared/models";

const DescriptionObject = () => {
    let { id } = useParams();
    const dispatch = useDispatch();

    const { show } = useSelector((state) => state.leftMenu);

    const handleClose = () => dispatch(setShow(false));
    const handleShow = () => dispatch(setShow(true));

    return (
        <Row className="m-1">
            <Button
                variant="primary"
                className="d-lg-none"
                onClick={handleShow}
            >
                Открыть меню
            </Button>

            <Col className="col-xl-2">
                <MenuOneObject
                    id={id}
                    show={show}
                    handleClose={() => handleClose()}
                />
            </Col>
            <Col className="col-12 col-xl-9 justify-content-center mt-3">
                <Row>
                    <Outlet />
                </Row>
            </Col>
        </Row>
    );
};

export default DescriptionObject;
