//shared/api — работа с API.

import { useLoginMutation, useRegisterMutation, useCheckQuery } from "./auth";
import { authApi } from "./auth";
import { userDescriptionApi } from "./user-description";
import { userApi } from "./users";
import { rolesApi } from "./roles";
import {
    objectsApi,
    createObject,
    getAllObjects,
    getOneObjectById,
} from "./objects";

export { authApi, userDescriptionApi, userApi, rolesApi };
export { useLoginMutation, useRegisterMutation, useCheckQuery };
export { objectsApi, createObject, getAllObjects, getOneObjectById };
