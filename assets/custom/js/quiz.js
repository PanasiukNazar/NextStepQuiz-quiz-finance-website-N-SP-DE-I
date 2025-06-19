const QUESTIONS = [
    {
        label: 'Was versteht man unter dem Begriff „Nettovermögen“?',
        answers: [
            '📊 Der Gesamtwert aller Vermögenswerte abzüglich Schulden',
            '💳 Der monatliche Kreditrahmen',
            '🧾 Die Summe aller Ausgaben pro Jahr',
            '🏠 Der aktuelle Marktwert der Immobilie',
        ],
    },
    {
        label: 'Welche dieser Angaben ist wichtig bei der Erstellung eines Haushaltsplans?',
        answers: [
            '📉 Monatliche Einnahmen und Ausgaben',
            '📅 Geburtstage der Nachbarn',
            '🎯 Freizeitaktivitäten',
            '🖼️ Wandfarbe im Wohnzimmer',
        ],
    },
    {
        label: 'Was bezeichnet man als „Inflation“?',
        answers: [
            '📈 Anstieg des allgemeinen Preisniveaus',
            '🏦 Zunahme der Sparzinsen',
            '📉 Rückgang der Aktienkurse',
            '🪙 Abnahme der Steuerbelastung',
        ],
    },
    {
        label: 'Welche der folgenden Anlageformen gilt als besonders risikoarm?',
        answers: [
            '🏦 Tagesgeldkonto',
            '📉 Kryptowährungen',
            '🏠 Ferienimmobilien',
            '📈 Start-up-Investitionen',
        ],
    },
    {
        label: 'Was ist der Zweck einer privaten Rentenversicherung?',
        answers: [
            '👴 Finanzielle Absicherung im Alter',
            '🏖️ Sparen für den nächsten Urlaub',
            '🎁 Geschenke für die Familie',
            '🚗 Finanzierung eines Neuwagens',
        ],
    },
];




const $container = document.getElementById('container');

const startStep = {
    render: () => {
        $container.innerHTML = `
<div class="container quiz-wrapper">
    <div class="quiz-content">
        <div class="content">
            <h2 class="title">Finanzwissen-Quiz für Einsteiger</h2>
            <h5>Teste dein Wissen rund um Geld, Budgetplanung und wirtschaftliche Zusammenhänge in diesem spannenden Finanzquiz.</h5>
            <div style="display: flex;justify-content: center;">
                <button class="btn btn-primary w-100 py-3 first-button" data-action="startQuiz">Quiz starten</button>
            </div>
            <div class="my-3 icons-wrapper">
                <span
                    class="fables-iconphone fables-second-text-color pr-2 font-20 mt-1 d-inline-block"
                ></span>
                <p
                    class="font-14 fables-fifth-text-color mt-2 ml-4"
                    style="color: #fff"
                >
                    +49896495630
                </p>
            </div>
            <div class="my-3 icons-wrapper">
                <span
                    class="fables-iconemail fables-second-text-color pr-2 font-20 mt-1 d-inline-block"
                ></span>
                <p
                    class="font-14 fables-fifth-text-color mt-2 ml-4"
                    style="color: #fff"
                >
                    next_step_quiz@gmail.com
                </p>
            </div>
        </div>
    </div>
</div>

      `;
    },
    onClick: (el) => {
        if (el.getAttribute('data-action') === 'startQuiz') {
            quiz.nextStep(questionsStep);
        }
    },
};

const questionsStep = {
    questionIndex: 0,
    answers: {},
    render: () => {
        const question = QUESTIONS[questionsStep.questionIndex];

        $container.innerHTML = `
          <div class="container quiz-wrapper">
            <div class="quiz-content text-center quiz-start">
                <div class="question-wrapper">
                    <h3 class="question mt-4">${question.label}</h3>
                </div>

                <div class="row answers">
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `
                                <button class="answer border rounded" data-action="selectAnswer" data-answer-index="${index}">
                                    ${answer}
                                </button>
                            `,
                        )
                        .join('')}
                </div>

               
            </div>
        </div>
      `;
    },
    getProgress: () =>
        Math.floor((questionsStep.questionIndex / QUESTIONS.length) * 100),
    onClick: (el) => {
        switch (el.getAttribute('data-action')) {
            case 'goToNextQuestion':
                return questionsStep.goToNextQuestion();
            case 'goToPreviousQuestion':
                return questionsStep.goToPreviousQuestion();
            case 'selectAnswer':
                return questionsStep.selectAnswer(
                    parseInt(el.getAttribute('data-answer-index'), 10),
                );
        }
    },
    goToPreviousQuestion: () => {
        questionsStep.questionIndex -= 1;
        questionsStep.render();
    },
    selectAnswer: (answerIndex) => {
        const question = QUESTIONS[questionsStep.questionIndex];
        const selectedAnswer = question.answers[answerIndex];

        questionsStep.answers = {
            ...questionsStep.answers,
            [question.label]: selectedAnswer,
        };

        if (questionsStep.isFinalQuestion()) {
            questionsStep.completeStep();
        } else {
            questionsStep.goToNextQuestion();
        }
    },
    isFinalQuestion: () => questionsStep.questionIndex === QUESTIONS.length - 1,
    goToNextQuestion: () => {
        questionsStep.questionIndex += 1;
        questionsStep.render();
    },
    completeStep: () => {
        quiz.setAnswers(questionsStep.answers);
        quiz.nextStep(finalStep);
    },
};

