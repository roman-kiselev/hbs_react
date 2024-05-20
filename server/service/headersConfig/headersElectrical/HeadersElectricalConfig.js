import { getFlatString, getLastNumber } from "../../../helpers/index.js";

class HeadersElectricalConfig {
    getTMagicDevice_RS485_Interface(
        flat,
        numberMeter,
        section,
        floor,
        maxFlat
    ) {
        return {
            name: "Энергомера СЕ102-S6/R5 AK",
            id: "ID=",
            parentId: "ParentID=",
            className: "ClassName=TMagicDevice_Electro_Counter",
            magicXML: "MagicXML=energomera3.device",
            idef: "idef=ENERGOMERA102R5",
            address: `Адрес=${getLastNumber(numberMeter, 5)}`,
            password: "Пароль=0",
            description: `Описание=Энергомера СЕ102-S6/R5 AK_${getFlatString(
                flat,
                maxFlat
            )}`,
            active: "Активность=Нет",
            samplingFrequency: "Частота опроса, минуты=60",
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
            permissibleFlowRate: "Допустимая величина расхода за интервал=0",
            dateOfPreviousVerification: "Дата предыдущей поверки, ДД.ММ.ГГГГ=",
            dateOfNextVerification: "Дата следующей поверки, ДД.ММ.ГГГГ=",
            commentOne: `Комментарий=Секция ${section}`,
            commentTwo: `Комментарий 2= Этаж ${floor}`,
            addressPc: "Адрес компьютера=253",
        };
    }
    getTMagicDevice_RS485_InterfaceMercurii(
        flat,
        numberMeter,
        section,
        floor,
        maxFlat
    ) {
        return {
            name: "Меркурий 200",
            id: "ID=",
            parentId: "ParentID=",
            className: "ClassName=TMagicDevice_Electro_Counter",
            magicXML: "MagicXML=mercurii206_200.device",
            idef: "idef=MERCURII_200",
            active: "Активность=Нет",
            description: `Описание=Меркурий 200_${getFlatString(
                flat,
                maxFlat
            )}`,
            samplingFrequency: "Частота опроса, минуты=60",
            recordingInterval: "Интервал записи показаний, мин=1440",
            transformationRatio: "Коэффициент трансформации=1",
            address: `Адрес=${getLastNumber(numberMeter, 6)}`,
            building: "Здание=-",
            entrance: "Подъезд=-",
            flat: "Квартира=-",
            subscriber: "Абонент=-",
            commentOne: `Комментарий=Секция ${section}`,
            commentTwo: `Комментарий 2= Этаж ${floor}`,
        };
    }
}

export default new HeadersElectricalConfig();
