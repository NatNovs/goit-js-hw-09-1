
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Report } from 'notiflix/build/notiflix-report-aio';


document.body.style.backgroundColor = '#7782a8';
const TIMER_DELAY = 1000;
let intervalID = null;
let selectedDate = null;
let currentdate = null;

const refs = {
    dateInsert: document.querySelector('input#datetime-picker'),
    btnStartTimer: document.querySelector('button[data-start-timer]'),
    daysRemaining: document.querySelector('[data-days]'),
    hoursRemaining: document.querySelector('[data-hours]'),
    minutesRemaining: document.querySelector('[data-minutes]'),
    secondsRemaining: document.querySelector('[data-seconds]'),
};

refs.btnStartTimer.disabled = true;
refs.btnStartTimer.addEventListener('click', timerStart);

let timeRemaining = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onDateCheck(selectedDates);
},
}; 

flatpickr(refs.dateInsert, options);

Report.info('Обирай дату і натискай на "Start"');

function onDateCheck(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentdate = new Date().getTime();

    if (selectedDate > currentdate) {
        refs.btnStartTimer.disabled = false;
        Report.success('Тепер тапай на "Start"!');
        return;
    }
    Report.failure('"Please choose a date in the future" <br/><br/>- Тобто дату та час яка ще не настала');
}

function timerStart() {
    intervalID = setInterval(() => {
        currentdate = new Date().getTime();
        if (selectedDate - currentdate <= 1000) {
            clearInterval(intervalID);
            refs.btnStartTimer.disabled = true;
            refs.dateInsert.disabled = false;
            Report.info('Лічбу зупинено!');
            return;
        } else {
            refs.btnStartTimer.disabled = true;
            refs.dateInsert.disabled = true;
            currentdate += 1000;
            timeRemaining = Math.floor(selectedDate - currentdate);
            convertMs(timeRemaining); 
        }
        }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds}) {
    refs.daysRemaining.textContent = days;
    refs.hoursRemaining.textContent = hours;
    refs.minutesRemaining.textContent = minutes;
    refs.secondsRemaining.textContent = seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    createMarkup({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
}

