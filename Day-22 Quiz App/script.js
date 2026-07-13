// =================================
// QUIZ QUESTIONS
// =================================

const questions = [

    {
        question: "Which keyword declares a block-scoped variable?",

        answers: [
            { text: "var", correct: false },
            { text: "let", correct: true },
            { text: "function", correct: false },
            { text: "define", correct: false }
        ]
    },

    {
        question: "What does DOM stand for?",

        answers: [
            {
                text: "Document Object Model",
                correct: true
            },
            {
                text: "Data Object Method",
                correct: false
            },
            {
                text: "Digital Output Model",
                correct: false
            },
            {
                text: "Document Order Method",
                correct: false
            }
        ]
    },

    {
        question: "Which method adds an element to the end of an array?",

        answers: [
            { text: "push()", correct: true },
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "filter()", correct: false }
        ]
    },

    {
        question: "Which method removes the last element from an array?",

        answers: [
            { text: "shift()", correct: false },
            { text: "push()", correct: false },
            { text: "pop()", correct: true },
            { text: "unshift()", correct: false }
        ]
    },

    {
        question: "Which operator checks both value and data type?",

        answers: [
            { text: "==", correct: false },
            { text: "=", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ]
    },

    {
        question: "Which array method creates a new array containing matching items?",

        answers: [
            { text: "find()", correct: false },
            { text: "filter()", correct: true },
            { text: "forEach()", correct: false },
            { text: "reduce()", correct: false }
        ]
    },

    {
        question: "Which method converts a JavaScript object into a JSON string?",

        answers: [
            { text: "JSON.parse()", correct: false },
            { text: "JSON.stringify()", correct: true },
            { text: "JSON.convert()", correct: false },
            { text: "JSON.object()", correct: false }
        ]
    },

    {
        question: "Which event occurs when a user clicks an HTML element?",

        answers: [
            { text: "change", correct: false },
            { text: "submit", correct: false },
            { text: "click", correct: true },
            { text: "input", correct: false }
        ]
    },

    {
        question: "Which method prevents a form from refreshing the page?",

        answers: [
            { text: "stop()", correct: false },
            { text: "preventDefault()", correct: true },
            { text: "prevent()", correct: false },
            { text: "stopDefault()", correct: false }
        ]
    },

    {
        question: "Which browser storage keeps data after the page is refreshed?",

        answers: [
            { text: "console", correct: false },
            { text: "DOM", correct: false },
            { text: "localStorage", correct: true },
            { text: "eventListener", correct: false }
        ]
    }

];


// =================================
// DOM ELEMENTS
// =================================

const questionNumber =
    document.getElementById("questionNumber");

const scoreElement =
    document.getElementById("score");

const progressBar =
    document.getElementById("progressBar");

const questionElement =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answerButtons");

const nextBtn =
    document.getElementById("nextBtn");

const quizSection =
    document.getElementById("quizSection");

const resultSection =
    document.getElementById("resultSection");

const finalScore =
    document.getElementById("finalScore");

const percentageElement =
    document.getElementById("percentage");

const resultMessage =
    document.getElementById("resultMessage");

const restartBtn =
    document.getElementById("restartBtn");


// =================================
// QUIZ STATE
// =================================

let currentQuestionIndex = 0;

let score = 0;


// =================================
// START QUIZ
// =================================

function startQuiz() {

    currentQuestionIndex = 0;

    score = 0;

    scoreElement.textContent = "Score: 0";

    quizSection.classList.remove("hidden");

    resultSection.classList.add("hidden");

    showQuestion();

}


// =================================
// SHOW QUESTION
// =================================

function showQuestion() {

    // Remove previous answers

    resetState();


    // Get current question

    const currentQuestion =
        questions[currentQuestionIndex];


    // Update question number

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;


    // Display question

    questionElement.textContent =
        currentQuestion.question;


    // Update progress bar

    const progress =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    // Create answer buttons

    currentQuestion.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.textContent =
            answer.text;


        button.classList.add("answer-btn");


        // Store correct answer information

        button.dataset.correct =
            answer.correct;


        // Add click event

        button.addEventListener(
            "click",
            selectAnswer
        );


        answerButtons.appendChild(button);

    });

}


// =================================
// RESET QUESTION STATE
// =================================

function resetState() {

    // Hide Next button

    nextBtn.style.display = "none";


    // Remove previous answer buttons

    while (answerButtons.firstChild) {

        answerButtons.removeChild(
            answerButtons.firstChild
        );

    }

}


// =================================
// SELECT ANSWER
// =================================

function selectAnswer(event) {

    const selectedButton =
        event.target;


    const isCorrect =
        selectedButton.dataset.correct === "true";


    // Check selected answer

    if (isCorrect) {

        selectedButton.classList.add(
            "correct"
        );


        score++;


        scoreElement.textContent =
            `Score: ${score}`;

    }

    else {

        selectedButton.classList.add(
            "wrong"
        );

    }


    // Show correct answer
    // and disable all buttons

    Array.from(
        answerButtons.children
    ).forEach(button => {


        if (
            button.dataset.correct === "true"
        ) {

            button.classList.add(
                "correct"
            );

        }


        button.disabled = true;

    });


    // Show Next button

    nextBtn.style.display = "block";

}


// =================================
// NEXT QUESTION
// =================================

nextBtn.addEventListener(
    "click",
    function () {

        currentQuestionIndex++;


        // More questions available

        if (
            currentQuestionIndex <
            questions.length
        ) {

            showQuestion();

        }

        // Quiz completed

        else {

            showResult();

        }

    }
);


// =================================
// SHOW FINAL RESULT
// =================================

function showResult() {

    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");


    // Calculate percentage

    const percentage = Math.round(

        (score / questions.length) * 100

    );


    // Display final score

    finalScore.textContent =
        `${score} / ${questions.length}`;


    // Display percentage

    percentageElement.textContent =
        `${percentage}%`;


    // Display result message

    if (percentage === 100) {

        resultMessage.textContent =
            "🏆 Perfect score! Excellent work!";

    }

    else if (percentage >= 80) {

        resultMessage.textContent =
            "🌟 Excellent! Great JavaScript knowledge!";

    }

    else if (percentage >= 60) {

        resultMessage.textContent =
            "👍 Good job! Keep improving!";

    }

    else if (percentage >= 40) {

        resultMessage.textContent =
            "📚 Good attempt! Keep practicing!";

    }

    else {

        resultMessage.textContent =
            "💪 Keep learning and try again!";

    }

}


// =================================
// RESTART QUIZ
// =================================

restartBtn.addEventListener(
    "click",
    startQuiz
);


// =================================
// INITIAL START
// =================================

startQuiz();