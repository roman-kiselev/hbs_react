import React from "react";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "../../../shared/hooks";
import { IRole } from "../../../shared/interfaces";

interface IToastListRolesProps {
    data: IRole[];
    handleAddRole: (e, nameRole: string) => void;
}

const ToastListRoles: React.FC<IToastListRolesProps> = ({
    data,
    handleAddRole,
}) => {
    const { roles } = useAppSelector((store) => store.oneUser);

    if (data.length === 0) {
        return <ListGroup.Item disabled={true}>Список пуст</ListGroup.Item>;
    }

    const disabledRole = (name: string) => {
        const result = roles.find((role) => role.name === name);
        if (result) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            {roles ? (
                data.map((role, index) => (
                    <ListGroup.Item
                        disabled={disabledRole(role.name)}
                        onClick={(e) => handleAddRole(e, role.name)}
                        key={role.id}
                        action
                    >
                        {index + 1}. {role.name}
                    </ListGroup.Item>
                ))
            ) : (
                <ListGroup.Item disabled={true}>Список пуст</ListGroup.Item>
            )}
        </>
    );
};

export default ToastListRoles;
