import { hasValue } from "./utils";

const numberWithCommas = (number) => {
    if (hasValue(number)) {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return ''
}

export { numberWithCommas }