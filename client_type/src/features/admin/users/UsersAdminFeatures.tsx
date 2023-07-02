import React from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { CreateUserModal, LoadingSpin, UserTable } from "../../../entities";
import { userApi } from "../../../shared/api";
import { useAppSelector } from "../../../shared/hooks";

const UsersAdminFeatures = () => {
    const { isSuccess } = userApi.useGetAllUsersQuery();
    const { list, isLoading } = useAppSelector((store) => store.listUser);
    const navigate = useNavigate();

    // По клику переходм в профиль по id
    const goToProfile = (id: number) => {
        navigate(`/admin/users/${id}`);
    };

    if (isLoading) {
        return <LoadingSpin variant="primary" />;
    }

    return (
        <Row>
            <h4>Список пользователей</h4>
            <Row>
                <CreateUserModal />
            </Row>
            <Row className="mt-3">
                <UserTable
                    data={list}
                    isSuccess={isSuccess}
                    goToProfile={goToProfile}
                />
            </Row>
        </Row>
    );
};

export default UsersAdminFeatures;
