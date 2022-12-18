
// Create a Math question
// Math question will have a random generated
// Multiplicatin question  with random number between 1-10
// Answer will be the product of the random number range and the random number range
// User will have to answer question
// On submit  answer answer will be compared with random generated answer
// If answer will be correct than score will be incremented
// If answer will be wrong than score will be decremented
// Generate 4 Types of question
// Store the score in local storage and display the score on the screen
// Give Feedback to user using toast
const boxEl = document.getElementById('boxx');
const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
let seconds = 60;
const countDown = document.getElementById('timer');
let storedAnswer;
let score = 0;
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
  const randomNumber1 = randomNumber(1, 10);
  const randomNumber2 = randomNumber(1, 10);
  const questionType = randomNumber(1, 4);

  let firstNumber = randomNumber1;
  let secondNumber = randomNumber2;

  let question;
  let answer;

  switch (questionType) {
    case 1:
      question = ` ${firstNumber} * ${secondNumber} = `;
      answer = firstNumber * secondNumber;
      break;
    case 2:
      question = ` ${firstNumber} + ${secondNumber} = `;
      answer = firstNumber + secondNumber;
      break;
    case 3:
      question = ` ${firstNumber} / ${secondNumber} = `;
      answer = firstNumber / secondNumber;
      break;
    case 4:
      question = `  ${firstNumber} - ${secondNumber} = `;
      answer = firstNumber - secondNumber;
      break;
  }

  return { question, answer };
};

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  scoreEl.innerText = score;
  storedAnswer = answer;
};
showQuestion();

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(questionFormEl);

  const userAnswer = +formData.get("answer");
  if (userAnswer === storedAnswer) {
    score += 1;
    Toastify({
      text: `CORRECT!!`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text: `WRONG!!`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #e33217, #ff001e)",
      },
    }).showToast();
  }
  scoreEl.innerText = score;
  localStorage.setItem("score", score);
  event.target.reset();
  showQuestion();
  console.log("answer", userAnswer);
};

var time = setInterval(updateTimer,1000);

function updateTimer() {
    seconds = seconds < 10 ? '0'+seconds : seconds;
    countDown.innerHTML = `${seconds}`;
    seconds--;
    if(seconds<0){
      clearInterval(time);
      showResult();
    }
}

const showResult = () => {
  boxEl.style.display = "none";
  boxEl.innerHTML = `<h1> Your Total Score is ${score}!!`;
  boxEl.style.display = "flex";
}