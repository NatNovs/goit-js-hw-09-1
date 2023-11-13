import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datetime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  seconds: document.querySelector('span[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
  }; 

refs.btnStart.disabled = true;
let selectedDate;
let countdownInterval;

flatpickr(refs.dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates.getTime() < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      selectedDate = selectedDates.getTime();
      timerStart();
    }
  },
});

function timerStart() {
  countdownInterval = setInterval(() => {
    const currentData = Date.now();
    const diff = selectedDate - currentData;
    if (diff <= 0) {
      refs.startBtn.disabled = true;
      refs.dateTime.disabled = false;
      clearInterval(countdownInterval);
      convertMs(0);
    } else {
      refs.startBtn.disabled = false;
      refs.dateTime.disabled = true;
      convertMs(diff);
    }
  });
}


function convertMs(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

  refs.btnStart.addEventListener('click', () => {
    if (selectedDate) {
      timerStart();
    }
  });

