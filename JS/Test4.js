let currentQues = 0;
let selectedBtns = [];
let userSelected = Array(questions_Test4.length).fill(null);
let randomNumCheck = [];

const correctAnsDiv = document.querySelector(".correct-ans");
const checkBtn = document.querySelector(".check");
const allButtons = document.querySelectorAll(".btn-ans button");


function getRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

function randomQuestion() {
    randomNumCheck = [];
    for (let i = 0; i < 10; i++) {
        let randomNum;
        do {
            randomNum = getRandomNumber();
        } while (randomNumCheck.includes(randomNum));
        randomNumCheck.push(randomNum);
        document.getElementById(randomNum).innerText = questions_Test4[i].btn1;
    }

    for (let i = 0; i < 10; i++) {
        let randomNum;
        do {
            randomNum = getRandomNumber();
        } while (randomNumCheck.includes(randomNum));
        randomNumCheck.push(randomNum);
        document.getElementById(randomNum).innerText = questions_Test4[i].btn2;
    }
}

allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (selectedBtns.length >= 2 || btn.disabled) return;
        selectedBtns.push(btn);
        btn.classList.add("selected");
        updateCorrectAnsDiv();
    });
});

let attempts = 0;
const maxAttempts = 3;

checkBtn.addEventListener("click", async () => {
    if (selectedBtns.length !== 2) return;

    const word1 = selectedBtns[0].innerText.trim();
    const word2 = selectedBtns[1].innerText.trim();

    let isCorrect = false;
    let indexCorrect = -1;

    for (let i = 0; i < questions_Test4.length; i++) {
        const q = questions_Test4[i];
        const correct1 = q.btn1.trim();
        const correct2 = q.btn2.trim();

        if (word1 === correct1 && word2 === correct2) {
            isCorrect = true;
            indexCorrect = i;
            break;
        }
    }

    correctAnsDiv.innerHTML = "";

    selectedBtns.forEach(btn => {
        const resultBtn = document.createElement("button");
        resultBtn.innerText = btn.innerText;

        if (isCorrect) {
            resultBtn.classList.add("selected1");
            btn.style.display = "none";
        } else {
            resultBtn.classList.add("wrong1");
        }

        correctAnsDiv.appendChild(resultBtn);
    });

    if (isCorrect && indexCorrect !== -1) {
        userSelected[indexCorrect] = [word1, word2];

        // Check hoàn thành
        if (userSelected.filter(x => x !== null).length === questions_Test4.length) {
            checkBtn.disabled = true;
            document.querySelector('.popUpContainer').style.display = "block";
            overlay.style.display = "block";
            popUp.style.display = "flex";
            document.querySelector('.point-number-me').textContent = `${questions_Test4.length}/${questions_Test4.length}`;
            document.getElementById('score-point').textContent = `${questions_Test4.length}`;
            await SavePoint(questions_Test4.length)
            testLesson(3)

        }

        setTimeout(() => {
            resetSelection();
        }, 1000);
    } else {
        setTimeout(() => {
            selectedBtns.forEach(btn => btn.classList.remove("selected"));
            resetSelection();
        }, 1000);
    }

});




function resetSelection() {
    selectedBtns = [];
    correctAnsDiv.innerHTML = "";
}

function updateCorrectAnsDiv() {
    correctAnsDiv.innerHTML = "";
    selectedBtns.forEach(btn => {
        const cloneBtn = document.createElement("button");
        cloneBtn.innerText = btn.innerText;
        cloneBtn.classList.add("selected2");
        correctAnsDiv.appendChild(cloneBtn);
    });
}

function updateUI() {
    resetSelection();
    allButtons.forEach(btn => {
        btn.classList.remove("selected", "wrong1");
        if (
            userSelected[currentQues] && userSelected[currentQues].includes(btn.innerText)
        ) {
            btn.style.display = "none";
        } else {
            btn.style.display = "inline-block";
        }
    });

    if (userSelected[currentQues]) {
        const [t1, t2] = userSelected[currentQues];
        correctAnsDiv.innerHTML = "";
        [t1, t2].forEach(text => {
            const btn = document.createElement("button");
            btn.innerText = text;
            btn.classList.add("selected1");
            correctAnsDiv.appendChild(btn);
        });
    }
}

function nextQuestion() {
    if (currentQues < questions_Test4.length - 1) {
        currentQues++;
        updateUI();
    }
}

function prevQuestion() {
    if (currentQues > 0) {
        currentQues--;
        updateUI();
    }
}

document.querySelector('.redo').addEventListener('click', function () {
    currentQues = 0;
    userSelected = Array(questions_Test4.length).fill(null);
    document.querySelector('.popUpContainer').style.display = "none";
    overlay.style.display = "none";
    popUp.style.display = "none";
    updateUI();
});

document.querySelector('.study').addEventListener('click', function () {
    document.querySelector('.popUpContainer').style.display = "none";
    overlay.style.display = "none";
    popUp.style.display = "none";
    window.location.href = "Test5.html";
});





//load - BQ
loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        console.log(questions_Test4)
        randomQuestion();
    }, 2000);
}