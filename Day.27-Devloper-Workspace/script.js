// ======================================
// DEVELOPER WORKSPACE
// SCRIPT.JS - PART 1
// ======================================


// ======================================
// DOM ELEMENTS
// ======================================

const goalList = document.getElementById("goalList");

const addGoalBtn = document.getElementById("addGoalBtn");

const goalCount = document.getElementById("goalCount");

const completedGoalCount =
    document.getElementById("completedGoalCount");

const goalProgress =
    document.getElementById("goalProgress");

const goalProgressBar =
    document.getElementById("goalProgressBar");


// ======================================
// GOAL DATA
// ======================================

let goals =
    JSON.parse(localStorage.getItem("developerGoals")) || [];


// ======================================
// SAVE GOALS
// ======================================

function saveGoals() {

    localStorage.setItem(
        "developerGoals",
        JSON.stringify(goals)
    );

}


// ======================================
// ADD GOAL
// ======================================

function addGoal() {

    const title = prompt(
        "What is your goal for today?"
    );

    if (!title || title.trim() === "") {

        return;

    }

    const newGoal = {

        id: Date.now(),

        title: title.trim(),

        completed: false

    };

    goals.push(newGoal);

    saveGoals();

    renderGoals();

}


// ======================================
// RENDER GOALS
// ======================================

function renderGoals() {

    goalList.innerHTML = "";

    if (goals.length === 0) {

        goalList.innerHTML = `

            <div class="empty-message">

                <span>🎯</span>

                No goals added yet.

                <br>

                Add your first goal to get started.

            </div>

        `;

        updateGoalStats();

        return;

    }


    goals.forEach(goal => {

        const goalItem =
            document.createElement("div");

        goalItem.className = "goal-item";


        if (goal.completed) {

            goalItem.classList.add("completed");

        }


        goalItem.innerHTML = `

            <div class="goal-content">

                <input
                    type="checkbox"
                    class="goal-checkbox"
                    ${goal.completed ? "checked" : ""}
                    onchange="toggleGoal(${goal.id})"
                >

                <span class="goal-title">

                    ${goal.title}

                </span>

            </div>

            <button
                class="delete-goal-btn"
                onclick="deleteGoal(${goal.id})"
                title="Delete goal"
            >

                🗑️

            </button>

        `;


        goalList.appendChild(goalItem);

    });


    updateGoalStats();

}


// ======================================
// TOGGLE GOAL
// ======================================

function toggleGoal(id) {

    const goal =
        goals.find(item => item.id === id);

    if (!goal) {

        return;

    }

    goal.completed =
        !goal.completed;

    saveGoals();

    renderGoals();

}


// ======================================
// DELETE GOAL
// ======================================

function deleteGoal(id) {

    const confirmed =
        confirm("Delete this goal?");

    if (!confirmed) {

        return;

    }

    goals =
        goals.filter(goal => goal.id !== id);

    saveGoals();

    renderGoals();

}


// ======================================
// UPDATE GOAL STATISTICS
// ======================================

function updateGoalStats() {

    const total =
        goals.length;

    const completed =
        goals.filter(
            goal => goal.completed
        ).length;


    const progress =

        total === 0

        ? 0

        : Math.round(
            (completed / total) * 100
        );


    goalCount.textContent =
        total;

    completedGoalCount.textContent =
        completed;

    goalProgress.textContent =
        `${progress}%`;

    goalProgressBar.style.width =
        `${progress}%`;

}


// ======================================
// ADD GOAL BUTTON
// ======================================

addGoalBtn.addEventListener(
    "click",
    addGoal
);


// ======================================
// INITIAL GOAL LOAD
// ======================================

renderGoals();
// ======================================
// FOCUS TIMER
// ======================================

// ======================================
// DOM ELEMENTS
// ======================================

const timerDisplay =
    document.getElementById("timerDisplay");

const startTimerBtn =
    document.getElementById("startTimerBtn");

