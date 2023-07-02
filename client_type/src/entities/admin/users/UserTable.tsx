import React from "react";
import { Table, Button } from "react-bootstrap";
import { IUsersResponse } from "../../../shared/interfaces";

interface IUserTableProps {
    isSuccess: boolean;
    data: IUsersResponse[];
    goToProfile?: (id: number) => void;
}

const UserTable: React.FC<IUserTableProps> = ({
    isSuccess,
    data,
    goToProfile,
}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Логин</th>
                    <th>Пароль</th>
                    <th>Профиль</th>
                </tr>
            </thead>
            <tbody>
                {isSuccess ? (
                    data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.login}</td>
                            <td>
                                <Button variant="warning">
                                    Сменить пароль
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => goToProfile(item.id)}
                                    variant="success"
                                >
                                    Перейти в профиль
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <></>
                )}
            </tbody>
        </Table>
    );
};

export default UserTable;
