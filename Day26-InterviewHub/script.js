// ======================================
// INTERVIEW PREPARATION HUB
// SCRIPT.JS - PART 1
// ======================================

// ======================================
// DOM ELEMENTS
// ======================================

const questionContainer = document.getElementById("questionContainer");

const searchInput = document.getElementById("searchInput");

const categoryButtons =
document.querySelectorAll(".category-btn");

const totalQuestions =
document.getElementById("totalQuestions");

const completedQuestions =
document.getElementById("completedQuestions");

const bookmarkedQuestions =
document.getElementById("bookmarkedQuestions");

const progressPercent =
document.getElementById("progressPercent");

const emptyState =
document.getElementById("emptyState");


// ======================================
// LOAD QUESTIONS
// ======================================

let savedQuestions = JSON.parse(

    localStorage.getItem("interviewQuestions")

);

let interviewQuestions =

savedQuestions && savedQuestions.length > 0

? savedQuestions

: [...questions];


// ======================================
// SAVE QUESTIONS
// ======================================

function saveQuestions(){

    localStorage.setItem(

        "interviewQuestions",

        JSON.stringify(interviewQuestions)

    );

}


// ======================================
// RENDER QUESTIONS
// ======================================

function renderQuestions(

    data = interviewQuestions

){

    questionContainer.innerHTML = "";

    if(data.length === 0){

        emptyState.style.display = "block";

        questionContainer.style.display = "none";

        updateDashboard();

        return;

    }

    emptyState.style.display = "none";

    questionContainer.style.display = "grid";

    data.forEach(question=>{

        const card = document.createElement("div");

        card.className = "question-card";

        card.innerHTML = `

            <span class="category">

                ${question.category}

            </span>

            <h2 class="question">

                ${question.question}

            </h2>

            <div

                id="answer-${question.id}"

                class="answer">

                ${question.answer}

            </div>

            <div class="action-buttons">

                <button

                    class="show-btn"

                    onclick="toggleAnswer(${question.id})">

                    👁 Show Answer

                </button>

                <button

                    class="bookmark-btn"

                    onclick="bookmarkQuestion(${question.id})">

                    ${question.bookmarked

                    ? "⭐ Bookmarked"

                    : "⭐ Bookmark"}

                </button>

                <button

                    class="complete-btn"

                    onclick="completeQuestion(${question.id})">

                    ${question.completed

                    ? "✅ Completed"

                    : "✔ Complete"}

                </button>

            </div>

        `;

        questionContainer.appendChild(card);

    });

    updateDashboard();

}
// ======================================
// UPDATE DASHBOARD
// ======================================

function updateDashboard(){

    totalQuestions.textContent =
        interviewQuestions.length;

    const completed =
        interviewQuestions.filter(

            question => question.completed

        ).length;

    const bookmarked =
        interviewQuestions.filter(

            question => question.bookmarked

        ).length;

    completedQuestions.textContent =
        completed;

    bookmarkedQuestions.textContent =
        bookmarked;

    const progress =

        interviewQuestions.length === 0

        ? 0

        : Math.round(

            (completed / interviewQuestions.length) * 100

        );

    progressPercent.textContent =
        progress + "%";

}


// ======================================
// SHOW / HIDE ANSWER
// ======================================

function toggleAnswer(id){

    const answer =

        document.getElementById(

            `answer-${id}`

        );

    if(!answer) return;

    answer.classList.toggle("show");

}


// ======================================
// BOOKMARK QUESTION
// ======================================

function bookmarkQuestion(id){

    const question =

        interviewQuestions.find(

            item => item.id === id

        );

    if(!question) return;

    question.bookmarked =

        !question.bookmarked;

    saveQuestions();

    renderQuestions();

}


// ======================================
// COMPLETE QUESTION
// ======================================

function completeQuestion(id){

    const question =

        interviewQuestions.find(

            item => item.id === id

        );

    if(!question) return;

    question.completed =

        !question.completed;

    saveQuestions();

    renderQuestions();

}
// ======================================
// SEARCH QUESTIONS
// ======================================

searchInput.addEventListener("input", function () {

    const searchValue = this.value
        .toLowerCase()
        .trim();

    const activeButton =
        document.querySelector(".category-btn.active");

    const activeCategory =
        activeButton
            ? activeButton.dataset.category
            : "All";

    let filteredQuestions =
        interviewQuestions.filter(question =>

            question.question
                .toLowerCase()
                .includes(searchValue)

        );

    if(activeCategory !== "All"){

        filteredQuestions =
            filteredQuestions.filter(question =>

                question.category === activeCategory

            );

    }

    renderQuestions(filteredQuestions);

});


// ======================================
// CATEGORY FILTER
// ======================================

categoryButtons.forEach(button=>{

    button.addEventListener("click",function(){

        categoryButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const category =
            this.dataset.category;

        const searchValue =
            searchInput.value
            .toLowerCase()
            .trim();

        let filteredQuestions =
            interviewQuestions.filter(question=>

                question.question
                    .toLowerCase()
                    .includes(searchValue)

            );

        if(category !== "All"){

            filteredQuestions =
                filteredQuestions.filter(question=>

                    question.category === category

                );

        }

        renderQuestions(filteredQuestions);

    });

});


// ======================================
// RESET FILTERS
// ======================================

function resetFilters(){

    searchInput.value = "";

    categoryButtons.forEach(button=>{

        button.classList.remove("active");

    });

    categoryButtons[0].classList.add("active");

    renderQuestions();

}


// ======================================
// CLEAR LOCAL STORAGE
// (Developer Tool)
// ======================================

function clearProgress(){

    if(confirm("Reset all interview progress?")){

        localStorage.removeItem(
            "interviewQuestions"
        );

        interviewQuestions = [...questions];

        saveQuestions();

        resetFilters();

    }

}
// ======================================
// TOGGLE EMPTY STATE
// ======================================

function toggleEmptyState(data = interviewQuestions){

    if(data.length === 0){

        emptyState.style.display = "block";

        questionContainer.style.display = "none";

    }
    else{

        emptyState.style.display = "none";

        questionContainer.style.display = "grid";

    }

}


// ======================================
// IMPROVED RENDER FUNCTION
// ======================================

const originalRenderQuestions = renderQuestions;

renderQuestions = function(data = interviewQuestions){

    toggleEmptyState(data);

    originalRenderQuestions(data);

};


// ======================================
// REFRESH DASHBOARD
// ======================================

function refreshApp(){

    saveQuestions();

    renderQuestions();

}


// ======================================
// INITIAL LOAD
// ======================================

window.addEventListener("DOMContentLoaded",()=>{

    renderQuestions();

});

document.addEventListener("keydown",(event)=>{

    if(

        event.ctrlKey &&

        event.shiftKey &&

        event.key.toLowerCase()==="r"

    ){

        clearProgress();

    }

});