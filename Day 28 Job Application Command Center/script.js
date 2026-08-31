// ======================================
// DOM ELEMENTS
// ======================================

const applicationModal =
    document.getElementById("applicationModal");

const applicationForm =
    document.getElementById("applicationForm");

const addApplicationBtn =
    document.getElementById("addApplicationBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelModalBtn =
    document.getElementById("cancelModalBtn");

const modalTitle =
    document.getElementById("modalTitle");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const roleFilter =
    document.getElementById("roleFilter");


// ======================================
// DASHBOARD ELEMENTS
// ======================================

const totalApplications =
    document.getElementById("totalApplications");

const interviewCount =
    document.getElementById("interviewCount");

const offerCount =
    document.getElementById("offerCount");

const activeApplications =
    document.getElementById("activeApplications");


// ======================================
// APPLICATION FORM ELEMENTS
// ======================================

const companyInput =
    document.getElementById("companyInput");

const roleInput =
    document.getElementById("roleInput");

const statusInput =
    document.getElementById("statusInput");

const dateInput =
    document.getElementById("dateInput");

const salaryInput =
    document.getElementById("salaryInput");

const locationInput =
    document.getElementById("locationInput");

const notesInput =
    document.getElementById("notesInput");


// ======================================
// PIPELINE LISTS
// ======================================

const pipelineLists = {

    Wishlist:
        document.getElementById("wishlistList"),

    Applied:
        document.getElementById("appliedList"),

    Screening:
        document.getElementById("screeningList"),

    Interview:
        document.getElementById("interviewList"),

    Offer:
        document.getElementById("offerList")

};


// ======================================
// COLUMN COUNTERS
// ======================================

const columnCounters = {

    Wishlist:
        document.getElementById("wishlistCount"),

    Applied:
        document.getElementById("appliedCount"),

    Screening:
        document.getElementById("screeningCount"),

    Interview:
        document.getElementById("interviewColumnCount"),

    Offer:
        document.getElementById("offerColumnCount")

};


// ======================================
// APPLICATION DATA
// ======================================

let applications =

    JSON.parse(
        localStorage.getItem("jobApplications")
    ) || [];


// ======================================
// EDITING STATE
// ======================================

let editingApplicationId = null;


// ======================================
// SAVE APPLICATIONS
// ======================================

function saveApplications() {

    localStorage.setItem(

        "jobApplications",

        JSON.stringify(applications)

    );

}


// ======================================
// CREATE APPLICATION
// ======================================

function createApplication(data) {

    return {

        id: Date.now(),

        company: data.company,

        role: data.role,

        status: data.status,

        date: data.date,

        salary: data.salary,

        location: data.location,

        notes: data.notes

    };

}


// ======================================
// RENDER APPLICATIONS
// ======================================

function renderApplications() {

    // Clear all pipeline columns

    Object.values(pipelineLists)
        .forEach(list => {

            list.innerHTML = "";

        });


    const filteredApplications =
        getFilteredApplications();


    // Render each application

    filteredApplications.forEach(application => {

        if (!pipelineLists[application.status]) {

            return;

        }

        const card =
            createApplicationCard(application);

        pipelineLists[
            application.status
        ].appendChild(card);

    });


    // Show empty message in empty columns

    Object.entries(pipelineLists)
        .forEach(([status, list]) => {

            if (list.children.length === 0) {

                list.innerHTML = `

                    <div class="column-empty">

                        No ${status.toLowerCase()}
                        applications

                    </div>

                `;

            }

        });


    updateColumnCounters();

    updateDashboard();

    updateEmptyState();

}


// ======================================
// CREATE APPLICATION CARD
// ======================================

function createApplicationCard(application) {

    const card =
        document.createElement("article");

    card.className =
        "application-card";

    card.draggable = true;

    card.dataset.id =
        application.id;


    const formattedDate =
        formatDate(application.date);


    card.innerHTML = `

        <div class="application-top">

            <div class="company-info">

                <div class="company-name">

                    ${escapeHTML(
                        application.company
                    )}

                </div>

                <div class="job-role">

                    ${escapeHTML(
                        application.role
                    )}

                </div>

            </div>

            <button
                class="card-menu"
                type="button"
                title="Application options"
            >
                ⋮
            </button>

        </div>


        <span class="status-badge
            ${application.status
                .toLowerCase()
                .replace(/\s+/g, "-")}">

            ${escapeHTML(
                application.status
            )}

        </span>


        <div class="application-details">

            ${
                application.location
                ? `

                    <div class="detail">

                        📍

                        <strong>
                            ${escapeHTML(
                                application.location
                            )}
                        </strong>

                    </div>

                `
                : ""
            }


            ${
                application.salary
                ? `

                    <div class="detail">

                        💰

                        <strong>
                            ${escapeHTML(
                                application.salary
                            )}
                        </strong>

                    </div>

                `
                : ""
            }


            ${
                application.notes
                ? `

                    <div class="detail">

                        📝

                        <strong>
                            ${escapeHTML(
                                application.notes
                            )}
                        </strong>

                    </div>

                `
                : ""
            }

        </div>


        <div class="application-footer">

            <span class="application-date">

                📅 ${formattedDate}

            </span>


            <div class="card-actions">

                <button
                    class="card-action edit"
                    type="button"
                    data-action="edit"
                    title="Edit application"
                >
                    ✏️
                </button>

                <button
                    class="card-action delete"
                    type="button"
                    data-action="delete"
                    title="Delete application"
                >
                    🗑️
                </button>

            </div>

        </div>

    `;


    return card;

}


// ======================================
// FILTER APPLICATIONS
// ======================================

function getFilteredApplications() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedStatus =
        statusFilter.value;


    const selectedRole =
        roleFilter.value;


    return applications.filter(application => {

        const matchesSearch =

            application.company
                .toLowerCase()
                .includes(searchValue)

            ||

            application.role
                .toLowerCase()
                .includes(searchValue);


        const matchesStatus =

            selectedStatus === "all"

            ||

            application.status ===
                selectedStatus;


        const matchesRole =

            selectedRole === "all"

            ||

            application.role ===
                selectedRole;


        return (

            matchesSearch &&

            matchesStatus &&

            matchesRole

        );

    });

}


