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
    });
};

export default changeMeter;