//   <h2 class="title">Formulario de contacto financiero</h2>
//   <h3 class="mb-4">Por favor, completa el formulario para recibir tus resultados financieros</h3>

const finalStep = {
    render: () => {
        $container.innerHTML = `
<div class="container quiz-wrapper">
    <div class="row quiz-content form-content">
        <div class="col-lg-12 col-md-12 col-sm-12 form-block">
            <form id="quiz-form">
                <h2 class="title" style="color: #fff;">Fast fertig! Hol dir deine Analyse 📊</h2>
                <div style="background-color: #212529; color: #fff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p>
                        Danke für deine Teilnahme am Finanzquiz! Gib deine Kontaktdaten ein, um dein Ergebnis und passende Tipps zu erhalten.
                    </p>
                </div>

                <input class="form-control" name="name" type="text" placeholder="Vor- und Nachname" required>
                <input class="form-control" name="email" type="email" placeholder="E-Mail-Adresse" required>
                <input class="form-control" name="phone" type="tel" placeholder="Telefonnummer" required>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" required id="privacyPolicy">
                    <label for="privacyPolicy">
                        Ich akzeptiere die
                        <a class="form-link" href="cookie-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">Cookie-Richtlinie</a>,
                        die
                        <a class="form-link" href="privacy-policy.html" target="_blank" style="color: #fff; text-decoration: underline;">Datenschutzrichtlinie</a> und die
                        <a class="form-link" href="terms-of-use.html" target="_blank" style="color: #fff; text-decoration: underline;">Nutzungsbedingungen</a>.
                    </label>
                </div>

                <div class="checkbox" style="color: #fff;">
                    <input type="checkbox" id="newsletter" checked>
                    <label for="newsletter">Ich möchte Finanzinfos per E-Mail erhalten.</label>
                </div>

                ${Object.keys(quiz.answers)
                    .map(
                        question =>
                            `<input name="${question}" value="${quiz.answers[question]}" hidden>`
                    )
                    .join('')}

                <button type="submit" class="btn btn-primary w-100 py-3 first-button">Senden</button>
            </form>
        </div>
    </div>
</div>



      `;

        // Agrega aquí el manejador de envío del formulario
        document.getElementById('quiz-form').addEventListener('submit', function (e) {
            e.preventDefault(); // evita el envío tradicional del formulario
            localStorage.setItem('quizDone', true);
            window.location.href = 'thanks.html';
        });
    },

    // Ya no necesitas esto si no se usa en ningún sitio:
    onClick: (el) => {
        const newPath = 'thanks.html';
        if (el.getAttribute('data-action') === 'submitAnswers') {
            localStorage.setItem('quizDone', true);
            document.getElementById('main-page').classList.remove('hide');
            document.getElementById('quiz-page').classList.add('hide');
            document.getElementById('footer').classList.add('hide');
            window.location.href = newPath;
        }
    },
};

const quiz = {
    activeStep: startStep,
    answers: {},
    clear: () => ($container.innerHTML = ''),
    init: () => {
        $container.addEventListener('click', (event) =>
            quiz.activeStep.onClick(event.target),
        );
        $container.addEventListener('submit', (event) =>
            event.preventDefault(),
        );
    },
    render: () => {
        quiz.clear();
        quiz.activeStep.render();
    },
    nextStep: (step) => {
        quiz.activeStep = step;
        quiz.render();
    },
    setAnswers: (answers) => (quiz.answers = answers),
};

if (!localStorage.getItem('quizDone')) {
    document.getElementById('main-page').classList.add('hide');
    quiz.init();
    quiz.render();
}
