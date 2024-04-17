import { getNumberOfDays, getDayDetails, getMonthName, days, months, getMonthDetails } from './calendar.js'
document.addEventListener('DOMContentLoaded', () => {
    initDatepicker();
})


function initDatepicker() {

    const calendar = document.querySelector(".calendar__days");
    const input = document.querySelector(".datepicker__input");
    const calHeader = document.querySelector(".calendar__header");
    const calHeaderMonth = document.querySelector(".calendar-select__current");
    const calHeaderYear = document.querySelector('.calendar__year');
    const calDays = document.querySelector(".calendar__week-days");

    // Set dynamic calendar header
    const setHeader = (year, month) => {
        calHeaderMonth.innerHTML = getMonthName(month);
        calHeaderYear.innerHTML = year;
    };

    function getCurrentDate() {
        const currentDate = new Date();
        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
        }
    }
    const currentDate = getCurrentDate();
    setHeader(currentDate.year, currentDate.month);


    // Variables that get updated with "state" changes
    const year = currentDate.year;
    const month = currentDate.month;
    const monthDetails = getMonthDetails(year, month);


    // Add days row to calendar
    for (let i = 0; i < days.length; i++) {
        let div = document.createElement("div"),
            span = document.createElement("span");

        div.classList.add("cell_wrapper");
        // div.classList.add("cal_days");
        span.classList.add("cell_item");

        span.innerText = days[i].slice(0, 2);

        div.appendChild(span);
        calDays.appendChild(div);
    }

    // Add dates to calendar
    const setCalBody = (monthDetails) => {
        // Add dates to calendar
        for (let i = 0; i < monthDetails.length; i++) {
            let div = document.createElement("div"),
                span = document.createElement("span");

            div.classList.add("cell_wrapper");
            div.classList.add("cal_date");
            monthDetails[i].month === 0 && div.classList.add("current");
            // monthDetails[i].month === 0 && isCurrentDay(monthDetails[i], div);
            span.classList.add("cell_item");

            span.innerText = monthDetails[i].date;

            div.appendChild(span);
            calendar.appendChild(div);
        }
    };

    setCalBody(monthDetails);



    const monthSelect = document.querySelector('.calendar-select__value');
    const monthOptionList = document.querySelector('.calendar-select__options');
    const monthOptions = document.querySelectorAll('.calendar-select__option')

    monthSelect.addEventListener('click', () => {
        monthOptionList.classList.toggle('calendar-select__options_open');
    })

    function clearOptions() {
        monthOptions.forEach(option => option.classList.remove('calendar-select__option_current'))
    }

    monthOptions.forEach(option => {
        option.addEventListener('click', () => {
            clearOptions();
            option.classList.add('calendar-select__option_current');
            const month = option.dataset.month;
            const newInfo = getMonthDetails(year, month);
            calendar.innerHTML = '';
            setCalBody(newInfo);
            monthOptionList.classList.remove('calendar-select__options_open');
            setHeader(currentDate.year, month);
        })
    })
}