// DOM Elements
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const addBtn = document.getElementById("addBtn");

// ✅ Data with unique id
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render Tasks
function renderTasks(filter = "all") {
  list.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.text;

    if (task.completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(filter);
    });

    // Actions container
    const actions = document.createElement("div");
    actions.className = "actions";

    // ✏ Edit
    const edit = document.createElement("span");
    edit.innerText = "Edit";
    edit.addEventListener("click", (e) => {
      e.stopPropagation();
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks(filter);
      }
    });

    // ❌ Delete
    const del = document.createElement("span");
    del.innerText = "Delete";
    del.addEventListener("click", (e) => {
      e.stopPropagation();

      // ✅ Use unique ID instead of text
      tasks = tasks.filter(t => t.id !== task.id);

      saveTasks();
      renderTasks(filter);
    });

    actions.appendChild(edit);
    actions.appendChild(del);
    li.appendChild(actions);
    list.appendChild(li);
  });

  taskCount.innerText = `Total Tasks: ${tasks.length}`;
}

// Add Task
function addTask() {
  if (input.value.trim() === "") return;

  tasks.push({
    id: Date.now(), // 🔥 unique id
    text: input.value,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Button click
addBtn.addEventListener("click", addTask);

// Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter
function filterTasks(type) {
  renderTasks(type);
}

// Initial Load
renderTasks();