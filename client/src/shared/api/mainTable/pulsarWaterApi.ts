import { IPulsarDevice } from "../../interfaces";
import { api } from "../main";

interface IQuery {
    objectBuildId: number;
}

const pulsarWaterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllDevices: builder.query<IPulsarDevice[], IQuery>({
            query: (objectBuildId) => ({
                url: "/pulsarWater",
                method: "GET",
                params: objectBuildId,
            }),
        }),
    }),
});

export { pulsarWaterApi };
