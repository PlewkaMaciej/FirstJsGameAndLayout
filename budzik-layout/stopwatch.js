const start = document.querySelector(".start-button");
const restart = document.querySelector(".reset-button");
const timer = document.querySelector(".stop-watch-current-time");
let stoptime = true;
const timerCycle = () => {
  let sec = 0;
  let hr = 0;
  let min = 0;
  setInterval(() => {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);
    sec = sec + 1;
    start.style.backgroundColor = "red";
    start.innerText = "Stop";

    if (sec > 59) {
      sec = 0;
      min = min + 1;
    }
    if (min > 59) {
      min = 0;
      hr = hr + 1;
    }
    if (sec < 10 || sec === 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min === 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr === 0) {
      hr = "0" + hr;
    }

    timer.innerText = hr + ":" + min + ":" + sec;
  }, 1000);
};

const resetTimer = () => {
  hr = 0;
  sec = 0;
  min = 0;
  timer.innerText = "00:00:00";
};

start.addEventListener("click", timerCycle);
restart.addEventListener("click", resetTimer);
