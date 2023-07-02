import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
    ChangePassword,
    FormRowsOneUser,
    ListGroupRoles,
    LoadingSpin,
    RowUser,
    RowUserDescription,
} from "../../../entities";
import { rolesApi, userApi } from "../../../shared/api";
import { useAppSelector } from "../../../shared/hooks";
import { ButtonGoBack } from "../../../shared/ui/buttons";

const OneUserForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { isSuccess } = userApi.useGetUserByIdQuery(userId);
    const { data: arrRoles } = rolesApi.useGetAllRolesQuery();
    const [addRole, { isError: isErrorAddRole, error: errorAddRole }] =
        userApi.useAddRoleToUserMutation();
    const { user, userDescriptions, roles } = useAppSelector(
        (store) => store.oneUser
    );
    const [delUser] = userApi.useDelUserByIdMutation();
    const [delRoleForUser] = userApi.useDelRoleToUserMutation();

    const handleAddRole = (e, nameRole: string) => {
        e.preventDefault();
        addRole({
            id: Number(userId),
            name: nameRole,
        });
        if (isErrorAddRole) {
            console.log(errorAddRole);
        }
    };

    const handleDel = async () => {
        await delUser(userId);
        navigate(-1);
    };
    const handleDelRole = async (nameRole: string) => {
        await delRoleForUser({
            id: Number(userId),
            name: nameRole,
        });
    };

    return (
        <>
            <Row>
                <ButtonGoBack />
            </Row>
            {isSuccess ? (
                <FormRowsOneUser onClick={handleDel}>
                    <Row>
                        <RowUser user={user} />
                        <ChangePassword />
                    </Row>
                    <Row>
                        <RowUserDescription {...userDescriptions} />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            {/* {isLoadingRoles ? (
                                <LoadingSpin variant="warning" />
                            ) : (
                                <ListGroupRoles
                                    roleUser={roles}
                                    dataAllRoles={arrRoles ? arrRoles : []}
                                    handleAddRole={handleAddRole}
                                />
                            )} */}
                            <ListGroupRoles
                                roleUser={roles}
                                dataAllRoles={arrRoles ? arrRoles : []}
                                handleAddRole={handleAddRole}
                                onDelete={handleDelRole}
                            />
                        </Col>
                    </Row>
                </FormRowsOneUser>
            ) : (
                <LoadingSpin variant="primary" />
            )}
        </>
    );
};

export default OneUserForm;