// ======================================
// UPDATE DASHBOARD
// ======================================

function updateDashboard() {

    const total =
        applications.length;


    const interviews =
        applications.filter(

            application =>
                application.status ===
                "Interview"

        ).length;


    const offers =
        applications.filter(

            application =>
                application.status ===
                "Offer"

        ).length;


    const activeStatuses = [

        "Applied",

        "Screening",

        "Interview",

        "Offer"

    ];


    const active =
        applications.filter(

            application =>
                activeStatuses.includes(
                    application.status
                )

        ).length;


    totalApplications.textContent =
        total;

    interviewCount.textContent =
        interviews;

    offerCount.textContent =
        offers;

    activeApplications.textContent =
        active;

}


// ======================================
// UPDATE COLUMN COUNTERS
// ======================================

function updateColumnCounters() {

    Object.entries(columnCounters)
        .forEach(([status, counter]) => {

            const count =
                applications.filter(

                    application =>
                        application.status ===
                        status

                ).length;

            counter.textContent =
                count;

        });

}


// ======================================
// UPDATE EMPTY STATE
// ======================================

function updateEmptyState() {

    const emptyState =
        document.getElementById(
            "emptyState"
        );


    const pipeline =
        document.querySelector(
            ".pipeline"
        );


    const hasApplications =
        applications.length > 0;


    const hasFilteredResults =
        getFilteredApplications().length > 0;


    if (
        !hasApplications ||
        !hasFilteredResults
    ) {

        emptyState.style.display =
            "block";

    }
    else {

        emptyState.style.display =
            "none";

    }


    pipeline.style.display =

        hasApplications && hasFilteredResults

        ? "grid"

        : "none";

}


// ======================================
// FORMAT DATE
// ======================================

function formatDate(date) {

    if (!date) {

        return "No date";

    }


    const dateObject =
        new Date(date + "T00:00:00");


    if (Number.isNaN(
        dateObject.getTime()
    )) {

        return "Invalid date";

    }


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ======================================
// ESCAPE HTML
// ======================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;

}
// ======================================
// MODAL FUNCTIONS
// ======================================

// ======================================
// OPEN MODAL
// ======================================

function openModal(application = null) {

    applicationModal.classList.add("show");

    if (application) {

        // EDIT MODE

        editingApplicationId = application.id;

        modalTitle.textContent =
            "Edit Job Application";

        companyInput.value =
            application.company;

        roleInput.value =
            application.role;

        statusInput.value =
            application.status;

        dateInput.value =
            application.date || "";

        salaryInput.value =
            application.salary || "";

        locationInput.value =
            application.location || "";

        notesInput.value =
            application.notes || "";

    }
    else {

        // ADD MODE

        editingApplicationId = null;

        modalTitle.textContent =
            "Add Job Application";

        applicationForm.reset();

        // Set today's date

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.value = today;

        statusInput.value =
            "Wishlist";

    }

    // Focus first field

    setTimeout(() => {

        companyInput.focus();

    }, 100);

}


