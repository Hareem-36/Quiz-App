// Define the Question class
class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}

// Define the Quiz class
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.questionElement = document.getElementById('question');
    this.optionsElement = document.getElementById('options');
    this.nextButton = document.getElementById('next-btn');
    this.nextButton.addEventListener('click', () => this.nextQuestion());
    this.displayQuestion();
  }

  displayQuestion() {
    var currentQuestion = this.questions[this.currentQuestionIndex];
    this.questionElement.innerHTML = `<strong>${currentQuestion.question}</strong>`;
    this.optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      var optionElement = document.createElement('input');
      optionElement.type = 'radio';
      optionElement.name = 'option';
      optionElement.value = option;
      optionElement.id = `option${index}`;
      var labelElement = document.createElement('label');
      labelElement.textContent = option;
      labelElement.setAttribute('for', `option${index}`);
      this.optionsElement.appendChild(optionElement);
      this.optionsElement.appendChild(labelElement);
    });
  }

  checkAnswer(selectedOption) {
    var currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      this.score++;
    }
  }

  nextQuestion() {
    var selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      this.checkAnswer(selectedOption.value);
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        this.displayQuestion();
      } else {
        this.showResult();
      }
    } else {
      alert('Please select an option');
    }
  }

  showResult() {
    var percentage = ((this.score / this.questions.length) * 100).toFixed(2);
    var resultMessage = `<strong>Quiz Completed!<strong> Your Score: ${this.score}/${this.questions.length} (${percentage}%)`;
    this.questionElement.innerHTML = resultMessage;
    this.optionsElement.innerHTML = '';
    this.nextButton.style.display = 'none';
  }
} // <-- Missing closing brace for the Quiz class

// Define the array of questions
var questions = [
  new Question("HTML stands for:", ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlink and Text Markup Language", "Highlink Text Markup Language"], "Hyper Text Markup Language"),
  new Question("Which of the following is NOT a JavaScript data type?", ["print()", "display()", "array", "string"], "array"),
  new Question("Which function is used to output data in JavaScript?", ["print()", "display()", "write()", "console.log()"], "console.log()"),
  new Question("CSS stands for:", ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], "Cascading Style Sheets"),
  
  new Question("What is the correct way to comment out a line in JavaScript?", ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "<!>--- This is a comment ---<!>"], "// This is a comment"),
  new Question("Which symbol is used to denote an ID selector in CSS?", ["#", ".", "&", "$"], "#"),
  new Question("Which property is used to change the background color of an element in CSS?", ["color", "text-color", "background-color", "bgcolor"], "background-color"),
  new Question("What is the default value of the position property in CSS?", ["absolute", "relative", "fixed", "static"], "static"),
  new Question("What keyword is used to declare a variable in JavaScript?", ["var", "let", "const", "All of the above"], "All of the above"),
  new Question("What does the || operator do in JavaScript?", ["Logical AND", "Logical OR", "Logical NOT", "static"], "Equality comparison"),// Add more questions here
];

// Initialize the quiz with the questions array
const quiz = new Quiz(questions);
