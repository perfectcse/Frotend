// ============================
// DOM ELEMENTS
// ============================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

const todoColumn = document.getElementById("todo");
const progressColumn = document.getElementById("progress");
const doneColumn = document.getElementById("done");

// ============================
// LOCAL STORAGE
// ============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Stores currently dragged task id

let draggedTaskId = null;

// ============================
// SAVE TASKS
// ============================

function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}
// ============================
// ADD TASK
// ============================

taskForm.addEventListener("submit", function (event) {

    // Prevent page refresh

    event.preventDefault();

    // Get input value

    const title = taskInput.value.trim();

    // Validation

    if (title === "") {

        alert("Please enter a task!");

        return;

    }

    // Create task object

    const newTask = {

        id: Date.now(),

        title: title,

        status: "todo"

    };

    // Add into array

    tasks.push(newTask);

    // Save to localStorage

    saveTasks();

    // Display tasks

    renderTasks();

    // Clear input

    taskForm.reset();

});
// ============================
// RENDER TASKS
// ============================

function renderTasks() {

    // Clear all columns

    todoColumn.innerHTML = "";

    progressColumn.innerHTML = "";

    doneColumn.innerHTML = "";


    // Loop through all tasks

    tasks.forEach(function (task) {

        // Create task card

        const taskCard = document.createElement("div");

        taskCard.className = "task";

        taskCard.draggable = true;

        taskCard.dataset.id = task.id;


        // Task HTML

        taskCard.innerHTML = `

            <h4>${task.title}</h4>

            <div class="task-buttons">

                <button
                    class="edit-btn"
                    onclick="editTask(${task.id})">

                    ✏️ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    🗑️ Delete

                </button>

            </div>

        `;


        // Add task to correct column

        if (task.status === "todo") {

            todoColumn.appendChild(taskCard);

        }

        else if (task.status === "progress") {

            progressColumn.appendChild(taskCard);

        }

        else {

            doneColumn.appendChild(taskCard);

        }

    });


    // Attach drag events

    addDragEvents();


    // Show empty message

    showEmptyMessage();

}
// ============================
// DELETE TASK
// ============================

function deleteTask(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

}


// ============================
// EDIT TASK
// ============================

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const updatedTitle = prompt(
        "Edit Task",
        task.title
    );

    if (
        updatedTitle === null ||
        updatedTitle.trim() === ""
    ) {
        return;
    }

    task.title = updatedTitle.trim();

    saveTasks();

    renderTasks();

}
// ============================
// DRAG & DROP
// ============================

let draggedTask = null;


// Attach drag events to every task card

function addDragEvents() {

    const taskCards = document.querySelectorAll(".task");

    taskCards.forEach(card => {

        // Drag Start

        card.addEventListener("dragstart", function () {

            draggedTask = Number(this.dataset.id);

            this.classList.add("dragging");

        });


        // Drag End

        card.addEventListener("dragend", function () {

            this.classList.remove("dragging");

        });

    });

}


// ============================
// DROP ZONES
// ============================

const taskLists = document.querySelectorAll(".task-list");

taskLists.forEach(list => {

    // Allow dropping

    list.addEventListener("dragover", function (event) {

        event.preventDefault();

        this.classList.add("drag-over");

    });


    // Remove highlight

    list.addEventListener("dragleave", function () {

        this.classList.remove("drag-over");

    });


    // Drop Task

    list.addEventListener("drop", function (event) {

        event.preventDefault();

        this.classList.remove("drag-over");

        if (draggedTask === null) return;

        // Find task

        const task = tasks.find(item => item.id === draggedTask);

        if (!task) return;

        // Update status

        task.status = this.id;

        // Save

        saveTasks();

        // Re-render

        renderTasks();

        // Reset dragged task

        draggedTask = null;

    });

});
// ============================
// EMPTY MESSAGE
// ============================

function showEmptyMessage() {

    const columns = [

        todoColumn,
        progressColumn,
        doneColumn

    ];

    columns.forEach(column => {

        if (column.children.length === 0) {

            column.innerHTML = `

                <p class="empty">

                    No Tasks

                </p>

            `;

        }

    });

}


// ============================
// INITIAL LOAD
// ============================

renderTasks();