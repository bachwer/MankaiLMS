let cardSubject = document.querySelector(".card-subject");
const popUp = document.getElementById("popUp");
const overlay = document.getElementById("overlay");
let cardsData = []



let firstCard = null;
let secondCard = null;
let mathCnt = 0;


function renderCards() {
    cardSubject.innerHTML = "";
    mathCnt = 0;
    firstCard = null;
    secondCard = null;

    cardsData.sort(() => 0.5 - Math.random());

    cardsData.forEach((card) => {
        const cardEle = document.createElement("div");
        cardEle.classList.add("cardElement");
        cardEle.dataset.id = card.id;
        cardEle.dataset.flipped = "false";
        cardEle.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${card.text}</div>
            </div>`;
        cardSubject.appendChild(cardEle);
    });
}

function resetSelected() {
    firstCard = null;
    secondCard = null;
}

cardSubject.addEventListener("click", function (e) {
    const clicked = e.target.closest(".cardElement");
    if (!clicked || clicked.dataset.flipped === "true" || secondCard) return;

    clicked.dataset.flipped = "true";
    clicked.classList.add("flipped", "blue");

    if (!firstCard) {
        firstCard = clicked;
    } else {
        secondCard = clicked;

        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        if (isMatch) {
            setTimeout(() => {
                firstCard.classList.remove("blue");
                secondCard.classList.remove("blue");

                firstCard.classList.add("green");
                secondCard.classList.add("green");

                setTimeout(async () => {
                    firstCard.remove();
                    secondCard.remove();
                    mathCnt += 2;
                    resetSelected();

                    if (mathCnt === cardsData.length) {
                        overlay.style.display = "block";
                        popUp.style.display = "block";
                        flashCard1(1)
                        await SavePoint(10)

                    }
                }, 400);
            }, 300);
        } else {
            setTimeout(() => {
                firstCard.classList.remove("blue");
                secondCard.classList.remove("blue");

                firstCard.classList.add("red");
                secondCard.classList.add("red");
            }, 300);

            setTimeout(() => {
                firstCard.classList.remove("red", "flipped");
                secondCard.classList.remove("red", "flipped");

                firstCard.dataset.flipped = "false";
                secondCard.dataset.flipped = "false";
                resetSelected();
            }, 1200);
        }
    }
});

// Đếm ngược
function countdown(des) {
    const timeBtn = document.getElementById("time");

    if (des < 0) {
        overlay.style.display = "block";
        popUp.style.display = "block";
        document.getElementById("point").innerText = `0`;
        return;
    }

    const minutes = Math.floor(des / 60).toString().padStart(2, "0");
    const seconds = (des % 60).toString().padStart(2, "0");
    timeBtn.textContent = `${minutes}:${seconds} giây`;

    setTimeout(() => countdown(des - 1), 1000);
}

document.querySelector(".redo").addEventListener("click", () => {
    overlay.style.display = "none";
    popUp.style.display = "none";
    renderCards();
});

document.getElementById("study").addEventListener("click", () => {
    overlay.style.display = "none";
    popUp.style.display = "none";
    window.location.href = "../../HTML/Flow_1.4/checkVocaNew.html";
});

document.getElementById("power").addEventListener("click", () => {
    window.location.href = "../../HTML/Flow_1.4/flashCard.html";
});

overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
        overlay.style.display = "none";
        popUp.style.display = "none";
    }
});



loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        cardsData = cardsData1;
        renderCards();
        countdown(45);
        spinner.style.display = "none";
    }, 2000);
}