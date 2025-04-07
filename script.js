// DOM Elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Variables
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer;
let isRunning = false;
let lapCount = 1;

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Functions
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 10);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapsList.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (isRunning || (!isRunning && (hours > 0 || minutes > 0 || seconds > 0 || milliseconds > 0))) {
        const lapTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span>Lap ${lapCount++}</span>
            <span>${lapTime}</span>
        `;
        lapsList.prepend(lapItem);
    }
}

function updateTime() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateDisplay();
}

function updateDisplay() {
    hoursDisplay.textContent = padTime(hours);
    minutesDisplay.textContent = padTime(minutes);
    secondsDisplay.textContent = padTime(seconds);
    millisecondsDisplay.textContent = padTime(milliseconds);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}