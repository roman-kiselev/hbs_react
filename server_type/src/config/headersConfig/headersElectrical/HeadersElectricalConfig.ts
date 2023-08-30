import { getFlatString, getLastNumber } from "../../../lib";

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
}

export default new HeadersElectricalConfig();
