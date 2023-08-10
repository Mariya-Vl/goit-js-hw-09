import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let endData = null;
refs.startBtn.setAttribute('disabled', true);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.removeAttribute('disabled');
    // console.log(selectedDates[0]);
    endData = selectedDates[0].getTime();
    // console.log('дата закінчення акції: ', endData);
  },
});

refs.startBtn.addEventListener('click', handlerStartTimer);

function handlerStartTimer() {
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    if (endData < currentDate) {
      clearInterval(intervalId);
      return Notiflix.Notify.info('The time is up!');
    }
    const dif = endData - currentDate;
    // convertMs(dif);
    updateTimer(convertMs(dif));
    refs.startBtn.setAttribute('disabled', true);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
