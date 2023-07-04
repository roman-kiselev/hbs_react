import React from "react";
import { ListObjects, LoadingSpin } from "../../entities";
import { objectsApi } from "../../shared/api";
const ListObjectsFeatures = () => {
    const {
        data: objects,
        isLoading,
        isSuccess,
    } = objectsApi.useGetAllObjectsQuery();

    if (isLoading) {
        return <LoadingSpin variant="primary" />;
    }
    return <>{isSuccess && <ListObjects objects={objects} />}</>;
};

export default ListObjectsFeatures;
