let video = document.getElementById('video');
let flashCard = document.getElementById('flashCard');
let test = document.getElementById('test');
let Sile = document.getElementById('Sile');
let book = document.getElementById('book');
let audio = document.getElementById('audio');


video.addEventListener('click', () => {
    window.location.href = "video.html"
})
flashCard.addEventListener('click', () => {
    window.location.href = "flashCard.html"
})
test.addEventListener('click', () => {
    window.location.href = "Test1.html"
})
Sile.addEventListener('click', () => {
    window.location.href = "Slide_PDF.html"
})
book.addEventListener('click', () => {
    window.location.href = "IT_Document.html"
})
audio.addEventListener('click', () => {
    window.location.href = "Audio.html"

})

let boxHeader = document.querySelector('.boxHeader');
boxHeader.addEventListener('click', () => {
    window.location.href = "../detailPage.html"
})

