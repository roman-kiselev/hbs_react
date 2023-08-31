import { ICardLink } from "../../interfaces";

export const cardElectricalConfig: ICardLink[] = [
    {
        title: "Стандарт",
        subtitle: "Старое",
        textCard: "Обычное добавление для электроэнергии",
        to: [
            {
                title: "Вперёд",
                link: "addElectricalTest",
            },
        ],
    },
    {
        title: "Добавить счётчики воды",
        subtitle: "Болид (АСР-2)- Онлайн",
        textCard:
            "Добаляются счётчики горячей и холодной воды(Нечётный канал- холодная, чётный - горячая)",
        to: [
            {
                title: "Онлайн",
                link: "addMetersAsrTwo",
            },
        ],
    },
    // {
    //     title: "Список счётчиков",
    //     subtitle: "По КДЛ",
    //     textCard: "Представлен список счётчиков",
    //     to: [
    //         {
    //             title: "Карточками",
    //             link: "addMetersAsrTwo",
    //         },
    //         {
    //             title: "Таблицей",
    //             link: "addMetersAsrTwo",
    //         },
    //     ],
    // },

    // {
    //     title: "Операции",
    //     subtitle: "Различные варианты",
    //     textCard: "Скачать шаблон, добавить список и т.д",
    //     to: [
    //         {
    //             title: "Перейти",
    //             link: "addMetersAsrTwo",
    //         },
    //     ],
    // },
];
