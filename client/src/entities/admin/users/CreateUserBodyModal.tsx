import React from "react";
import { Form, Row } from "react-bootstrap";
import { InputStringFormGroup } from "../../../shared/ui";

interface ICreateUserBodyModal {
    login: string;
    password: string;
    handleInputChangeLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isError: boolean;
    isLoading: boolean;
    dataError: string;
}

const CreateUserBodyModal: React.FC<ICreateUserBodyModal> = ({
    login,
    password,
    handleInputChangeLogin,
    handleInputChangePassword,
    isError,
    isLoading,
    dataError,
}) => {
    return (
        <Row>
            <Form>
                <Row>
                    <InputStringFormGroup
                        disabled={false}
                        onChange={(e) => handleInputChangeLogin(e)}
                        title="Логин"
                        value={login}
                    />
                    <InputStringFormGroup
                        disabled={false}
                        onChange={(e) => handleInputChangePassword(e)}
                        title="Пароль"
                        value={password}
                    />
                </Row>
                {isError && <h6>{dataError}</h6>}
            </Form>
        </Row>
    );
};

export default CreateUserBodyModal;
