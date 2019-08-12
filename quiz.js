'use strict';

const questions = [
    {
        number:1,
        text:`I provided more assists than any other player in Europe's top 5 leagues last season`,
        ans1:`Messi`,
        ans2:`Mbappe`,
        ans3:`De Bruyne`
    },
    {
        number:2,
        text:`No player in Europe's top 5 leagues has completed more take-ons than I have this season`,
        ans1:`Mbappe`,
        ans2:`Messi`,
        ans3:`Ronaldo`
    },
    {
        number:3,
        text:`I created the most chances from open play at the 2018 World Cup`,
        ans1:`Mbappe`,
        ans2:`De Bruyne`,
        ans3:`Modric`
    },
    {
        number:4,
        text:`I scored exactly 34 goals for club and country in 2018`,
        ans1:`Ronaldo`,
        ans2:`Messi`,
        ans3:`Mbappe`
    },
    {
        number:5,
        text:`I am averaging the best pass completion rate among the other players in the XI so far this domestic season (92.2%)`,
        ans1:`Sergio Ramos`,
        ans2:`Modric`,
        ans3:`Van Dijk`
    },
    {
        number:6,
        text:`I clocked the fastest speed at the 2018 World Cup (37 km/h)`,
        ans1:`Mbappe`,
        ans2:`Ronaldo`,
        ans3:`Kante`
    },
    {
        number:7,
        text:`I won the Golden Ball at the 2018 World Cup`,
        ans1:`Mbappe`,
        ans2:`Modric`,
        ans3:`Varane`
    },
    {
        number:8,
        text:`I have made the most tackles this season among the other players in the XI`,
        ans1:`Kante`,
        ans2:`Sergio Ramos`,
        ans3:`Van Dijk`
    }
];
const answers = [
    `De Bruyne`,
    `Messi`,
    `De Bruyne`,
    `Mbappe`,
    `Sergio Ramos`,
    `Mbappe`,
    `Modric`,
    `Kante`
];

let questionNum=1;
let correctAnswers=0;

function questionPage (correctAnswers, question, questionsAnswered) {
    return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>

    <form>
        <fieldset>
            <label>
                <input class="answer" type="radio" name="option" checked></input>
                <span>${question.ans1}</span>
            </label>
            <label>
                <input class="answer" type="radio" name="option" checked></input>
                <span>${question.ans2}</span>
            </label>
            <label>
                <input class="answer" type="radio" name="option" checked></input>
                <span>${question.ans3}</span>
            </label>
        </fieldset>
        <button id="js-submit-button">Submit</button>
    </form>
    <div id="status-bar">
        <span id="question-count">Question: ${question.number}/8</span>
        <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
    </section>
    `;
}

function handleStartButton() {
    $('#js-start-button').click(function(event) {
        nextQuestion();
    });
}
function nextQuestion() {
    const question= questions[questionNum-1];
    const questionsAnswered= questionNum-1;

    $('#container').html(questionPage(correctAnswers, question, questionsAnswered));
}

function handleSubmitButton() {
    $('#container').on('click', '#js-submit-button', function(event) {
        event.preventDefault();
        const answer=$('input:checked').siblings('span');

    const userIsCorrect=checkUserAnswer(answer);
    if (userIsCorrect) {
        generateCorrectFeedback();
    }
    else {
        generateIncorrectFeedback();
    }
    });
}
function checkUserAnswer(answer) {
    if (answer.text()==answers[questionNum-1]) {
        return true;
    }
    else {
        return false;
    }
}
function generateCorrectFeedback() {
    $('#container').html(correctFeedback);
    iterateCorrectAnswers();
}
const correctFeedback= `
    <section class="feedback-page" role="main">
        <h2>Correct!</h2>
        <img src="https://media.giphy.com/media/T2AmoAqrjAluU/giphy.gif" alt="Celebration">
        <button id="js-next-button">Next</button>
    </section>
`;
function generateIncorrectFeedback() {
    $('#container').html(incorrectFeedbackPage(questionNum));
}
function incorrectFeedbackPage() {
    return `
    <section class="feedback-page" role="main">
        <h2>Nope! It was ${answers[questionNum-1]}!</h2>
        <img src="https://media.giphy.com/media/PHru8mVQPh9a8/giphy.gif" alt="Red card reaction">
        <button id="js-next-button">Next</button>
    </section>
    `;
}
function iterateCorrectAnswers() {
    correctAnswers++;
}

function handleNextButton() {
    $('#container').on('click', '#js-next-button', function(event) {
        if (questionNum==8) {
            resultsPage(correctAnswers);
        }
        else {
            iterateQuestion();
            nextQuestion();
        }
    });
}
function resultsPage(correctAnswers) {
    $('#container').html(`
    <section id="final-page">
        <h2>Final Score: ${correctAnswers} out of 8</h2>
        <button id="js-restart-button">Play Again?</button>
    </section>
    `);
}

function iterateQuestion() {
    questionNum++;
}

function handleRestartButton() {
    $('#container').on('click', '#js-restart-button', function(event) {
        questionNum=1;
        correctAnswers=0;
        nextQuestion();
    });
}

function handleButtons() {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
}
handleButtons();