const pauseTimerBtn =
    document.getElementById("pauseTimerBtn");

const resetTimerBtn =
    document.getElementById("resetTimerBtn");

const focusSessions =
    document.getElementById("focusSessions");

const timerCard =
    document.querySelector(".timer-card");


// ======================================
// TIMER SETTINGS
// ======================================

const DEFAULT_MINUTES = 25;

let timeRemaining =
    DEFAULT_MINUTES * 60;

let timerInterval = null;

let isTimerRunning = false;


// ======================================
// FOCUS SESSION COUNT
// ======================================

let sessions =
    Number(
        localStorage.getItem("focusSessions")
    ) || 0;


// ======================================
// SAVE SESSION COUNT
// ======================================

function saveSessions() {

    localStorage.setItem(
        "focusSessions",
        sessions
    );

}


// ======================================
// UPDATE SESSION DISPLAY
// ======================================

function updateSessionDisplay() {

    focusSessions.textContent =
        sessions;

}


// ======================================
// FORMAT TIME
// ======================================

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return (

        String(minutes).padStart(2, "0")

        + ":"

        + String(remainingSeconds).padStart(2, "0")

    );

}


// ======================================
// UPDATE TIMER DISPLAY
// ======================================

function updateTimerDisplay() {

    timerDisplay.textContent =
        formatTime(timeRemaining);

}


// ======================================
// START TIMER
// ======================================

function startTimer() {

    if (isTimerRunning) {

        return;

    }

    isTimerRunning = true;

    timerCard.classList.add("active");

    timerInterval = setInterval(() => {

        timeRemaining--;

        updateTimerDisplay();


        if (timeRemaining <= 0) {

            completeFocusSession();

        }

    }, 1000);

}


// ======================================
// PAUSE TIMER
// ======================================

function pauseTimer() {

    if (!isTimerRunning) {

        return;

    }

    clearInterval(timerInterval);

    timerInterval = null;

    isTimerRunning = false;

    timerCard.classList.remove("active");

}


// ======================================
// RESET TIMER
// ======================================

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    isTimerRunning = false;

    timeRemaining =
        DEFAULT_MINUTES * 60;

    timerCard.classList.remove("active");

    updateTimerDisplay();

}


// ======================================
// COMPLETE FOCUS SESSION
// ======================================

function completeFocusSession() {

    clearInterval(timerInterval);

    timerInterval = null;

    isTimerRunning = false;

    timeRemaining =
        DEFAULT_MINUTES * 60;

    timerCard.classList.remove("active");

    sessions++;

    saveSessions();

    updateSessionDisplay();

    updateTimerDisplay();

    alert(
        "🎉 Focus session completed! Great work."
    );

}


// ======================================
// TIMER BUTTON EVENTS
// ======================================

startTimerBtn.addEventListener(
    "click",
    startTimer
);

pauseTimerBtn.addEventListener(
    "click",
    pauseTimer
);

resetTimerBtn.addEventListener(
    "click",
    resetTimer
);


// ======================================
// INITIAL TIMER LOAD
// ======================================

updateTimerDisplay();

updateSessionDisplay();
// ======================================
// QUICK NOTES
// ======================================

// ======================================
// DOM ELEMENTS
// ======================================

const notesList =
    document.getElementById("notesList");

const addNoteBtn =
    document.getElementById("addNoteBtn");

const noteCount =
    document.getElementById("noteCount");


// ======================================
// NOTES DATA
// ======================================

let notes =
    JSON.parse(
        localStorage.getItem("developerNotes")
    ) || [];


// ======================================
// SAVE NOTES
// ======================================

function saveNotes() {

    localStorage.setItem(
        "developerNotes",
        JSON.stringify(notes)
    );

}


// ======================================
// ADD NOTE
// ======================================

