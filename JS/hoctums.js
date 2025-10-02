let cards = [];


let currIdx = 0;

async function renderNextCard() {
    if (cards.length === 0) {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("popUp").style.display = "block";

        //code
        flashCard1(0)

        await SavePoint(5)

        return;
    }

    if (currIdx >= cards.length) {
        currIdx = 0;
    }

    const card = cards[currIdx];
    const japanText = document.querySelector(".japan-text");
    japanText.textContent = card.japanese;
    japanText.dataset.meaning = card.meaning;
    document.querySelector(".card-number").textContent = `${currIdx + 1}/${cards.length}`;
}
let study =   document.getElementById("study")
study.addEventListener('click', (e) => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popUp").style.display = "none";
    window.location.href = "../Flow_1.4/flashCard.html";
})
let redo =   document.getElementById("redo")
redo.addEventListener('click', (e) => {
    window.location.reload();
})

document.querySelector(".japan-text").addEventListener("click", function () {
    const meaning = this.dataset.meaning;
    if (this.textContent === meaning) {
        this.textContent = cards[currIdx].japanese;
    } else {
        this.textContent = meaning;
    }
});

function wrongAns() {
    if (cards.length === 0) return;
    const currCard = cards[currIdx];    cards.splice(currIdx, 1);
    cards.push(currCard);
    
    if (currIdx >= cards.length) {
        currIdx = 0;
    }
    renderNextCard();
}

function correctAns() {
    cards.splice(currIdx, 1);
    if (currIdx >= cards.length && cards.length > 0) {
        currIdx = cards.length - 1;
    }
    renderNextCard();
}

document.querySelector(".prev-button").addEventListener("click", wrongAns);
document.querySelector(".next-button").addEventListener("click", correctAns);






loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        cards = flashcards;
        renderNextCard();

    }, 2000);
}