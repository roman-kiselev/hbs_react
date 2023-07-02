import { INavLinkAskueProps } from "../interfaces";
import { EnRole } from "./enumRole";
const configNav: INavLinkAskueProps[] = [
    {
        title: "Главная",
        to: "/",
        accessFor: [EnRole.USER, EnRole.ADMIN],
    },
    {
        title: "Вторая",
        to: "/two",
        accessFor: [EnRole.USER, EnRole.ADMIN],
    },
    {
        title: "Администратор",
        to: "/admin",
        accessFor: [EnRole.ADMIN],
    },
];

export default configNav;
