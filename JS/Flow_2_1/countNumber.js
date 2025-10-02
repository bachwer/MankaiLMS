let pageHira = document.getElementById("page-hira")
let pageKata = document.getElementById("page-kata")
let pageCnt = document.getElementById("page-cnt")
let pageTest = document.getElementById("page-test")


pageHira.addEventListener('click', () => {
    window.location.href = "hiragana.html"
})
pageKata.addEventListener('click', () => {
    window.location.href = "katakana.html"
})
pageCnt.addEventListener('click', () => {
    window.location.href = "countNumber.html"
})
pageTest.addEventListener('click', () => {
    window.location.href = "finalTest.html"
})
const buttons = document.querySelectorAll('.btn-item')
const sectionMain = document.querySelector('.sectionMain')
const containerText = document.querySelector('.container-text')
const boxes = document.querySelectorAll('.boxDetail')
const overlay = document.getElementById('overlay')
const popUp = document.getElementById('popUp')
const popUpChar = popUp.querySelector('.text-japan')
const popUpRomanji = popUp.querySelector('.romanji')
const popUpMeaning = popUp.querySelector('.meaning')
overlay.addEventListener('click', function (e) {
if (e.target === overlay) {
    overlay.style.display = 'none'
    popUp.style.display = 'none'
}
});
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        if (button.id==='btn-shock' || button.id==='btn-sound') {
            sectionMain.style.display = 'none'
            containerText.style.display = 'flex'
        } else {
            sectionMain.style.display = 'grid'
            containerText.style.display = 'none'
        }
    })
})
boxes.forEach(box => {
    box.addEventListener('click', () => {
        boxes.forEach(b => b.classList.remove('active'));
        box.classList.add('active')
        overlay.style.display = 'block'
        popUp.style.display = 'block'
    })
})

const pageMap = {
    "hiragana.html": "page-hira",
    "katakana.html": "page-kata",
    "countNumber.html": "page-cnt",
    "finalTest.html": "page-test"
};
const path = window.location.pathname;
const file = path.substring(path.lastIndexOf('/') + 1);
const activeId = pageMap[file];
if (activeId) {
    document.getElementById(activeId)?.classList.add('active');
}

           