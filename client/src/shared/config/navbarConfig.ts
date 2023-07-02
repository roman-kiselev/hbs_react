import { INavLinkAskueProps } from "../interfaces";
import { EnRole } from "./enumRole";
const configNav: INavLinkAskueProps[] = [
    {
        title: "Главная",
        to: "/",
        accessFor: [EnRole.USER, EnRole.ADMIN],
    },
    {
        title: "Test",
        to: "/two",
        accessFor: [EnRole.USER, EnRole.ADMIN],
    },
    {
        title: "Управление",
        to: "/managment",
        accessFor: [EnRole.MANAGER, EnRole.ADMIN],
    },
    {
        title: "Менеджер",
        to: "/manager",
        accessFor: [EnRole.MANAGER, EnRole.ADMIN],
    },
    {
        title: "Администратор",
        to: "/admin",
        accessFor: [EnRole.ADMIN],
    },
];

export default configNav;
