import React from "react";
import { ListGroup } from "react-bootstrap";
import { IConfigAdmin } from "../../shared/interfaces";
import { LinkItemGroup } from "../../shared/ui";

interface ILinkListGroupProps {
    configList: IConfigAdmin[];
}

const LinkGroup: React.FC<ILinkListGroupProps> = ({ configList }) => {
    return (
        <>
            <ListGroup>
                {configList.map((item, index) => (
                    <LinkItemGroup
                        title={item.title}
                        to={item.to}
                        action={item.action}
                        variant={item.variant}
                        disabled={item.disabled}
                        key={index}
                    />
                ))}
            </ListGroup>
        </>
    );
};

export default LinkGroup;
