import React from "react";
import { ButtonAndModalAddObject } from "../../entities";
import { objectsApi } from "../../shared/api";
import { useAppSelector } from "../../shared/hooks";
class CreateObjectDto {
    name: string;
    description: string;
    img: File;
}

const AddObject = () => {
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
        await addNewObjectHook(dto);
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
