const quizzData = [
    {
        id: 0,
        name: "Kui suur on öökulli keskmine eluiga looduses?",
        answers: [
            {id: 1, name: "2-3 aastat", answer: false},
            {id: 2, name: "5–12 aastat", answer: true},
            {id: 3, name: "15–20 aastat", answer: false},
            {id: 4, name: "Üle 30 aasta", answer: false},
        ],
    },
    {
        id: 1,
        name: "Mis on öökullide lemmiktoit?",
        answers: [
            {id: 1, name: "Marjad ja puuviljad", answer: false},
            {id: 2, name: "Seemned", answer: false},
            {id: 3, name: "Maod", answer: false},
            {id: 4, name: "Väikesed imetajad (hiired, rotid)", answer: true},
        ],
    },
    {
        id: 2,
        name: "Kus öökullid peamiselt pesitsevad?",
        answers: [
            {id: 1, name: "Igalpool maailmas, peale Antartika", answer: true},
            {id: 2, name: "Antartika", answer: false},
            {id: 3, name: "Ookeanide rannikul", answer: false},
            {id: 4, name: "Mägede kaljulõhedes", answer: false},
        ],
    },
    {
        id: 3,
        name: "Kuidas öökullid suhtlevad omavahel?",
        answers: [
            {id: 1, name: "Tantsides keerulisi liigutusi", answer: false},
            {id: 2, name: "Häälitsuste ja hüüdega", answer: true},
            {id: 3, name: "Värvides sulgi erinevatelt toonidelt", answer: false},
            {id: 4, name: "Käpikute abil puudel", answer: false},
        ],
    },
    {
        id: 4,
        name: "Kui kaugelt kuuleb öökull oma saaki?",
        answers: [
            {id: 1, name: "1–2 meetrit", answer: false},
            {id: 2, name: "Kuni 50 meetrit", answer: false},
            {id: 3, name: "Kuni 300 meetri", answer: true},
            {id: 4, name: "Ainult otse läheduses", answer: false},
        ],
    },
    {
        id: 5,
        name: "Milline on öökulli suurim vaenlane looduses?",
        answers: [
            {id: 1, name: "Krokodillid", answer: false},
            {id: 2, name: "Suured kotkad", answer: false},
            {id: 3, name: "Inimesed (habitatide hävimine)", answer: false},
            {id: 4, name: "Rebased ja kullid", answer: true},
        ],
    },
    {
        id: 6,
        name: "Mis värv on Soorätsi silmad?",
        answers: [
            {id: 1, name: "Punased", answer: false},
            {id: 2, name: "Rohelised", answer: false},
            {id: 3, name: "Sinised", answer: false},
            {id: 4, name: "Kollased", answer: true},
        ],
    },
    {
        id: 7,
        name: "Kui palju öökulli liike on maailmas?",
        answers: [
            {id: 1, name: "2–3 liiki", answer: false},
            {id: 2, name: "Umbes 20 liiki", answer: false},
            {id: 3, name: "Üle 100 liigi", answer: true},
            {id: 4, name: "Üle 500 liigi", answer: false},
        ],
    },
    {
        id: 8,
        name: "Kui kiiresti võib öökull lennata?",
        answers: [
            {id: 1, name: "5–10 km/h", answer: false},
            {id: 2, name: "30–60 km/h", answer: true},
            {id: 3, name: "80–100 km/h", answer: false},
            {id: 4, name: "Üle 150 km/h", answer: false},
        ],
    },
    {
        id: 9,
        name: "Mida öökullid teevad talveks?",
        answers: [
            {id: 1, name: "Sigivad", answer: true},
            {id: 2, name: "Lendavad soojematele aladele", answer: false},
            {id: 3, name: "Muutuvad valgeks (nagu jänesed)", answer: false},
            {id: 4, name: "Kogunevad suurtesse parvesse", answer: false},
        ],
    },
];

let currentQuizId = 0;
let correct = false;

localStorage.setItem("day", new Date().getDate().toString() + "." + new Date().getMonth().toString());
localStorage.setItem("time", new Date().getHours().toString() + ":" + new Date().getMinutes().toString())


function renderQuiz() {
    const question = quizzData[currentQuizId];
    document.getElementById("quiz-title").textContent = question.name;
    if (currentQuizId === quizzData.length - 1) {
        saveAnswerData().then(() => {
            window.location = "../quiz/quiz-result.html"
        })
    }
    const answersContainer = document.getElementById("quiz-answers");
    answersContainer.innerHTML = "";

    question.answers.forEach(answerObject => {
        const button = document.createElement("button");
        button.textContent = answerObject.name;
        button.addEventListener("click", function() {
            if (answerObject.answer) {
                correct = true;
                document.getElementById("navigation").style.display = "block";
            }
        });
        answersContainer.appendChild(button);
    });

    document.getElementById("quiz-image").src = `../owl/owl${currentQuizId + 1}.png`;
}

document.getElementById("prev-btn").addEventListener("click", function(e) {
    e.preventDefault();
    if (currentQuizId > 0) {
        currentQuizId--;
        correct = false;
        document.getElementById("navigation").style.display = "none";
        renderQuiz();
    }
});

document.getElementById("next-btn").addEventListener("click", function(e) {
    e.preventDefault();
    if (currentQuizId < quizzData.length - 1) {
        currentQuizId++;
        correct = false;
        document.getElementById("navigation").style.display = "none";
        renderQuiz();
    }
});

async function saveAnswerData() {
    await fetch("https://kool.krister.ee/chat/owlquiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: localStorage.getItem("person"),
            start: `day: ${localStorage.getItem("day")} time: ${localStorage.getItem("time")}`,
            end: `day: ${new Date().getDate().toString() + "." + new Date().getMonth().toString()} time: ${new Date().getHours().toString() + ":" + new Date().getMinutes().toString()}`
        })
    })
}

renderQuiz();