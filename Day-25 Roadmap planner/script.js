// ======================================
// DOM ELEMENTS
// ======================================

const roadmapInput = document.getElementById("roadmapInput");
const addRoadmapBtn = document.getElementById("addRoadmapBtn");
const searchInput = document.getElementById("searchInput");

const roadmapContainer = document.getElementById("roadmapContainer");
const emptyState = document.getElementById("emptyState");

const totalRoadmaps = document.getElementById("totalRoadmaps");
const completedMilestones = document.getElementById("completedMilestones");
const pendingMilestones = document.getElementById("pendingMilestones");
const overallProgress = document.getElementById("overallProgress");

// ======================================
// LOCAL STORAGE
// ======================================

let roadmaps = JSON.parse(localStorage.getItem("roadmaps")) || [];

// ======================================
// SAVE DATA
// ======================================

function saveRoadmaps() {

    localStorage.setItem(
        "roadmaps",
        JSON.stringify(roadmaps)
    );

}

// ======================================
// GENERATE UNIQUE ID
// ======================================

function generateId() {

    return Date.now() + Math.floor(Math.random() * 1000);

}

// ======================================
// ADD ROADMAP
// ======================================

function addRoadmap() {

    const title = roadmapInput.value.trim();

    if (title === "") {

        alert("Please enter a roadmap name.");
        roadmapInput.focus();
        return;

    }

    const roadmap = {

        id: generateId(),

        title,

        milestones: []

    };

    roadmaps.push(roadmap);

    saveRoadmaps();

    renderRoadmaps();

    roadmapInput.value = "";

    roadmapInput.focus();

}

// ======================================
// SHOW / HIDE EMPTY STATE
// ======================================

function toggleEmptyState() {

    if (roadmaps.length === 0) {

        emptyState.style.display = "block";
        roadmapContainer.style.display = "none";

    } else {

        emptyState.style.display = "none";
        roadmapContainer.style.display = "grid";

    }

}

// ======================================
// EVENT LISTENERS
// ======================================

addRoadmapBtn.addEventListener("click", addRoadmap);

roadmapInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addRoadmap();

    }

});
// ======================================
// RENDER ROADMAPS
// ======================================

