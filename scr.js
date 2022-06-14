const display = document.getElementById('clock');
const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm');
const audio = new Audio(
  'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'
);

audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

const alarmList = [
  { hours: 5, minutes: 50, seconds: 44, day_night: 'AM' },
  { hours: 8, minutes: 20, seconds: 24, day_night: 'PM' },
];

function renderAlarms(arr) {
  arr.forEach((element) => {
    let time = `${element.hours}:${element.minutes}:${element.seconds} ${element.day_night}`;
    showNewAlarm(time);
  });
}

renderAlarms(alarmList);

addAlarm.addEventListener('submit', (e) => {
  e.preventDefault();
  let new_h = formatTime(addAlarm.a_hour.value);
  if (new_h === '0') {
    new_h = '00';
  }
  let new_m = formatTime(addAlarm.a_min.value);
  if (new_m === '0') {
    new_m = '00';
  }
  let new_s = formatTime(addAlarm.a_sec.value);
  if (new_s === '0') {
    new_s = '00';
  }
  let new_day_night = addAlarm.period.value;

  const newAlarm = `${new_h}:${new_m}:${new_s} ${new_day_night}`;
  if (isNaN(newAlarm)) {
    if (!alarmList.includes(newAlarm)) {
      alarmList.push({
        hours: parseInt(new_h),
        minutes: parseInt(new_m),
        seconds: parseInt(new_s),
        day_night: new_day_night,
      });
      showNewAlarm(newAlarm);
      addAlarm.reset();
    } else {
      alert(`Alarm for ${newAlarm} already set.`);
    }
  } else {
    alert('Invalid Time Entered');
  }
});


myList.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteAlarm')) {
      e.target.parentElement.remove();
    }
  });
  
  remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;
    alarmList.push.apply(alarmList, newList);
  };
  
  function renderClock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = 'AM';
  
    if (hours > 12) {
      day_night = 'PM';
      hours = hours - 12;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    let currentTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
    display.textContent = currentTime;
    const ct = currentTime.split(':');
    const now = `${ct[0]}:${ct[1]}:${ct[2].split(' ')[0]} ${ct[2].split(' ')[1]}`;
    const nowTime = {
      hours: Number(ct[0]),
      minutes: Number(ct[1]),
      seconds: Number(ct[2].split(' ')[0]),
      day_night: ct[2].split(' ')[1],
    };
    const filter = alarmList.filter((time) => {
      return (
        time.hours === nowTime.hours &&
        time.minutes === nowTime.minutes &&
        time.seconds === nowTime.seconds &&
        time.day_night === nowTime.day_night
      );
    });
    if (filter.length) {
      ringing(now);
    }
  }


  setInterval(renderClock, 1000);

function ringing(now) {
  audio.play();
  alert(`Hey! it is ${now}`);
}

function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return '0' + time;
  }
  return time;
}

function clearAlarm() {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alert('Alarm cleared');
  }
}

function showNewAlarm(newAlarm) {
  const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`;
  myList.innerHTML += html;
}

