import {
    getClassCounter,
    getFlatString,
    getLastNumber,
} from "../../../helpers/index.js";

class HeadersWaterConfig {
    getTBolid_HotWater_Counter(meter, maxFlat, multiplierN) {
        return {
            name: meter.typeMeter, // Счётчик горячей воды или холодной
            id: "ID=", //ID=3540
            parentId: "ParentID=", //ParentID=2433
            className: `ClassName=${getClassCounter(meter.typeMeter)}`, // ClassName=TBolid_HotWater_Counter
            marka: "Марка счетчика=", // Марка счетчика=
            numberShleif: `Номер шлейфа=${meter.numberAsr}`, //Номер шлейфа=70
            description: `Описание=${meter.typeMeter}_${getFlatString(
                meter.flat,
                maxFlat
            )}`, //Описание=Счётчик горячей воды
            active: "Активность=Нет", // Активность=Да
            mul: `Множитель пересчета импульсов=${multiplierN}`, // Множитель пересчета импульсов=100
            refN: "Коэффициент трансформации=1", // Коэффициент трансформации=1
            intervalNe: "Допустимый интервал недостоверности счета=3600", // Допустимый интервал недостоверности счета=3600
            ser_number: `Серийный номер=${meter.numberMeter}`, // Серийный номер=214439530
            interval_rec: "Интервал записи показаний, мин=1440", // Интервал записи показаний, мин=1440
            revers: "Обратный счет=Нет", // Обратный счет=Нет
            timeBefore: "Время до потери счётчика, часов=0", // Время до потери счётчика, часов=0
            build: "Здание=-",
            pod: "Подъезд=-",
            flat: "Квартира=-",
            abonent: "Абонент=-",
            numberAbonent: "Номер счетчика у абонента=", //Номер счетчика у абонента=2
            flowGap: "Интервал отсутствия расхода, часы=0",
            flowGapTwo: "Интервал превышения расхода, часы=0",
            averageDischarge: "Допустимая величина расхода за интервал=0",
            dataBeforePoverki: "Дата предыдущей поверки, ДД.ММ.ГГГГ=",
            dataAfterPoverki: "Дата следующей поверки, ДД.ММ.ГГГГ=",
            commentOne: `Комментарий=АСР №${meter.numberKdl}/${meter.numberAsr}_секция № ${meter.section}_ этаж ${meter.floor}`,
            commentTwo: `Комментарий 2=Начальные показания : ${
                meter.sumMeter
            }/ ${meter.comment === undefined ? "" : meter.comment}`,
        };
    }
}

export default new HeadersWaterConfig();
