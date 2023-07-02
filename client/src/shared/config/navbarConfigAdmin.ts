import { INavLinkAskueProps } from "../interfaces";
import { EnRole } from "./enumRole";
const configNavAdmin: INavLinkAskueProps[] = [
    {
        title: "Главная",
        to: "/",
        accessFor: [EnRole.USER, EnRole.ADMIN],
    },
    {
        title: "Меню",
        to: "/two",
        accessFor: [EnRole.ADMIN],
    },
    {
        title: "Контакты",
        to: "contact",
        accessFor: [EnRole.ADMIN],
    },
];

export default configNavAdmin;
