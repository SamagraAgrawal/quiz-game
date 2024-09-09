const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('time-left');
const scoreElement = document.getElementById('score-value');
const finalScoreElement = document.getElementById('final-score');
const endScreenElement = document.getElementById('end-screen');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false }
        ]
    },
    // Add more questions as needed
];

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    startButton.classList.add('hidden');
    score = 0;
    scoreElement.textContent = score;
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hidden');
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    document.getElementById('question').innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        // Adding fade-in effect to answer buttons
        button.style.opacity = 0;
        setTimeout(() => {
            button.style.opacity = 1;
        }, 100);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score += 10;
        animateScore();
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}

function startTimer() {
    timeLeft = 10;
    animateTimer();
    timerInterval = setInterval(() => {
        timeLeft--;
        animateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function animateTimer() {
    timerElement.textContent = timeLeft;
    timerElement.parentElement.classList.add('pulse');
    setTimeout(() => {
        timerElement.parentElement.classList.remove('pulse');
    }, 300);
}

function animateScore() {
    scoreElement.textContent = score;
    scoreElement.parentElement.classList.add('bounce');
    setTimeout(() => {
        scoreElement.parentElement.classList.remove('bounce');
    }, 300);
}

function endGame() {
    clearInterval(timerInterval);
    questionContainerElement.classList.add('hidden');
    endScreenElement.style.display = 'block';
    finalScoreElement.textContent = score;
}

function restartGame() {
    endScreenElement.style.display = 'none';
    startGame();
}
