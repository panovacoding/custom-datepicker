// Get num of days in month
export const days = ["П", "В", "С", "Ч", "П", "С", "В"];
export const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export const getNumberOfDays = (year, month) => {
    return 33 - new Date(year, month, 33).getDate();
};

// Calc day details
export const getDayDetails = (args = {}) => {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
    }
    let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);

    let _date =
        (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    return {
        date: _date,
        day,
        month,
        dayString: days[day]
    };
};

// Get month
export const getMonthName = (month) => {
    // return months[Math.max(Math.min(11, month), 0)] || "Month";
    return months[month];
}

// [{}] each {} with details for each day of month
export const getMonthDetails = (year, month) => {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 5;
    let currentDay = null;
    let index = 1;
    let cols = 7;

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {
            currentDay = getDayDetails({
                index,
                numberOfDays,
                firstDay,
                year,
                month
            });
            monthArray.push(currentDay);
            index++;
        }

    }
    return monthArray;
};