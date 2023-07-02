import React from "react";
import { Col, Row } from "react-bootstrap";
import DropdownMenu from "./DropdownMenu";

interface IProfile {
    img?: string;
    name?: string;
    logout: () => void;
}

const Profile: React.FC<IProfile> = ({ img, name, logout }) => {
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
                    {name ? <h6>{name}</h6> : <></>}
                </Col>

                <Col>
                    <DropdownMenu logout={logout} />
                </Col>
            </Row>
        </Col>
    );
};

export default Profile;
