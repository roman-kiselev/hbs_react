import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ICardLink } from "../../shared/interfaces";

const CardLinkItem: React.FC<ICardLink> = ({
    title,
    subtitle,
    textCard,
    to,
}) => {
    return (
        <>
            <Card style={{ width: "18rem", margin: 10 }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {subtitle ? (
                        <Card.Subtitle className="mb-2 text-muted">
                            {subtitle}
                        </Card.Subtitle>
                    ) : null}
                    <Card.Text>{textCard}</Card.Text>
                    <Row>
                        {to.map(({ link, title }, index) => (
                            <Col key={index} style={{ margin: 2 }}>
                                <Link
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                    to={link}
                                >
                                    <Button variant="primary" size="sm">
                                        {title}
                                    </Button>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default CardLinkItem;
