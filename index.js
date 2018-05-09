let questionNumber =0;
let score = 0;

// Generate New Question for HTML //rendering
function generateNewQuestion () {
    if(questionNumber < QUESTIONS.length) {
       return `<div class="question-${questionNumber}">
        <h2 class="question">${QUESTIONS[questionNumber].question}</h2>
        <form>
        <label class="answerOption">
        <input type="radio" value="${QUESTIONS[questionNumber].answers[0]}" name="answer" required>
        <span>${QUESTIONS[questionNumber].answers[0]}</span> 
        </label>
        <label class="answerOption">
        <input type="radio" value="${QUESTIONS[questionNumber].answers[1]}" name= "answer" required>
        <span>${QUESTIONS[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${QUESTIONS[questionNumber].answers[2]}" name="answer" required>
        <span>${QUESTIONS[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${QUESTIONS[questionNumber].answers[3]}" name="answer" required>
        <span>${QUESTIONS[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </form>
        </div>`;
    } else {
        renderResults();/*very bottom*/
        restartQuiz();
        $('.questionNumber').text(10);//0/10
    } 
}
/*a., b.,c. d. after span for future reference*/

//increment question number 
function changeQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber+1);
}

//Increment Score
function newScore() {
    score++;
  /* $('.score').text(score+1); (if want it to look like question# )*/
}

//hide element h2 and button: 'Let's start button'
function startQuiz() {
    $('.startQuiz').on('click','.startButton', function(event) {
        $('.startQuiz').remove();
        renderQuestion();
        $('.questionAnswerForm').css('display','block');
        $('.questionNumber').text(1);/* ONCE click submit, ques# becomes 1/10*/
    })
}

//render question in DOM and display on page
function renderQuestion() {
    const question = generateNewQuestion();
    $('.questionAnswerForm').html(generateNewQuestion());
    selectedAnswer();
}

//receiving feedback the correct answer, and color coded?
//prevent from submission
//when users click submit after clicked on selected answer
function selectedAnswer () {
    $('form').on('submit',function (event) {
    event.preventDefault();
    let selected = $('input:checked'); //input pseudo class checked
    let answer = selected.val(); //answer: input's value()
    let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
    debugger
    if (answer === correctAnswer) { 
    //   selected.parent().addClass('correct');
      ifAnswerIsCorrect(); 
    } else {
    //   selected.parent().addClass('wrong');
      ifAnswerIsWrong(); 
    }
  });
}

//user feedback for correct answer
function ifAnswerIsCorrect () {
  correctFeedBack();
  updateScore();
}

//user feedback for wrong answer
function ifAnswerIsWrong () {
  incorrectFeedBack();
}

//Update Score TEXT
function updateScore() {
    newScore();
    $('.score').text(score);
}

//feedback that pops up for correct answer
//render on page
function correctFeedBack() {
  let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedBack"><p><strong>You got it RIGHT!</strong></p><button type="button" class="nextButton">Next</button></div>`);
}

//feedback that pops up for incorrect answer
//render on page
function incorrectFeedBack() {
  let correctAnswer = `${QUESTIONS[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedBack"><p><strong>You chose the incorrect answer. The correct answer is ${correctAnswer}</strong></p><button type="button" class="nextButton">Next</button></div>`);
}

// rendering overall results at the end of the quiz
function renderResults() {
    if(score >= 8) {
      $('.questionAnswerForm').html(`<div class="results correctFeedBack"><h3>Great job on passing your quiz!</h3><p>YOU GOT ${score}/10</p><p>You're on your way to being an awesome Clinical Referral Coordinator.</p><button type="button" class="restartButton">RESTART QUIZ</button></div>`)
    } else if (score < 8 && score >= 5) {
        $('.questionAnswerForm').html(`<div class="results correctFeedBack"><h3>You are almost there!</h3><p>YOU GOT ${score}/10</p><p>You may need to review some content before retaking this quiz.</p><button type="button" class="restartButton">RESTART QUIZ</button></div>`)  
    } else { 
        $('.questionAnswerForm').html(`<div class="results correctFeedBack"><h3>Oh no, you did not meet our requirements.</h3>
        <p>YOU GOT ${score}/10</p><p>You will need to get with your Practice Administrator.</p>
        <button type="button" class="restartButton">RESTART QUIZ</button></div>`)
    }
}

//Clicks next, renders new page with new questions and answers, change question#, updated score
function renderNextQuestion () {
  $('main').on('click','.nextButton', function(event) {
      changeQuestionNumber();
      const newQuestion = renderQuestion();
      $('.questionAnswerForm').html(newQuestion);
  });
}
//restart Quiz function - reloads page to start over
function restartQuiz() {
  $('main').on('click','.restartButton', function (event) {
      location.reload();
  });
}

//run all functions
function startMedQuiz () {
    startQuiz();
    selectedAnswer();
    renderNextQuestion();
    restartQuiz();
}

//callback function
$(startMedQuiz);
