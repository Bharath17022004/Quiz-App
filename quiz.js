document.addEventListener("DOMContentLoaded", function () {

  let currentquestionIndex = 0;
  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Venus", "Mars", "Jupiter"],
      answer: "Mars"
    },
    {
      question: "What is 5 + 7?",
      choices: ["10", "11", "12", "13"],
      answer: "12"
    },
    {
      question: "What is the largest ocean?",
      choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: "Pacific"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      choices: ["Shakespeare", "Chaucer", "Wordsworth", "Dickens"],
      answer: "Shakespeare"
    }
  ];

  const question_text = document.getElementById('question-text');
  const choices_buttons = document.querySelectorAll('.choices');
  const currentquestion_no = document.getElementById('question-count');
  const total_questions = document.getElementById('total-count');
  const scoretext = document.getElementById('score');
  let score = 0;

  function showquestion() {
    const currentquestion = questions[currentquestionIndex];
    question_text.textContent = currentquestion.question;
    currentquestion_no.textContent = currentquestionIndex + 1;
    total_questions.textContent = questions.length;



    //update choices
    if (currentquestionIndex >= questions.length) {
      return; // stop if no more questions
    }

    choices_buttons.forEach((button, index) => {
      button.classList.remove('correct', 'incorrect');
      button.disabled = false;
      let choice = currentquestion.choices[index];
      button.textContent = choice;
      button.value = choice;
      button.onclick = () => {
        selectanswer(button);
      }
    });


  }

  function selectanswer(selectedbutton) {
    const correct_answer = questions[currentquestionIndex].answer;
    choices_buttons.forEach((button) => {
      button.disabled = true;
      if (button.value === correct_answer) {
        button.classList.add('correct');
      }
      else {
        button.classList.add('incorrect');
      }
    });



    if (selectedbutton.value === correct_answer) {
      score += 2;
      scoretext.textContent = score;
    }

    setTimeout(() => {
      currentquestionIndex++;

      const progress = document.getElementById('progress');
      progress.style.width = ((currentquestionIndex / questions.length) * 100) + '%';

      if (currentquestionIndex < questions.length) {
        showquestion();
      }
      else {
        showresult();
      }
    }, 1500);
  }


  function showresult() {
    document.getElementById('quiz-screen').classList.remove("screen-active");
    document.getElementById('quiz-screen').classList.add("screen");
    document.getElementById('result-screen').classList.remove("screen");
    document.getElementById('result-screen').classList.add("screen-active");
    document.getElementById('final-score').textContent = score;
    document.getElementById('max-score').textContent = questions.length * 2;
    const message = document.getElementById('result-message');
    if (score >= questions.length - 2) {
      message.textContent = "super good";
    }
  }


  document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-screen").classList.remove("screen-active");
    document.getElementById("start-screen").classList.add("screen");
    document.getElementById("quiz-screen").classList.remove("screen");
    document.getElementById("quiz-screen").classList.add("screen-active");
    showquestion();

  });

  function restart_quiz() {
    document.getElementById("result-screen").classList.remove("screen-active");
    document.getElementById("result-screen").classList.add("screen");
    document.getElementById("start-screen").classList.remove("screen");
    document.getElementById("start-screen").classList.add("screen-active");
    currentquestionIndex = 0;
    score = 0;
    scoretext.textContent = 0;
  }
  const restart_btn = document.getElementById('restart-btn');
  restart_btn.addEventListener("click", restart_quiz);

});
