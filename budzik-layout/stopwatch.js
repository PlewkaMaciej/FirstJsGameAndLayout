const start = document.querySelector(".start-button");
const restart = document.querySelector(".reset-button");
const timer = document.querySelector(".stop-watch-current-time");
const newRound = document.querySelector(".new-button");
const roundSection = document.querySelector(".roundSection");
let isWorking = false;
let sec = 0;
let hr = 0;
let min = 0;
let numberOfRound=0;
const checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
let stopwatch;
const turnOnStopWatch = () => {
  stopwatch = setInterval(() => {
    sec = sec + 1;
    if (sec > 59) {
      sec = 0;
      min = min + 1;
    }
    if (min > 59) {
      min = 0;
      hr = hr + 1;
    }
    timer.innerText =
      checkTime(hr) + ":" + checkTime(min) + ":" + checkTime(sec);
  }, 1000);
};

const timerCycle = () => {
  if (isWorking === false) {
    isWorking = true;
    turnOnStopWatch();
    start.style.backgroundColor = "red";
    start.innerText = "Stop";
  } else {
    isWorking = false;
    clearInterval(stopwatch);
    start.style.backgroundColor = "yellow";
    start.innerText = "Start";
  }
};
const resetTimer = () => {
  hr = 0;
  sec = 0;
  min = 0;
  timer.innerText = "00:00:00";
  clearInterval(stopwatch);
  start.style.backgroundColor = "yellow";
  start.innerText = "Start";
  remove()
};
const newRoundFunc = () => {
  if(!isWorking){
    return
  }
  let p = document.createElement("p");
  numberOfRound++
  p.innerText = `${numberOfRound} okrążenie w czasie: ${timer.innerText}`;
  p.classList.add("timeRound");
  roundSection.appendChild(p);
};
const remove=()=>{
  let allTimes=document.querySelectorAll(".timeRound") 
  allTimes.forEach((p)=>{
    p.remove()
    numberOfRound=0
  })
}
start.addEventListener("click", timerCycle);
restart.addEventListener("click", resetTimer);
newRound.addEventListener("click", newRoundFunc);
