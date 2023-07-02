import React from "react";
import { Row } from "react-bootstrap";
import { IUserDescription } from "../../../shared/interfaces";
import { InputStringFormGroup } from "../../../shared/ui";

// interface IRowUserDescriptionProps {
//     data: IUserDescription;
// }

const RowUserDescription: React.FC<IUserDescription> = ({
    name = "",
    lastName = "",
    post = "",
    email = "",
}) => {
    return (
        <>
            <Row className="mb-3">
                <InputStringFormGroup
                    disabled={false}
                    title="Имя"
                    value={name}
                    onChange={() => {}}
                />
                <InputStringFormGroup
                    disabled={false}
                    title="Фамилия"
                    value={lastName}
                    onChange={() => {}}
                />
            </Row>

            <Row className="mb-3">
                <InputStringFormGroup
                    disabled={false}
                    title="Должность"
                    value={post}
                    onChange={() => {}}
                />
                <InputStringFormGroup
                    disabled={false}
                    title="Почта"
                    value={email}
                    onChange={() => {}}
                />
            </Row>
        </>
    );
};

export default RowUserDescription;
