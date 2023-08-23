import { IObject } from "../../interfaces";
import { objectsMainApi } from "../main";

export const objectsApi = objectsMainApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllObjects: builder.query<IObject[], void>({
            query: () => ({
                url: "/",
                method: "GET",
            }),
        }),
    }),
});
