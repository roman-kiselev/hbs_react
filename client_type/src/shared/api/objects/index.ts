import { IObject } from "../../interfaces/store";
import { objectsMainApi } from "../main";

interface CreateObjectDto {
    name: string;
    description: string;
    img: File;
}

export const objectsApi = objectsMainApi.injectEndpoints({
    endpoints: (builder) => ({
        // Создаём объект
        createObject: builder.mutation<IObject, CreateObjectDto>({
            query: (dto) => {
                const formData = new FormData();
                formData.append("name", dto.name);
                formData.append("description", dto.description);
                formData.append("img", dto.img);
                return {
                    url: "/object",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        // Получаем все объекты
        getAllObjects: builder.query<IObject[], void>({
            query: () => ({
                url: "/object",
                method: "GET",
            }),
        }),
        // Получаем объект по id
        getOneObjectById: builder.query<IObject, string>({
            query: (id) => ({
                url: `/object/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { createObject, getAllObjects, getOneObjectById } =
    objectsApi.endpoints;
