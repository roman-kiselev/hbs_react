import React from "react";
import { ButtonAndModalAddObject } from "../../entities";
import { objectsApi } from "../../shared/api";
import { useAppDispatch, useAppSelector } from "../../shared/hooks";
import { setDescription, setName } from "../../shared/models";
const AddObject = () => {
    const dispatch = useAppDispatch();
    const [fileState, setStateFile] = React.useState<File>(null);
    const { name, description } = useAppSelector((store) => store.createObject);
    const [addNewObjectHook, { isError, error }] =
        objectsApi.useCreateObjectMutation();
    const addNewObject = async () => {
        const dto = {
            name,
            description,
            img: fileState,
        };
        const result = await addNewObjectHook(dto);
        if (result) {
            dispatch(setName(""));
            dispatch(setDescription(""));
        }
    };

    return (
        <>
            <ButtonAndModalAddObject
                handleAddObject={addNewObject}
                setStateFile={setStateFile}
            />
        </>
    );
};

export default AddObject;
