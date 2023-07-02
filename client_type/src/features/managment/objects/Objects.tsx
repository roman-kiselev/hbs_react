import React from "react";
import { CreateObject } from "../../../entities";
import { useAppSelector } from "../../../shared/hooks";

const Objects = () => {
    const { name, address } = useAppSelector((store) => store.createObject);

    return (
        <>
            <CreateObject handleAction={() => {}} />
        </>
    );
};

export default Objects;
