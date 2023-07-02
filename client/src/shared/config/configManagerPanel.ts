import { IConfigAdmin } from "../interfaces";

const configManagerPanel: IConfigAdmin[] = [
    {
        title: "Главная",
        action: true,
        to: "",
        disabled: false,
        variant: "info",
    },
    {
        title: "Просчёты",
        action: true,
        to: "createCounting",
        disabled: false,
        variant: "info",
    },
    {
        title: "Заявки",
        action: true,
        to: "createCounting",
        disabled: false,
        variant: "info",
    },
    {
        title: "Объекты",
        action: true,
        to: "objects",
        disabled: false,
        variant: "info",
    },
    {
        title: "Склады",
        action: true,
        to: "sub",
        disabled: false,
        variant: "info",
    },
    {
        title: "Товар",
        action: true,
        to: "sub",
        disabled: false,
        variant: "info",
    },
    {
        title: "Траспортные компании",
        action: true,
        to: "sub",
        disabled: false,
        variant: "info",
    },
];

export default configManagerPanel;