function addNote() {

    const content = prompt(
        "Write your developer note:"
    );

    if (!content || content.trim() === "") {

        return;

    }

    const newNote = {

        id: Date.now(),

        content: content.trim()

    };

    notes.unshift(newNote);

    saveNotes();

    renderNotes();

}


// ======================================
// RENDER NOTES
// ======================================

function renderNotes() {

    notesList.innerHTML = "";

    if (notes.length === 0) {

        notesList.innerHTML = `

            <div class="empty-message">

                <span>📝</span>

                No notes yet.

                <br>

                Capture your first idea.

            </div>

        `;

        updateNoteCount();

        return;

    }


    notes.forEach(note => {

        const noteItem =
            document.createElement("div");

        noteItem.className =
            "note-item";


        noteItem.innerHTML = `

            <div class="note-content">

                ${escapeHTML(note.content)}

            </div>

            <div class="note-actions">

                <button
                    class="note-action"
                    onclick="editNote(${note.id})"
                    title="Edit note"
                >
                    ✏️
                </button>

                <button
                    class="note-action"
                    onclick="deleteNote(${note.id})"
                    title="Delete note"
                >
                    🗑️
                </button>

            </div>

        `;

        notesList.appendChild(noteItem);

    });


    updateNoteCount();

}


// ======================================
// EDIT NOTE
// ======================================

function editNote(id) {

    const note =
        notes.find(item => item.id === id);

    if (!note) {

        return;

    }

    const updatedContent =
        prompt(
            "Edit your note:",
            note.content
        );

    if (
        updatedContent === null ||
        updatedContent.trim() === ""
    ) {

        return;

    }

    note.content =
        updatedContent.trim();

    saveNotes();

    renderNotes();

}


// ======================================
// DELETE NOTE
// ======================================

function deleteNote(id) {

    const confirmed =
        confirm("Delete this note?");

    if (!confirmed) {

        return;

    }

    notes =
        notes.filter(
            note => note.id !== id
        );

    saveNotes();

    renderNotes();

}


// ======================================
// UPDATE NOTE COUNT
// ======================================

function updateNoteCount() {

    noteCount.textContent =
        notes.length;

}


// ======================================
// PREVENT HTML INJECTION
// ======================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// ======================================
// ADD NOTE BUTTON
// ======================================

addNoteBtn.addEventListener(
    "click",
    addNote
);


// ======================================
// INITIAL NOTES LOAD
// ======================================

renderNotes();
// ======================================
// CURRENT DATE
// ======================================

const currentDate =
    document.getElementById("currentDate");


function updateCurrentDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    currentDate.textContent =
        today.toLocaleDateString(
            "en-US",
            options
        );

}


// ======================================
// DARK MODE
// ======================================

const themeToggle =
    document.getElementById("themeToggle");


// Load saved theme

const savedTheme =
    localStorage.getItem("developerTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.innerHTML =
        "☀️ <span>Light Mode</span>";

}


// Toggle theme

themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark-mode"
        );

        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        if (isDark) {

            localStorage.setItem(
                "developerTheme",
                "dark"
            );

            themeToggle.innerHTML =
                "☀️ <span>Light Mode</span>";

        }
        else {

            localStorage.setItem(
                "developerTheme",
                "light"
            );

            themeToggle.innerHTML =
                "🌙 <span>Dark Mode</span>";

        }

    }
);


// ======================================
// NAVIGATION
// ======================================

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(item => {

    item.addEventListener(
        "click",
        function () {

            navItems.forEach(nav => {

                nav.classList.remove(
                    "active"
                );

            });

            this.classList.add("active");

        }
    );

});


// ======================================
// INITIALIZE DATE
// ======================================

updateCurrentDate();


// ======================================
// FINAL APPLICATION CHECK
// ======================================

function initializeWorkspace() {

    renderGoals();

    updateTimerDisplay();

    updateSessionDisplay();

    renderNotes();

    updateCurrentDate();

}


// ======================================
// START APPLICATION
// ======================================

initializeWorkspace();