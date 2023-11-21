import { ListGroup, Offcanvas, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShow } from "../../../shared/models/leftMenu/leftMenuSlice";
import { leftMenuItem } from "./listLeftMenu";

const MenuOneObject = ({ id, show, handleClose }) => {
    const dispatch = useDispatch();

    return (
        <Row>
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Навигация</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row xl={12} className="mt-3">
                        <ListGroup>
                            {leftMenuItem.map((item, index) => {
                                return (
                                    <Link
                                        key={item.toItem}
                                        style={{ textDecoration: "none" }}
                                        // to={`${item.toItem}?id=${id}`}
                                        to={`${item.toItem}`}
                                    >
                                        <ListGroup.Item
                                            action={item.action}
                                            variant={item.variant}
                                            onClick={() =>
                                                dispatch(setShow(false))
                                            }
                                        >
                                            {item.title}
                                        </ListGroup.Item>
                                    </Link>
                                );
                            })}
                        </ListGroup>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </Row>
    );
};

export default MenuOneObject;
