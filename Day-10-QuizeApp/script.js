const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreText = document.getElementById("score");
const progress = document.getElementById("progress");

const quizData = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language is used for styling?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correct: 1
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: ["React", "Angular", "Vue", "Django"],
    correct: 3
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  const q = quizData[currentQuestion];

  questionEl.innerText = q.question;
  progress.innerText = `Question ${currentQuestion + 1} / ${quizData.length}`;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(index) {
  const correctIndex = quizData[currentQuestion].correct;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    if (i === correctIndex) {
      btn.classList.add("correct");
    } else if (i === index) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (index === correctIndex) {
    score++;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.innerText = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
  scoreText.innerText = `Your Score: ${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreText.innerText = "";
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();