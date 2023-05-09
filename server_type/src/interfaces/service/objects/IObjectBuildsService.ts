import { CreateObjectBuildsDto } from "../../../dto";
import ApiError from "../../../lib";
import { ObjectsBuilds } from "../../../models";

interface IObjectBuildsService {
    createObjectBuilds(
        dto: CreateObjectBuildsDto
    ): Promise<ObjectsBuilds | ApiError>;
    getAllObjectBuilds(): Promise<ObjectsBuilds[] | ApiError>;
    getObjectBuildsById(id: number): Promise<ObjectsBuilds | ApiError>;
    updateObjectBuilds(
        id: number,
        dto: CreateObjectBuildsDto
    ): Promise<ObjectsBuilds | ApiError>;
    deleteObjectBuilds(id: number): Promise<ObjectsBuilds | ApiError>;
}

export default IObjectBuildsService;
