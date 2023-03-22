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
