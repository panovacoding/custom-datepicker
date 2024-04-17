window.addEventListener('DOMContentLoaded', () => {
    initCalendar();
})

function initCalendar() {
    //node elements
    const calendar = document.querySelector('.calendar')
    const input = document.querySelector('input');

    const dates = document.querySelector('.calendar__days');
    const currentMonth = document.querySelector('.calendar-select__current');
    const currentYear = document.querySelector('.calendar__year');

    const monthList = document.querySelector('.calendar-select__options');
    const selectMonth = document.querySelector('.calendar-select');
    const monthOptions = monthList.querySelectorAll('.calendar-select__option');
    
    //utils
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const currentDate = new Date();
    let selectedDate = new Date();
    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth();


    input.addEventListener('click', () => {
        calendar.classList.toggle('hidden')
    })

    function createButton(text, isDisabled = false, isToday = false) {
        const button = document.createElement('button');
        button.classList.add('date-cell')
        button.textContent = text;
        button.disabled = isDisabled;
        button.classList.toggle('today', isToday);
        return button
    }

    function setDateToInput() {
        let currentDay = selectedDate.getDate() < 10 ? `0${selectedDate.getDate()}` : selectedDate.getDate();
        let currentMonth = +month < 9 ? `0${+month + 1}` : +month + 1;
        input.value = `${currentDay}.${currentMonth}.${year}`;
    }

    function setSelectedDate(button) {
        const selected = dates.querySelector('.selected');
        selected && selected.classList.remove('selected');
        button.classList.add('selected');
    }
    
    const handleDateClick = (e) => {
        selectedDate = new Date(year, month, parseInt(e.target.textContent));
        setSelectedDate(e.target);
        setDateToInput();
    }

    function renderDates() {
        dates.innerHTML = "";
        currentMonth.textContent = months[month];
        currentYear.textContent = year;
    
        //display prev month
        const lastOfPrevMonth = new Date(year, month, 0); //last date of prev month
        const lastWeekdayOfPrevMonth = lastOfPrevMonth.getDay();

        if(lastWeekdayOfPrevMonth !== 0) {
            for(let i = 1; i <= lastWeekdayOfPrevMonth; i++) {
                const text = lastOfPrevMonth.getDate() - lastWeekdayOfPrevMonth + i;
                const button = createButton(text, true, false);
                dates.appendChild(button);
            }
        }
    
        // display current month
        const lastOfMonth = new Date(year, +month + 1, 0);
        const daysInMonth = lastOfMonth.getDate();
    
        for(let i = 1; i <= daysInMonth; i++){
            const isToday = 
                currentDate.getDate() === i && 
                currentDate.getFullYear() === +year &&
                currentDate.getMonth() === +month;
            const button = createButton(i, false, isToday);
            button.addEventListener('click', handleDateClick);

            const isSelected = 
                selectedDate.getDate() === i && 
                selectedDate.getFullYear() === +year &&
                selectedDate.getMonth() === +month;

            if(isSelected) button.classList.add('selected');
            dates.appendChild(button);
        }

        const maxLength = 42;
        const rederedButtons = document.querySelectorAll('button.date-cell').length;
    
        //display the next month
        const freeCells = maxLength - rederedButtons;

        for(let i = 0; i < freeCells; i++){
            const text = 1 + i;
            const button = createButton(text, true, false);
            dates.appendChild(button)
        }
    
    }
    
    renderDates();

    const showMonthsOptions = () => {
        monthList.classList.toggle('calendar-select__options_open');
        selectMonth.classList.toggle('calendar-select_open');
    }

    const clearCurrentMonths = () => {
        const currentMonth = monthList.querySelector('.calendar-select__option_current');
        currentMonth && currentMonth.classList.remove('calendar-select__option_current')
    }
    const updateCalendarOnMonthChange = (opt) => (e) => {
        month = opt.dataset.month;
        clearCurrentMonths();
        opt.classList.add('calendar-select__option_current');
        renderDates();
    }

    selectMonth.addEventListener('click', showMonthsOptions);
    monthOptions.forEach(option => option.addEventListener('click', updateCalendarOnMonthChange(option)))

}