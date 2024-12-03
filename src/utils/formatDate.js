import { hasValue } from "./utils";

const formatDate = (dateString) => {
    if (hasValue(dateString)) {
        const date = new Date(dateString);
        // Lấy ngày, tháng, năm
        const day = String(date.getDate()).padStart(2, '0'); // Thêm số 0 nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        // Lấy giờ, phút
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Ghép thành chuỗi định dạng dd/mm/yyyy HH:mm
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    return ''
}

const parseDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
}
// startMonth, startYear, endMonth, endYear
const listMonths = (timeStart, timeEnd) => {
    const [yearStartString, monthStartString] = timeStart.split("-");
    const [yearEndString, monthEndString] = timeEnd.split("-");
    const startYear = parseInt(yearStartString, 10);
    const startMonth = parseInt(monthStartString, 10);
    const endYear = parseInt(yearEndString, 10);
    const endMonth = parseInt(monthEndString, 10);

    const months = [];
    let currentYear = startYear;
    let currentMonth = startMonth;

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
        // Add leading zero to month if necessary
        const monthString = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
        months.push(`${currentYear}-${monthString}`);

        // Increment month
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
    }

    return months;
}
const getCurrentYearMonth = (timeNow) => {
    const now = new Date();
    const year = now.getFullYear();
    // Thêm 1 vào tháng vì getMonth() trả về giá trị từ 0-11
    const month = timeNow ? String(now.getMonth() + 1).padStart(2, '0') : String(1).padStart(2, '0'); // Đảm bảo tháng có 2 chữ số
    return `${year}-${month}`;
};

export { formatDate, parseDate, listMonths, getCurrentYearMonth }