interface IMeter {
    id: string;
    section: string;
    floor: string;
    flat: string;
    numberKdl: string;
    numberAsr: string;
    sumMeter: string;
    typeMeter: string;
}

interface IMeterPlusParams extends IMeter {
    params: string;
}

const changeMeter = (arr: IMeter[]) => {
    let saveArr: IMeterPlusParams[] = [];
    const newArr = arr.map((meter) => {
        const {
            id,
            flat,
            floor,
            section,
            numberAsr,
            numberKdl,
            sumMeter,
            typeMeter,
        } = meter;

        if (saveArr.length === 0) {
            if (typeMeter === "Счётчик холодной воды") {
                saveArr.push({
                    id,
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    sumMeter,
                    typeMeter,
                    params: "Объём1",
                });
            } else {
                saveArr.push({
                    id,
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    sumMeter,
                    typeMeter,
                    params: "Объём2",
                });
            }
        }

        if (saveArr.length === 2) {
            if (typeMeter === "Счётчик холодной воды") {
                saveArr.push({
                    id,
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    sumMeter,
                    typeMeter,
                    params: "Объём1",
                });
            } else {
                saveArr.push({
                    id,
                    section,
                    floor,
                    flat,
                    numberKdl,
                    numberAsr,
                    sumMeter,
                    typeMeter,
                    params: "Объём1",
                });
            }
        }
    });
};

export default changeMeter;
