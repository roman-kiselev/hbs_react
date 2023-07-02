import React from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router";
import { FormRowsOneUser, LoadingSpin } from "../../../entities";
import { userApi } from "../../../shared/api";
import { IUsersResponse } from "../../../shared/interfaces";
import { ButtonGoBack } from "../../../shared/ui/buttons";

const OneUserForm = () => {
    const { userId } = useParams();

    const { isSuccess, isError, data } = userApi.useGetUserByIdQuery(userId);

    return (
        <>
            <Row>
                <ButtonGoBack />
            </Row>
            {isSuccess ? (
                <FormRowsOneUser />
            ) : (
                <LoadingSpin variant="primary" />
            )}
        </>
    );
};

export default OneUserForm;
