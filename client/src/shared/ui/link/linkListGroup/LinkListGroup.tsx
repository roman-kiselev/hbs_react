import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ILinkItemGroupProps } from "../../../interfaces";

const LinkItemGroup: React.FC<ILinkItemGroupProps> = ({
    action,
    title,
    to,
    disabled,
    variant,
}) => {
    return (
        <Link style={{ textDecoration: "none" }} to={to}>
            <ListGroup.Item
                action={action}
                variant={variant}
                disabled={disabled}
            >
                {title}
            </ListGroup.Item>
        </Link>
    );
};

export default LinkItemGroup;
