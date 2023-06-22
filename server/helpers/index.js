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

// -------------------------------------------------------------------------
// Функция проверяет есть ли квартира в массиве
const isFlat = (arr, flat) => {
    let isFlatInArr = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].flat.number === flat) {
            isFlatInArr = true;
        }
    }
    console.log(isFlatInArr);
    return isFlatInArr;
};

// // Функция возвращает первый объём
// const getResourseFirst = (resourse) => {
//     if (resourse === "Счётчик холодной воды") {
//         return {
//             type: "Счётчик холодной воды",
//             paramResourse: "Объём1(м3)", // i+1
//         };
//     } else if (resourse === "Счётчик горячей воды") {
//         return {
//             type: "Счётчик горячей воды",
//             paramResourse: "Объём2(м3)",
//         };
//     }
// };

// Функция возвращает Объёим i перебирая массив
// Задача опеределить какой объём
const getResourseByIndex = (arr, resourse) => {
    const paramResourse = arr.map((data) => data.paramResourse);
    return paramResourse;
};

// Функция возвращает ресурс по номеру квартиры
const getResourseByNumberFlat = (arr, flat) => {
    let arrForResourse = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].flat.number === flat) {
            arrForResourse = arr[i].flat.resourse;
        }
    }
    return arrForResourse;
};
// Определяет чётность
const isEven = (num) => {
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
};

// Функция определяет следующее число
const getNextNumber = (arr, resourse) => {
    const even = resourse === "Счётчик горячей воды" ? true : false;
    const skipNumber = [];
    let lastNumber;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === i + 1) {
            lastNumber = arr[i] + 1;
            console.log(`lastNumber: ${arr[i] + 1}`);
        } else {
            // Если порядок не соблюдается
            console.log(`I = ${i}`);
            skipNumber.push(i + 1);
            console.log(`skipNumber: ${i + 1}`);
        }
    }
    if (skipNumber.length === 0) {
        return lastNumber;
    }
    return skipNumber[0];
};
// // Отделяем число объёма
// const getNumberResourse = (arr) => {
//     const numbersOnly = arr.map((str) => {
//         const numberMatch = str.match(/\d+/); // ищем все числа в строке
//         if (numberMatch) {
//             return parseInt(numberMatch[0]); // возвращаем первое найденное число, преобразованное в число с плавающей точкой
//         } else {
//             return null; // если числа нет, возвращаем null
//         }
//     });
//     return numbersOnly;
// };

// Принимаем следующее число
// На основании ресурса выбираем что добавлять
const getNextResourse = (num, resourse) => {
    const even = num % 2 === 0 ? true : false;
    console.log(`Следующее число: ${num}`);
    console.log(`even: ${even} num: ${num} resourse: ${resourse}`);
    if (resourse === "Счётчик холодной воды" && !even) {
        return {
            type: "Счётчик холодной воды",
            paramResourse: `Объём${num}(м3)`,
        };
    } else if (resourse === "Счётчик горячей воды" && even) {
        return {
            type: "Счётчик горячей воды",
            paramResourse: `Объём${num}(м3)`,
        };
    }
};

// export const getParamsResourse = (resourse, flat) => {
//     let newArray = [
//         // {
//         //     flat: {
//         //         number: 10,
//         //         resourse: [
//         //             {
//         //                 type: "Счётчик холодной воды",
//         //                 paramResourse: "Объём1(м3)", // i+1
//         //             },
//         //             {
//         //                 type: "Счётчик горячей воды",
//         //                 paramResourse: "Объём2(м3)",
//         //             },
//         //         ],
//         //     },
//         // },
//         // {
//         //     flat: {
//         //         number: 90,
//         //         resourse: [
//         //             {
//         //                 type: "Счётчик холодной воды",
//         //                 paramResourse: "Объём1(м3)", // i+1
//         //             },
//         //             {
//         //                 type: "Счётчик горячей воды",
//         //                 paramResourse: "Объём2(м3)",
//         //             },
//         //             {
//         //                 type: "Счётчик холодной воды",
//         //                 paramResourse: "Объём3(м3)", // i+1
//         //             },
//         //         ],
//         //     },
//         // },
//     ];
//     console.log(newArray);