// ======================================
// CLOSE MODAL
// ======================================

function closeModal() {

    applicationModal.classList.remove("show");

    editingApplicationId = null;

    applicationForm.reset();

}


// ======================================
// ADD APPLICATION BUTTON
// ======================================

addApplicationBtn.addEventListener(
    "click",
    () => openModal()
);


// ======================================
// EMPTY STATE ADD BUTTON
// ======================================

emptyAddBtn.addEventListener(
    "click",
    () => openModal()
);


// ======================================
// CLOSE BUTTON
// ======================================

closeModalBtn.addEventListener(
    "click",
    closeModal
);


// ======================================
// CANCEL BUTTON
// ======================================

cancelModalBtn.addEventListener(
    "click",
    closeModal
);


// ======================================
// CLICK OUTSIDE MODAL
// ======================================

applicationModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            applicationModal
        ) {

            closeModal();

        }

    }
);


// ======================================
// ESCAPE KEY
// ======================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            applicationModal.classList.contains(
                "show"
            )
        ) {

            closeModal();

        }

    }
);


// ======================================
// FORM SUBMISSION
// ======================================

applicationForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Collect form data

        const data = {

            company:
                companyInput.value.trim(),

            role:
                roleInput.value.trim(),

            status:
                statusInput.value,

            date:
                dateInput.value,

            salary:
                salaryInput.value.trim(),

            location:
                locationInput.value.trim(),

            notes:
                notesInput.value.trim()

        };


        // Basic validation

        if (
            data.company === "" ||
            data.role === ""
        ) {

            alert(
                "Please enter company name and job role."
            );

            return;

        }


        // ==================================
        // EDIT EXISTING APPLICATION
        // ==================================

        if (
            editingApplicationId !== null
        ) {

            const application =
                applications.find(

                    item =>
                        item.id ===
                        editingApplicationId

                );


            if (application) {

                application.company =
                    data.company;

                application.role =
                    data.role;

                application.status =
                    data.status;

                application.date =
                    data.date;

                application.salary =
                    data.salary;

                application.location =
                    data.location;

                application.notes =
                    data.notes;

            }

        }


        // ==================================
        // CREATE NEW APPLICATION
        // ==================================

        else {

            const newApplication =
                createApplication(data);

            applications.push(
                newApplication
            );

        }


        // ==================================
        // SAVE & REFRESH
        // ==================================

        saveApplications();

        updateRoleFilter();

        renderApplications();

        closeModal();

    }
);
// ======================================
// SCRIPT.JS - PART 3
// EDIT / DELETE / SEARCH / FILTERS
// ======================================


// ======================================
// CARD ACTIONS
// ======================================

document.addEventListener("click", function (event) {

    const actionButton =
        event.target.closest(".card-action");

    if (!actionButton) {
        return;
    }


    const card =
        actionButton.closest(".application-card");

    if (!card) {
        return;
    }


    const applicationId =
        Number(card.dataset.id);


    const application =
        applications.find(
            item => item.id === applicationId
        );


    if (!application) {
        return;
    }


    const action =
        actionButton.dataset.action;


    // ==================================
    // EDIT
    // ==================================

    if (action === "edit") {

        openModal(application);

    }


    // ==================================
    // DELETE
    // ==================================

    if (action === "delete") {

        deleteApplication(applicationId);

    }

});


// ======================================
// DELETE APPLICATION
// ======================================

function deleteApplication(id) {

    const application =
        applications.find(
            item => item.id === id
        );


    if (!application) {
        return;
    }


    const confirmed =
        confirm(
            `Delete the application for ${application.company}?`
        );


    if (!confirmed) {
        return;
    }


    applications =
        applications.filter(
            item => item.id !== id
        );


    saveApplications();

    updateRoleFilter();

    renderApplications();

}


// ======================================
// SEARCH
// ======================================

searchInput.addEventListener(
    "input",
    function () {

        renderApplications();

    }
);


// ======================================
// STATUS FILTER
// ======================================

statusFilter.addEventListener(
    "change",
    function () {

        renderApplications();

    }
);


// ======================================
// ROLE FILTER
// ======================================

roleFilter.addEventListener(
    "change",
    function () {

        renderApplications();

    }
);


// ======================================
// UPDATE ROLE FILTER
// ======================================

