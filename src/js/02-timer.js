import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const TIMER_DELAY = 1000;
let selectedDate = null;
let currentDate = null;

const dateInput = document.querySelector('input#datetime-picker');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;
btnStart.addEventListener('click', timerStart);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();

    if (selectedDate >= currentDate) {
        btnStart.disabled = false;
        Report.success('Great', 'well, let`s start the timer');
    return;
    } else {
        Report.failure('Error', 'Please choose a date in the future');
    }
},
};

flatpickr(dateInput, options);

setTimeout(() => {
    Report.info(
    'info',
    'please, choose a date from the future and we will help you calculate the time before it'
);
}, 1000);

function timerStart() {
    const intervalId = setInterval(() => {
    const deltaTime = selectedDate - currentDate;
    if (deltaTime <= TIMER_DELAY) {
        clearInterval(intervalId);
        btnStart.disabled = true;
        dateInput.disabled = false;
    return;
    } else {
        btnStart.disabled = true;
        dateInput.disabled = true;
        currentDate += TIMER_DELAY;
    const lastTime = deltaTime;
    convertMs(lastTime);
    }
}, TIMER_DELAY);
}

function createVisualTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createVisualTimer({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}