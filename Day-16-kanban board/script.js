const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");

const columns = document.querySelectorAll(".task-list");

let draggedTask = null;

// 💾 Load saved tasks
window.addEventListener("DOMContentLoaded", loadTasks);

// ➕ Add Task
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (!text) return;

  const task = createTask(text);

  document.getElementById("todo").appendChild(task);

  saveTasks();

  taskInput.value = "";
});

// 🎯 Create Task
function createTask(text) {
  const div = document.createElement("div");

  div.className = "task";
  div.setAttribute("draggable", true);

  div.innerHTML = `
    <p>${text}</p>

    <div class="task-buttons">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // ✏ Edit
  div.querySelector(".edit-btn").addEventListener("click", () => {
    const newText = prompt("Edit task:", text);

    if (newText) {
      div.querySelector("p").innerText = newText;
      saveTasks();
    }
  });

  // 🗑 Delete
  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
    saveTasks();
  });

  // 🎯 Drag Start
  div.addEventListener("dragstart", () => {
    draggedTask = div;
    div.classList.add("dragging");
  });

  // 🎯 Drag End
  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
    saveTasks();
  });

  return div;
}

// 📦 Drop Zones
columns.forEach(column => {

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", () => {
    if (draggedTask) {
      column.appendChild(draggedTask);
      saveTasks();
    }
  });

});

// 💾 Save Tasks
function saveTasks() {
  const data = {};

  columns.forEach(column => {
    const tasks = [];

    column.querySelectorAll(".task p").forEach(task => {
      tasks.push(task.innerText);
    });

    data[column.id] = tasks;
  });

  localStorage.setItem("kanban", JSON.stringify(data));
}

// 📂 Load Tasks
function loadTasks() {
  const data = JSON.parse(localStorage.getItem("kanban"));

  if (!data) return;

  Object.keys(data).forEach(columnId => {
    data[columnId].forEach(taskText => {
      const task = createTask(taskText);
      document.getElementById(columnId).appendChild(task);
    });
  });
}