function updateRoleFilter() {

    const currentRole =
        roleFilter.value;


    const roles =
        [
            ...new Set(
                applications
                    .map(
                        application =>
                            application.role.trim()
                    )
                    .filter(Boolean)
            )
        ]
        .sort();


    roleFilter.innerHTML = `

        <option value="all">
            All Roles
        </option>

    `;


    roles.forEach(role => {

        const option =
            document.createElement("option");

        option.value = role;

        option.textContent = role;

        roleFilter.appendChild(option);

    });


    // Restore previous selection

    if (
        roles.includes(currentRole)
    ) {

        roleFilter.value =
            currentRole;

    }
    else {

        roleFilter.value =
            "all";

    }

}


// ======================================
// INITIAL ROLE FILTER
// ======================================

updateRoleFilter();


// ======================================
// INITIAL RENDER
// ======================================

renderApplications();
// ======================================
// SCRIPT.JS - PART 4
// DRAG & DROP / NAVIGATION / THEME
// ======================================


// ======================================
// DRAG & DROP
// ======================================

let draggedApplicationId = null;


// ======================================
// DRAG START
// ======================================

document.addEventListener("dragstart", function (event) {

    const card =
        event.target.closest(".application-card");

    if (!card) {
        return;
    }

    draggedApplicationId =
        Number(card.dataset.id);

    card.classList.add("dragging");

});


// ======================================
// DRAG END
// ======================================

document.addEventListener("dragend", function (event) {

    const card =
        event.target.closest(".application-card");

    if (card) {

        card.classList.remove("dragging");

    }

    draggedApplicationId = null;

});


// ======================================
// DRAG OVER COLUMN
// ======================================

document.querySelectorAll(".pipeline-column")
    .forEach(column => {

        column.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                this.classList.add("drag-over");

            }
        );


        column.addEventListener(
            "dragleave",
            function () {

                this.classList.remove(
                    "drag-over"
                );

            }
        );


        column.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();

                this.classList.remove(
                    "drag-over"
                );


                if (
                    draggedApplicationId === null
                ) {

                    return;

                }


                const newStatus =
                    this.dataset.status;


                const application =
                    applications.find(
                        item =>
                            item.id ===
                            draggedApplicationId
                    );


                if (!application) {

                    return;

                }


                // Don't update if status is same

                if (
                    application.status ===
                    newStatus
                ) {

                    return;

                }


                application.status =
                    newStatus;


                saveApplications();

                renderApplications();

            }
        );

    });


// ======================================
// CURRENT DATE
// ======================================

const currentDate =
    document.getElementById("currentDate");


function updateCurrentDate() {

    if (!currentDate) {
        return;
    }


    const today =
        new Date();


    currentDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


// ======================================
// DARK MODE
// ======================================

const themeToggle =
    document.getElementById("themeToggle");


function updateThemeButton() {

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    if (isDark) {

        themeToggle.innerHTML =
            "☀️ <span>Light Mode</span>";

    }
    else {

        themeToggle.innerHTML =
            "🌙 <span>Dark Mode</span>";

    }

}


// Load saved theme

const savedTheme =
    localStorage.getItem(
        "jobTrackerTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

}


updateThemeButton();


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


        localStorage.setItem(
            "jobTrackerTheme",
            isDark
                ? "dark"
                : "light"
        );


        updateThemeButton();

    }
);


// ======================================
// SIDEBAR NAVIGATION
// ======================================

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(item => {

    item.addEventListener(
        "click",
        function () {

            navItems.forEach(nav => {

                nav.classList.remove(
                    "active"
                );

            });


            this.classList.add(
                "active"
            );


            const section =
                this.dataset.section;


            handleNavigation(section);

        }
    );

});


// ======================================
// NAVIGATION HANDLER
// ======================================

function handleNavigation(section) {

    if (section === "dashboard") {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        return;

    }


    if (section === "applications") {

        const pipeline =
            document.querySelector(
                ".pipeline"
            );

        if (pipeline) {

            pipeline.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        return;

    }


    if (section === "interviews") {

        statusFilter.value =
            "Interview";

        renderApplications();

        const pipeline =
            document.querySelector(
                ".pipeline"
            );

        if (pipeline) {

            pipeline.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

        return;

    }


    if (section === "offers") {

        statusFilter.value =
            "Offer";

        renderApplications();

        const pipeline =
            document.querySelector(
                ".pipeline"
            );

        if (pipeline) {

            pipeline.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }

}


// ======================================
// ESCAPE KEY
// ======================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            applicationModal.classList.contains(
                "show"
            )
        ) {

            closeModal();

        }

    }
);


// ======================================
// INITIALIZE APPLICATION
// ======================================

updateCurrentDate();

updateRoleFilter();

renderApplications();   