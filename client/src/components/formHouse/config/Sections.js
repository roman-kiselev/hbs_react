class Sections {
    // Здесь управляем одной секцией
    constructor({ numberSection, sumFloors, lines, typeAsr }) {
        this.numberSection = numberSection;
        this.sumFloors = sumFloors;
        this.lines = lines;
        this.typeAsr = typeAsr;
        this.isAsr2 = this.typeAsr.includes("ASR2");
        this.isAsr8 = this.typeAsr.includes("ASR8");
        this.arrFloors = this.createArrFloors();
    }

    // let s = [
    //     {
    //         numberFloor: 1,
    //         numberKdl: 1,
    //         typeAsr: ["ASR2", "ASR8"],
    //         line: [
    //             {
    //                 numberLine: 1,
    //                 numberKdl: 1,
    //                 asr: {
    //                     numberAsr: 1,
    //                     channels: [
    //                         {
    //                             channel: 1,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик холодной воды",
    //                             sumMeter: "0.1",
    //                         },
    //                         {
    //                             channel: 2,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик горячей воды",
    //                             sumMeter: "0.1",
    //                         }
    //                     ]
    //                 }
    //             },
    //             {
    //                 numberLine: 2,
    //                 numberKdl: 1,
    //                 asr: {
    //                     numberAsr: 1,
    //                     channels: [
    //                         {
    //                             channel: 1,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик холодной воды",
    //                             sumMeter: "0.1",
    //                         },
    //                         {
    //                             channel: 2,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик горячей воды",
    //                             sumMeter: "0.1",
    //                         }
    //                     ]
    //                 }
    //             }

    //         ]
    //     },
    //     {
    //         numberFloor: 2,
    //         numberKdl: 1,
    //         typeAsr: ["ASR2", "ASR8"],
    //         line: [
    //             {
    //                 numberLine: 1,
    //                 numberKdl: 1,
    //                 asr: {
    //                     numberAsr: 1,
    //                     channels: [
    //                         {
    //                             channel: 1,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик холодной воды",
    //                             sumMeter: "0.1",
    //                         },
    //                         {
    //                             channel: 2,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик горячей воды",
    //                             sumMeter: "0.1",
    //                         }
    //                     ]
    //                 }
    //             },
    //             {
    //                 numberLine: 2,
    //                 numberKdl: 1,
    //                 asr: {
    //                     numberAsr: 1,
    //                     channels: [
    //                         {
    //                             channel: 1,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик холодной воды",
    //                             sumMeter: "0.1",
    //                         },
    //                         {
    //                             channel: 2,
    //                             numberKdl: 1,
    //                             numberAsr: 1,
    //                             typeAsr: "ASR2",
    //                             numberMeter: "1234541",
    //                             typeMeter: "Счётчик горячей воды",
    //                             sumMeter: "0.1",
    //                         }
    //                     ]
    //                 }
    //             }

    //         ]
    //     },
    // ]

    // Создаём этажи для одной секции
    createArrFloors() {
        const arrFloors = [];
        for (let i = 0; i < this.sumFloors; i++) {
            arrFloors.push({
                numberFloor: i + 1,
                lines: [],
                typeAsr: this.typeAsr,
            });
        }
        return arrFloors;
    }
    // Возвращаем массив этажей
    getArrFloors() {
        return this.arrFloors;
    }

    dataCount() {
        // Общий счётчик аср8
        let countAsr8 = 0;
        // Общий счётчик аср2
        let countAsr2 = 0;
        // Количество каналов
        let countChannels = 0;
        // Общий счётчик КДЛ
        let countKdl = 1;
        // Счётчиков на одной линии
        let amountMetersOnLine = 2;
        // Счётчиков на всех линиях
        let amountMetersOnLineAll = amountMetersOnLine * this.lines;
        // Каналов на аср8
        let channelsOnAsr8 = 8;
        // Каналов на аср2
        let channelsOnAsr2 = 2;
        // Счётчиков на аср8
        let metersOnAsr8 = channelsOnAsr8;
        // Счётчиков на аср2
        let metersOnAsr2 = channelsOnAsr2;
        if (this.isAsr2 && this.isAsr8) {
            // for (let i = 0; i < this.sumFloors; i++) {

            // }
            let lineAsr8 = amountMetersOnLineAll % metersOnAsr8;

            // Если делится на 8 без остатка
            if (lineAsr8 === 0) {
                let countAsr8OnLine = amountMetersOnLineAll / metersOnAsr8;

                // Если произведение кол.каналов и  количество аср8 минус 126 каналов больше
                // Чем насчитанное количество каналов далее не пропускаем

                if (countChannels <= 126 - channelsOnAsr8 * countAsr8) {
                    countAsr8 = countAsr8OnLine + countAsr8;
                    countChannels = countChannels + channelsOnAsr8 * countAsr8;
                }
            } else {
            }
        }
    }
}

export default Sections;
