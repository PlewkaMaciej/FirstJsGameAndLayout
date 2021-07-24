const time = document.querySelector("#time");
const timeWarsaw = document.querySelector("#time-warsaw");
const timeKijow = document.querySelector("#time-kijow");
const timeBerlin = document.querySelector("#time-berlin");
const timeLondon = document.querySelector("#time-london");
const timeNewYork = document.querySelector("#time-newyork");
const timeSydney = document.querySelector("#time-sydney");
const timeToronto = document.querySelector("#time-toronto");
const timeTokio = document.querySelector("#time-tokio");
console.log(timeSydney);
const checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const getTime = (addedTime, city) => {
  let today = new Date();
  let hours = checkTime(today.getHours()) + addedTime;
  hours = parseInt(hours);
  if (hours > 23) {
    hours = checkTime(hours) % 24;
  }
  if (hours < 0) {
    hours = 24 + addedTime;
  }
  let minutes = checkTime(today.getMinutes());
  let seconds = checkTime(today.getSeconds());
  let actualtime = checkTime(hours) + ":" + minutes + ":" + seconds;
  city.innerText = actualtime;
};
const setAllTimes = () => {
  getTime(0, time);
  getTime(0, timeWarsaw);
  getTime(1, timeKijow);
  getTime(0, timeBerlin);
  getTime(-6, timeNewYork);
  getTime(8, timeSydney);
  getTime(-6, timeToronto);
  getTime(7, timeTokio);
  getTime(-1, timeLondon);
};

setAllTimes();
setInterval(() => {
  setAllTimes();
}, 1000);
