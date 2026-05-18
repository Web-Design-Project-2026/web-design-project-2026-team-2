const Days = document.querySelector(".days");
const Hours = document.querySelector(".hours");
const Minutes = document.querySelector(".minutes");
const Seconds = document.querySelector(".seconds");

const targetDate = new Date("April 30, 2027 12:00:00").getTime();

function timer() {
  const currentDate = new Date().getTime();
  const timeLeft = targetDate - currentDate;

  // Calculate the remaining time in days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
  const hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24;
  const minutes = Math.floor(timeLeft / 1000 / 60) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;

  Days.innerHTML = days;
  Hours.innerHTML = hours;
  Minutes.innerHTML = minutes;
  Seconds.innerHTML = seconds;

  // If the countdown is finished, display "00" for all time units
  if (timeLeft < 0) {
    Days.innerHTML = "00";
    Hours.innerHTML = "00";
    Minutes.innerHTML = "00";
    Seconds.innerHTML = "00";
  }
}

setInterval(timer, 1000);
