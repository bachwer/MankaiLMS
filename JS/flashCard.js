
const studyVocaNew = document.getElementById("study-voca-new")
studyVocaNew.addEventListener("click", () => {
    window.location = ("../../HTML/Flow_1.4/hoctums.html")
})
const cardMatch=document.getElementById("cardMatch")
cardMatch.addEventListener("click", () => {
    window.location = ("../../HTML/Flow_1.4/hoctumsSubject.html")
})

const checkNewWord=document.getElementById("checkNewWord")
checkNewWord.addEventListener("click", () => {
    window.location = ("../../HTML/Flow_1.4/checkVocaNew.html")
})

let currCardIdx = 1
let textToSpeak = ""

const volume = document.getElementById("volume")
const japanText = document.getElementById("japanText")
const cardNumber = document.querySelector(".card-number")
const progress = document.querySelector(".progress")
const prevBtn = document.querySelector(".next")
const nextBtn = document.querySelector(".prev-button")

function renderCard() {
    const card = flashcards[currCardIdx]
    japanText.innerText = card.japanese
    textToSpeak = card.japanese
    cardNumber.textContent = `${currCardIdx + 1}/${flashcards.length}`
    const percent = ((currCardIdx + 1) / flashcards.length) * 100
    progress.style.width = percent + "%"
}

prevBtn.addEventListener("click", () => {
    if (currCardIdx > 0) {
        currCardIdx--

        renderCard()
    }
});

nextBtn.addEventListener("click", () => {
    if (currCardIdx < flashcards.length - 1) {
        currCardIdx++
        renderCard()
    }
})

volume.addEventListener("click", () => {
    speakJapanese(textToSpeak)
})

function speakJapanese(text) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ja-JP'
    window.speechSynthesis.speak(utterance)
}

loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer")
    spinner.style.display = "flex"

    setTimeout(() => {
        spinner.style.display = "none"
        renderCard()
    }, 2000)
}

