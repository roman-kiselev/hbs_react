import React from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import DropdownMenu from "./DropdownMenu";

interface IProfile {
    img?: string;
    name?: string;
}

const Profile: React.FC<IProfile> = ({ img, name }) => {
    return (
        <Col className="d-flex align-items-center justify-content-end">
            <Row className="profile-container d-flex align-items-center">
                <Col>
                    {img ? (
                        <img
                            src="img"
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <> </>
                    )}
                    {name ? <Col className="m-4">{name}</Col> : <>User </>}
                </Col>

                <Col>
                    <DropdownMenu />
                </Col>
            </Row>
        </Col>
    );
};

export default Profile;
