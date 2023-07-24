import { IConfigAdmin } from "../interfaces";

const configPanel: IConfigAdmin[] = [
    {
        title: "Главная",
        action: true,
        to: "",
        disabled: false,
        variant: "info",
    },
    {
        title: "Вода",
        action: true,
        to: "water",
        disabled: false,
        variant: "info",
    },
    {
        title: "Тепло",
        action: true,
        to: "heat",
        disabled: false,
        variant: "info",
    },
    {
        title: "Электроэнергия",
        action: true,
        to: "electrics",
        disabled: false,
        variant: "info",
    },
];

export default configPanel;