function renderRoadmaps(filteredRoadmaps = roadmaps) {

    roadmapContainer.innerHTML = "";

    filteredRoadmaps.forEach((roadmap) => {

        const completed = roadmap.milestones.filter(
            milestone => milestone.completed
        ).length;

        const total = roadmap.milestones.length;

        const progress = total === 0
            ? 0
            : Math.round((completed / total) * 100);

        roadmapContainer.innerHTML += `

        <div class="roadmap">

            <h2>${roadmap.title}</h2>

            <div class="progress-bar">

                <div
                    class="progress"
                    style="width:${progress}%">
                </div>

            </div>

            <p class="progress-text">

                ${progress}% Completed

            </p>

            <div class="milestone-input-box">

                <input
                    type="text"
                    id="input-${roadmap.id}"
                    class="milestone-input"
                    placeholder="Enter milestone">

                <button
                    class="add-milestone-btn"
                    onclick="addMilestone(${roadmap.id})">

                    + Add Milestone

                </button>

            </div>

            <ul class="milestone-list">

                ${roadmap.milestones.map(milestone => `

                    <li>

                        <label>

                            <input
                                type="checkbox"
                                ${milestone.completed ? "checked" : ""}
                                onchange="toggleMilestone(${roadmap.id},${milestone.id})">

                            <span class="${milestone.completed ? "completed" : ""}">

                                ${milestone.title}

                            </span>

                        </label>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editMilestone(${roadmap.id},${milestone.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteMilestone(${roadmap.id},${milestone.id})">

                                Delete

                            </button>

                        </div>

                    </li>

                `).join("")}

            </ul>

            <div class="action-buttons" style="margin-top:20px">

                <button
                    class="edit-btn"
                    onclick="editRoadmap(${roadmap.id})">

                    Edit Roadmap

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRoadmap(${roadmap.id})">

                    Delete Roadmap

                </button>

            </div>

        </div>

        `;

    });

    updateDashboard();

    toggleEmptyState();

}

// ======================================
// UPDATE DASHBOARD
// ======================================

function updateDashboard() {

    totalRoadmaps.textContent = roadmaps.length;

    let completed = 0;
    let pending = 0;

    roadmaps.forEach((roadmap) => {

        roadmap.milestones.forEach((milestone) => {

            if (milestone.completed) {

                completed++;

            } else {

                pending++;

            }

        });

    });

    completedMilestones.textContent = completed;

    pendingMilestones.textContent = pending;

    const totalMilestones = completed + pending;

    const progress = totalMilestones === 0
        ? 0
        : Math.round((completed / totalMilestones) * 100);

    overallProgress.textContent = `${progress}%`;

}
// ======================================
// ADD MILESTONE
// ======================================

function addMilestone(roadmapId) {

    const input = document.getElementById(`input-${roadmapId}`);

    const title = input.value.trim();

    if (title === "") {

        alert("Please enter a milestone.");
        input.focus();
        return;

    }

    const roadmap = roadmaps.find(item => item.id === roadmapId);

    if (!roadmap) return;

    roadmap.milestones.push({

        id: generateId(),
        title,
        completed: false

    });

    saveRoadmaps();

    renderRoadmaps();

}

// ======================================
// TOGGLE MILESTONE
// ======================================

function toggleMilestone(roadmapId, milestoneId) {

    const roadmap = roadmaps.find(item => item.id === roadmapId);

    if (!roadmap) return;

    const milestone = roadmap.milestones.find(
        item => item.id === milestoneId
    );

    if (!milestone) return;

    milestone.completed = !milestone.completed;

    saveRoadmaps();

    renderRoadmaps();

}

// ======================================
// EDIT MILESTONE
// ======================================

function editMilestone(roadmapId, milestoneId) {

    const roadmap = roadmaps.find(item => item.id === roadmapId);

    if (!roadmap) return;

    const milestone = roadmap.milestones.find(
        item => item.id === milestoneId
    );

    if (!milestone) return;

    const newTitle = prompt(
        "Edit milestone",
        milestone.title
    );

    if (!newTitle || newTitle.trim() === "") return;

    milestone.title = newTitle.trim();

    saveRoadmaps();

    renderRoadmaps();

}

// ======================================
// DELETE MILESTONE
// ======================================

function deleteMilestone(roadmapId, milestoneId) {

    const roadmap = roadmaps.find(item => item.id === roadmapId);

    if (!roadmap) return;

    const confirmDelete = confirm(
        "Delete this milestone?"
    );

    if (!confirmDelete) return;

    roadmap.milestones = roadmap.milestones.filter(

        milestone => milestone.id !== milestoneId

    );

    saveRoadmaps();

    renderRoadmaps();

}

// ======================================
// EDIT ROADMAP
// ======================================

function editRoadmap(roadmapId) {

    const roadmap = roadmaps.find(

        item => item.id === roadmapId

    );

    if (!roadmap) return;

    const newTitle = prompt(

        "Edit roadmap",

        roadmap.title

    );

    if (!newTitle || newTitle.trim() === "") return;

    roadmap.title = newTitle.trim();

    saveRoadmaps();

    renderRoadmaps();

}

// ======================================
// DELETE ROADMAP
// ======================================

function deleteRoadmap(roadmapId) {

    const confirmDelete = confirm(

        "Delete this roadmap?"

    );

    if (!confirmDelete) return;

    roadmaps = roadmaps.filter(

        roadmap => roadmap.id !== roadmapId

    );

    saveRoadmaps();

    renderRoadmaps();

}
// ======================================
// SEARCH ROADMAPS
// ======================================

searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase().trim();

    const filteredRoadmaps = roadmaps.filter((roadmap) =>

        roadmap.title.toLowerCase().includes(searchValue)

    );

    renderRoadmaps(filteredRoadmaps);

});

// ======================================
// ENTER KEY FOR MILESTONE INPUTS
// ======================================

document.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") return;

    if (!event.target.classList.contains("milestone-input")) return;

    const roadmapId = Number(
        event.target.id.replace("input-", "")
    );

    addMilestone(roadmapId);

});

// ======================================
// INITIAL LOAD
// ======================================

toggleEmptyState();

renderRoadmaps();