//     const otherFunc = () => {
//         const arrForResourse = {
//             flat: {
//                 number: flat,
//                 resourse: [getResourseFirst(resourse)],
//             },
//         };
//         newArray.push(arrForResourse);
//         if (isFlat(newArray, flat)) {
//             // Проверяем что в ресурсах
//             // Если есть перебираем и добавляем i + 1
//             const resourseOneFlat = getResourseByNumberFlat(newArray, flat);
//             const onlyResource = getResourseByIndex(resourseOneFlat, resourse);
//             const allNumber = getNumberResourse(onlyResource);
//             const nextNumberResurs = getNextNumber(allNumber, resourse);
//             const param = getNextResourse(nextNumberResurs, resourse);
//             //console.log(nextResourse);
//             for (let i = 0; i < newArray.length; i++) {
//                 if (newArray[i].flat.number === flat) {
//                     newArray[i].flat.resourse.push(param);
//                 }
//             }
//             console.log(param);
//         } else {
//             // Если нет Добавляем и добавляем ресурс в соответствии с параметрами
//             const arrForResourse = {
//                 flat: {
//                     number: flat,
//                     resourse: [getResourseFirst(resourse)],
//                 },
//             };
//             newArray.push(arrForResourse);
//             console.log(newArray);
//             const { paramResourse } = getResourseFirst(resourse);
//             return paramResourse;
//         }
//     };
//     return otherFunc();
// };

////--------------------**************************-----------------------///
// Для выставления объёмов
// Задача 1
// Выставляем первый параметр в зависимости от типа счётчика и канала
export const findFlat = (arr, flat) => {
    let isFlat = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].flat === flat) {
            isFlat = true;
        }
    }
    return isFlat;
};

// Функция возвращает первый объём
const getResourseFirst = (typeMeter) => {
    if (typeMeter === "Счётчик холодной воды") {
        return "Объём1(м3)";
    } else if (typeMeter === "Счётчик горячей воды") {
        return "Объём2(м3)";
    }
};

// Создаём новый массив из повторяющихся квартир
export const getNewArrayFlats = (arr, flat) => {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].flat === flat) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
};

// Отделяем число объёма
const getNumberResourse = (arr) => {
    const numbersOnly = arr.map((str) => {
        const numberMatch = str.params.match(/\d+/); // ищем все числа в строке
        if (numberMatch) {
            return parseInt(numberMatch[0]); // возвращаем первое найденное число,
        } else {
            return null; // если числа нет, возвращаем null
        }
    });
    return numbersOnly;
};

export const getFirstParamsResourse = (arr, typeMeter, flat) => {
    // Поиск по квартире
    const newFlat = findFlat(arr, flat);
    console.log(newFlat);
    if (newFlat) {
        // Возвращаем массив с квартирой и работаем с ней
        const arrayFlats = getNewArrayFlats(arr, flat);
        //console.log(arrayFlats);
        // Теперь проверяем что в параметрах
        // Что бы определить что далее
        //console.log(getNumberResourse(arrayFlats));

        // console.log(`arrayFlats: ${arrayFlats}`);
        // console.log(arrayFlats);
    } else {
        console.log("Сработал");
        return getResourseFirst(typeMeter);
    }
};

export const funcSwitch = (numberAsr) => {
    switch (numberAsr) {
        case 1:
            return "Объём1(м3)";
        case 2:
            return "Объём1(м3)";
        case 3:
            return "Объём2(м3)";
        case 4:
            return "Объём2(м3)";
        case 5:
            return "Объём1(м3)";
        case 6:
            return "Объём1(м3)";
        case 7:
            return "Объём2(м3)";
        case 8:
            return "Объём2(м3)";
        case 9:
            return "Объём1(м3)";
        case 10:
            return "Объём1(м3)";
    }
};

////--------------------**************************-----------------------///
