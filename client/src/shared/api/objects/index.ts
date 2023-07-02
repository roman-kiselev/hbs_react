import { IObject } from "../../interfaces/store";
import { objectsMainApi } from "../main";

interface CreateObjectDto {
    name: string;
    address: string;
}

export const objectsApi = objectsMainApi.injectEndpoints({
    endpoints: (builder) => ({
        // Создаём объект
        createObject: builder.mutation<IObject, CreateObjectDto>({
            query: (dto) => ({
                url: "/objects-building",
                method: "POST",
                body: dto,
            }),
        }),

        // Получаем все объекты
        getAllObjects: builder.query<IObject[], void>({
            query: () => ({
                url: "/objects-building",
                method: "GET",
            }),
        }),
        // Получаем объект по id
        getOneObjectById: builder.query<IObject, string>({
            query: (id) => ({
                url: `/objects-building/${id}`,
                method: "GET",
            }),
        }),
    }),
});
