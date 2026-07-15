// =================================
// DOM ELEMENTS
// =================================

const focusBtn = document.getElementById("focusBtn");
const breakBtn = document.getElementById("breakBtn");

const modeText = document.getElementById("modeText");
const timerDisplay = document.getElementById("timerDisplay");
const timerMessage = document.getElementById("timerMessage");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const currentMode = document.getElementById("currentMode");
const sessionCount = document.getElementById("sessionCount");


// =================================
// TIMER SETTINGS
// =================================

// Focus time = 25 minutes
const FOCUS_TIME = 25 * 60;

// Short break time = 5 minutes
const BREAK_TIME = 5 * 60;


// =================================
// APPLICATION STATE
// =================================

// Remaining time in seconds

let timeLeft = FOCUS_TIME;


// Stores the setInterval ID

let timerInterval = null;


// Current timer mode

let mode = "focus";


// Number of completed focus sessions

let completedSessions = 0;


// =================================
// FORMAT TIME
// =================================

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;


    // padStart makes sure we always show 2 digits

    const formattedMinutes = String(minutes).padStart(2, "0");

    const formattedSeconds = String(remainingSeconds).padStart(2, "0");


    return `${formattedMinutes}:${formattedSeconds}`;
}


// =================================
// UPDATE TIMER DISPLAY
// =================================

function updateDisplay() {

    timerDisplay.textContent = formatTime(timeLeft);

}


// =================================
// START TIMER
// =================================

function startTimer() {

    // Prevent multiple intervals from running

    if (timerInterval !== null) {

        return;

    }


    timerMessage.textContent =
        mode === "focus"
            ? "Stay focused! You've got this. 🧠"
            : "Relax and recharge. ☕";


    timerInterval = setInterval(function () {

        // Decrease time every second

        timeLeft--;


        // Update UI

        updateDisplay();


        // Check if timer is complete

        if (timeLeft <= 0) {

            completeTimer();

        }

    }, 1000);

}


// =================================
// PAUSE TIMER
// =================================

function pauseTimer() {

    // Stop current interval

    clearInterval(timerInterval);


    // Reset interval variable

    timerInterval = null;


    timerMessage.textContent = "Timer paused ⏸️";

}


// =================================
// RESET TIMER
// =================================

function resetTimer() {

    // Stop timer if running

    clearInterval(timerInterval);

    timerInterval = null;


    // Reset time according to current mode

    if (mode === "focus") {

        timeLeft = FOCUS_TIME;

        timerMessage.textContent =
            "Ready to focus? 🚀";

    } else {

        timeLeft = BREAK_TIME;

        timerMessage.textContent =
            "Time for a short break ☕";

    }


    updateDisplay();

}


// =================================
// COMPLETE TIMER
// =================================

function completeTimer() {

    // Stop interval

    clearInterval(timerInterval);

    timerInterval = null;


    // Make sure timer shows 00:00

    timeLeft = 0;

    updateDisplay();


    // If focus session completed

    if (mode === "focus") {

        completedSessions++;

        sessionCount.textContent =
            completedSessions;


        timerMessage.textContent =
            "🎉 Focus session completed! Take a short break.";

    } else {

        timerMessage.textContent =
            "🚀 Break completed! Ready to focus again?";

    }

}


// =================================
// SWITCH TO FOCUS MODE
// =================================

function switchToFocus() {

    // Stop existing timer

    clearInterval(timerInterval);

    timerInterval = null;


    // Change application state

    mode = "focus";

    timeLeft = FOCUS_TIME;


    // Update active button

    focusBtn.classList.add("active");

    breakBtn.classList.remove("active");


    // Update text

    modeText.textContent = "Focus Session";

    currentMode.textContent = "Focus";

    timerMessage.textContent =
        "Ready to focus? 🚀";


    // Update timer

    updateDisplay();

}


// =================================
// SWITCH TO BREAK MODE
// =================================

function switchToBreak() {

    // Stop existing timer

    clearInterval(timerInterval);

    timerInterval = null;


    // Change application state

    mode = "break";

    timeLeft = BREAK_TIME;


    // Update active button

    breakBtn.classList.add("active");

    focusBtn.classList.remove("active");


    // Update text

    modeText.textContent = "Short Break";

    currentMode.textContent = "Short Break";

    timerMessage.textContent =
        "Time for a short break ☕";


    // Update timer

    updateDisplay();

}


// =================================
// EVENT LISTENERS
// =================================

startBtn.addEventListener(
    "click",
    startTimer
);


pauseBtn.addEventListener(
    "click",
    pauseTimer
);


resetBtn.addEventListener(
    "click",
    resetTimer
);


focusBtn.addEventListener(
    "click",
    switchToFocus
);


breakBtn.addEventListener(
    "click",
    switchToBreak
);


// =================================
// INITIAL DISPLAY
// =================================

updateDisplay();