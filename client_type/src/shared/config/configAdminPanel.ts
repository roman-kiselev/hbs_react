import { IConfigAdmin } from "../interfaces";

const configAdminPanel: IConfigAdmin[] = [
    {
        title: "Главная",
        action: true,
        to: "",
        disabled: false,
        variant: "info",
    },
    {
        title: "Пользователи",
        action: true,
        to: "users",
        disabled: false,
        variant: "info",
    },
    {
        title: "Sub",
        action: true,
        to: "sub",
        disabled: false,
        variant: "info",
    },
];

export default configAdminPanel;
