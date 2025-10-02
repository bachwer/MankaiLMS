const data = [
    { answer: "私は タイ・デ", btn1: "私は", btn2: "タイ・デ" },
    { answer: "郵政通 私は", btn1: "郵政通", btn2: "私は" },
    { answer: "私は タイ・デ", btn1: "私は", btn2: "タイ・デ" },
    { answer: "郵政通 私は", btn1: "郵政通", btn2: "私は" },
    { answer: "私は タイ・デ", btn1: "私は", btn2: "タイ・デ" },
    { answer: "郵政通 私は", btn1: "郵政通", btn2: "私は" }
];

let currentQues = 0;
let selectedBtns = [];
let userSelected = Array(data.length).fill(null);

const correctAnsDiv = document.querySelector(".correct-ans");
const checkBtn = document.querySelector(".check");
const quesText = document.querySelector(".ques");

const allButtons = document.querySelectorAll(".btn-ans button");

allButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (selectedBtns.length >= 2 || btn.disabled) return;

        selectedBtns.push(btn);
        btn.classList.add("selected");
        updateCorrectAnsDiv();
    });
});

checkBtn.addEventListener("click", () => {
    if (selectedBtns.length !== 2) return;

    const userAns = selectedBtns.map(b => b.innerText).join(" ");
    const correctAns = data[currentQues].answer;

    correctAnsDiv.innerHTML = "";

    selectedBtns.forEach(btn => {
        const resultBtn = document.createElement("button");
        resultBtn.innerText = btn.innerText;

        if (userAns === correctAns) {
            resultBtn.classList.add("selected1");
            btn.style.display = "none";
        } else {
            resultBtn.classList.add("wrong1");
        }

        correctAnsDiv.appendChild(resultBtn);
    });

    if (userAns === correctAns) {
        userSelected[currentQues] = selectedBtns.map(b => b.innerText);

        setTimeout(() => {
            currentQues++;
            if (currentQues >= data.length) {
                quesText.innerText = `Hoàn thành`;
                checkBtn.disabled = true;
                resetSelection();
                return;
            }
            resetSelection();
            updateUI();
        }, 1000);
    } else {
        setTimeout(() => {
            selectedBtns.forEach(btn => btn.classList.remove("selected"));
            resetSelection();
        }, 2500);
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

    quesText.innerText = `Câu ${currentQues + 1}/${data.length}`;

    // allButtons.forEach(btn => {
    //     btn.classList.remove("selected", "wrong1");
    //     btn.style.display = "inline-block";
    // });
    allButtons.forEach(btn => {
        btn.classList.remove("selected", "wrong1");

        if (
            // userSelected[currentQues] &&
            userSelected[currentQues].includes(btn.innerText)
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
    if (currentQues < data.length - 1) {
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