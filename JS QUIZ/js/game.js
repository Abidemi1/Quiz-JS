const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let questions = [
  {
    question: 'What is HTML used for?',
    choice1: 'Structure',
    choice2: 'Design',
    choice3: 'Behaviour',
    choice4: 'None of the above',
    answer: 1, //choice1
  },
  {
    question: 'Which CSS style has the highest priority?',
    choice1: 'External',
    choice2: 'Inline',
    choice3: 'Internal',
    choice4: 'The developer has the choice to pick',
    answer: 2, //choice2
  },
  {
    question: 'Why is JS language so important to learn?',
    choice1: 'Makes your page interactive',
    choice2:
      'Gives you the option to work as a back end developer (e.g Node.js)',
    choice3:
      'The syntax can be used to create a non-relationship database (MongoDB)',
    choice4: 'All of the above',
    answer: 4, //choice4
  },
  {
    question:
      'Why is Python considered as the first programming language to learn?',
    choice1: 'Easy to read',
    choice2: 'There is no syntax to create variables',
    choice3: 'More human language',
    choice4: 'All of the above',
    answer: 4, //choice4
  },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions] //spread operator
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('./end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach((choice) => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)
  acceptAnswers = true
}
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptAnswers) return
    acceptAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = (num) => {
  score += num
  scoreText.innerText = score
}
startGame()
