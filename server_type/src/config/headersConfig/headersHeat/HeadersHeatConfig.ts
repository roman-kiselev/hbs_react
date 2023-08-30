import { getFlatString } from "../../../lib";

class HeadersHeatConfig {
    getTMBusUniversal_Heat_Counter(flat, numberMeter, section, floor, maxFlat) {
        return {
            name: `Счётчик тепла`,
            id: "ID=",
            parentId: "ParentID=",
            className: "ClassName=TMBusUniversal_Heat_Counter",
            address: "Адрес=0",
            description: `Описание=Счётчик тепла_${getFlatString(
                flat,
                maxFlat
            )}`,
            active: "Активность=Нет",
            surveyOn: "Опрос по=Опросному номеру",
            samplingFrequency: "Частота опроса, минуты=600",
            recordingInterval: "Интервал записи показаний, мин=1440",
            transformationRatio: "Коэффициент трансформации=0.000000859845",
            fixedTransformationRatio:
                "Фиксированный коэффициент трансформации=Вт*ч в Гкал",
            units: "Единицы измерения=Гкал",
            expenseAddress: "Адрес расхода=",
            interrogationNumber: `Опросный номер=${numberMeter}`,
            building: "Здание=-",
            entrance: "Подъезд=-",
            flat: "Квартира=-",
            subscriber: "Абонент=-",
            counterNumber: "Номер счетчика у абонента=",
            noFlowInterval: "Интервал отсутствия расхода, часы=0",
            overflowInterval: "Интервал превышения расхода, часы=0",
            permissibleFlowRate: "Допустимая величина расхода за интервал=0",
            dateOfPreviousVerification: "Дата предыдущей поверки, ДД.ММ.ГГГГ=",
            dateOfNextVerification: "Дата следующей поверки, ДД.ММ.ГГГГ=",
            commentOne: `Комментарий=Секция ${section}`,
            commentTwo: `Комментарий 2= Этаж ${floor}`,
        };
    }

    getTMagicDevice_Teplo_Counter(flat, numberMeter, section, floor, maxFlat) {
        return {
            name: `Weser, Пульсар_ ${flat}`,
            id: "ID=",
            parentId: "ParentID=",
            className: "ClassName=TMagicDevice_Teplo_Counter",
            magicXml: "MagicXML=weser_pulsar_heatmeter.device",
            idef: "idef=WESER_PULSAR",
            address: `Адрес=${numberMeter}`,
            description: `Описание=Weser, Пульсар_ ${getFlatString(
                flat,
                maxFlat
            )}`,
            active: "Активность=Нет",
            samplingFrequency: "Частота опроса, минуты=600",
            recordingInterval: "Интервал записи показаний, мин=1440",
            transformationRatio: "Коэффициент трансформации=1",
            serialNumber: "Серийный номер=",
            building: "Здание=-",
            entrance: "Подъезд=-",
            flat: "Квартира=-",
            subscriber: "Абонент=-",
            counterNumber: "Номер счетчика у абонента=",
            noFlowInterval: "Интервал отсутствия расхода, часы=0",
            overflowInterval: "Интервал превышения расхода, часы=0",
            dateOfPreviousVerification: "Дата предыдущей поверки, ДД.ММ.ГГГГ=",
            dateOfNextVerification: "Дата следующей поверки, ДД.ММ.ГГГГ=",
            commentOne: `Комментарий=Секция ${section}`,
            commentTwo: `Комментарий 2= Этаж ${floor}`,
        };
    }
}

export default new HeadersHeatConfig();
