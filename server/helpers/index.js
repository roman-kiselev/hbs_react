// Функция принимает число и возвращает строку с нулями
export const getFlatString = (num, maxNum) => {
    let lengthNum = num.toString().length;
    let maxNumLength = maxNum.toString().length;
    if (maxNumLength === lengthNum) {
        return num.toString();
    } else {
        return num.toString().padStart(maxNumLength, "0");
    }
};

// Функция принимает число и возращает последние n цифр
export const getLastNumber = (num, n) => {
    return num.toString().substring(num.toString().length - n);
};

// Функция принимает тип счётчика холодной или горячей воды и возвращает класс счётчика
export const getClassCounter = (type) => {
    if (type === "Счётчик холодной воды") {
        return "TBolid_ColdWater_Counter";
    } else if (type === "Счётчик горячей воды") {
        return "TBolid_HotWater_Counter";
    }
};

// Помощь функции findFlat
export const getResourse = (arr, typeMeter) => {
    const parity = typeMeter === "Счётчик горячей воды" ? true : false;
    const parityLength = arr.length % 2;

    let resourse;
    console.log(`Я тут ${typeMeter} ${parity} ${parityLength}`);
    if (parity && parityLength === 0) {
        return `Объём${arr.length * 2 + 2}(м3)`;
    } else if (!parity && parityLength !== 0) {
        console.log(`Я тут ${typeMeter} ${parity}`);
        return `Объём${arr.length * 2 + 1}(м3)`;
    } else if (parity && parityLength !== 0) {
        console.log(arr.length);
        return `Объём${arr.length * 2 + 2}(м3)`;
    } else if (!parity && parityLength === 0) {
        return `Объём${arr.length * 2 + 1}(м3)`;
    }
};

// Выполняет поиск квартиры в массиве
const findFlat = (arr, flat, typeMeter) => {
    // Если массив пуст
    if (arr.length === 0) {
        if (typeMeter === "Счётчик холодной воды") {
            return "Объём1(м3)";
        } else if (typeMeter === "Счётчик горячей воды") {
            return "Объём2(м3)";
        }
    }
    // Если массив не пуст
    // массив с повторяющимися типами
    let resourse = [];
    let result;
    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].flat === flat && arr[i].typeMeter === typeMeter) {
                // Если есть квартира и тип складываем в массив

                //console.log(arr[i]);
                resourse.push(arr[i]);
            } else if (arr[i].flat === flat && arr[i].typeMeter !== typeMeter) {
                // Если квартира есть в массиве но такого типа у массива нет
                if (typeMeter === "Счётчик холодной воды") {
                    result = "Объём1(м3)";
                    //return "Объём1(м3)";
                } else if (typeMeter === "Счётчик горячей воды") {
                    //return "Объём2(м3)";
                    result = "Объём2(м3)";
                }
            } else if (arr[i].flat !== flat && arr[i].typeMeter !== typeMeter) {
                // Если нет квартиры и нет массива с такими типами
                if (typeMeter === "Счётчик холодной воды") {
                    //return "Объём1(м3)";
                    result = "Объём1(м3)";
                } else if (typeMeter === "Счётчик горячей воды") {
                    //return "Объём2(м3)";
                    result = "Объём2(м3)";
                }
            }
        }

        // Теперь смотрим что есть в массиве
        if (resourse.length > 0) {
            const res = getResourse(resourse, typeMeter);
            result = res;
        }

        return result;
    }
};

export const changeArrMeter = (arr) => {
    let newArr = [];

    const changeArr = arr.map((item) => {
        const {
            id,
            section,
            floor,
            flat,
            numberKdl,
            numberAsr,
            numberMeter,
            sumMeter,
            typeMeter,
        } = item;

        const params = findFlat(newArr, flat, typeMeter);
        newArr.push({
            id,
            section,
            floor,
            flat,
            numberKdl,
            numberAsr,
            numberMeter,
            sumMeter,
            typeMeter,
            params,
        });
        console.log(newArr);

        return {
            id,
            section,
            floor,
            flat,
            numberKdl,
            numberAsr: `Канал${numberAsr}`,
            numberMeter,
            sumMeter,
            typeMeter,
            params,
        };
    });

    return changeArr;
};
