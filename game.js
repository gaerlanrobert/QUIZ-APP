const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "I will crack if you drop me. If you smile at me, I’ll smile back. What am I?",
    choice1: "Nut",
    choice2: "An egg",
    choice3: "A vase",
    choice4: "A mirror",
    answer: 4
  },
  {
    question: "Who was our 36th President?",
    choice1: "John F. Kennedy",
    choice2: "Lyndon B. Johnson",
    choice3: "Richard Nixon",
    choice4: "Dwight D. Eisenhower",
    answer: 2
  },
  {
    question: "How do you display an alert in javascript?",
    choice1: "alert(alert text here)",
    choice2: "alert.(alert text here)",
    choice3: "(alert text here).alert",
    choice4: "alert()",
    answer: 4
  },
  {
    question: "What movie has this quote (This is my BOOMSTICK!)?",
    choice1: "Army of Darkness",
    choice2: "Scream",
    choice3: "Toy Story 2",
    choice4: "The Evil Dead",
    answer: 1
  },
  {
    question: "Who was Skater Of The Year in 1990?",
    choice1: "Danny Way",
    choice2: "Eric Koston",
    choice3: "Tony Hawk",
    choice4: "Brian Anderson",
    answer: 3
  },
  {
    question: "When did the Titanic Sink?",
    choice1: "May 4-5 1912",
    choice2: "June 1-2 1912",
    choice3: "December 12-13 1912",
    choice4: "April 14-15 1912",
    answer: 4
  },
  {
    question: "What year did the Los Angeles Dodgers win the World Series ",
    choice1: "1987",
    choice2: "1984",
    choice3: "2013",
    choice4: "1988",
    answer: 4
  },
  {
    question: "Which of these 80s films was directed by Steven Spielberg",
    choice1: "Gremlins",
    choice2: "Poltergeist",
    choice3: "Always",
    choice4: "The Goonies",
    answer: 3
  },
  {
    question: "Which of these 80s films was directed by Steven Spielberg",
    choice1: "Gremlins",
    choice2: "Poltergeist",
    choice3: "Always",
    choice4: "The Goonies",
    answer: 3
  },
  {
    question: "Which one of these movies in NOT based on true events?",
    choice1: "The Birds",
    choice2: "The Exorcist",
    choice3: "The Amityville Horror",
    choice4: "The Conjuring",
    answer: 1
  },
  {
    question: "When you mix Blue and Yellow you get what color?",
    choice1: "Purple",
    choice2: "Black",
    choice3: "Red",
    choice4: "Green",
    answer: 4
  }
];

// These are the constants//
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    // Go to the End Page//
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //   Updating Progress Bar //
  progressText.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = "correct";
    }

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
