import React from "react";
import { Container, Spinner } from "react-bootstrap";

type LoadingSpinProps = {
    variant?: string;
};

const LoadingSpin: React.FC<LoadingSpinProps> = ({ variant = "" }) => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Spinner animation="border" variant={variant} />
        </Container>
    );
};

export default LoadingSpin;
