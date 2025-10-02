// Chuyển trang cho menu bên trái (giữ nguyên)
let pageHira = document.getElementById("page-hira");
let pageKata = document.getElementById("page-kata");
let pageCnt = document.getElementById("page-cnt");
let pageTest = document.getElementById("page-test");

if (pageHira) {
    pageHira.addEventListener('click', () => {
        window.location.href = "hiragana.html";
    });
}
if (pageKata) {
    pageKata.addEventListener('click', () => {
        window.location.href = "katakana.html";
    });
}
if (pageCnt) {
    pageCnt.addEventListener('click', () => {
        window.location.href = "countNumber.html";
    });
}
if (pageTest) {
    pageTest.addEventListener('click', () => {
        window.location.href = "finalTest.html";
    });
}

// Object lưu trữ 10 câu hỏi: 5 câu chữ, 5 câu nghe (chỉ tiếng Nhật)
const questions = [
    {
        type: "text",
        question: "こん",
        answers: [
            { label: "A", text: "こんにちは", correct: true },
            { label: "B", text: "こんばんは", correct: false },
            { label: "C", text: "おはよう", correct: false }
        ]
    },
    {
        type: "text",
        question: "さよう",
        answers: [
            { label: "A", text: "ありがとう", correct: false },
            { label: "B", text: "さようなら", correct: true },
            { label: "C", text: "おやすみ", correct: false }
        ]
    },
    {
        type: "text",
        question: "ありがとう",
        answers: [
            { label: "A", text: "ありがとう", correct: true },
            { label: "B", text: "こんにちは", correct: false },
            { label: "C", text: "さようなら", correct: false }
        ]
    },
    {
        type: "text",
        question: "おはよう",
        answers: [
            { label: "A", text: "おやすみ", correct: false },
            { label: "B", text: "こんばんは", correct: false },
            { label: "C", text: "おはよう", correct: true }
        ]
    },
    {
        type: "text",
        question: "こんばんは",
        answers: [
            { label: "A", text: "こんばんは", correct: true },
            { label: "B", text: "おはよう", correct: false },
            { label: "C", text: "こんにちは", correct: false }
        ]
    },
    // 5 câu nghe (type: audio)
    {
        type: "audio",
        audio: ".../../assets/play-circle.svg",
        answers: [
            { label: "A", text: "こんにちは", correct: true },
            { label: "B", text: "こんばんは", correct: false },
            { label: "C", text: "おはよう", correct: false }
        ]
    },
    {
        type: "audio",
        audio: "../../assets/play-circle.svg",
        answers: [
            { label: "A", text: "ありがとう", correct: false },
            { label: "B", text: "さようなら", correct: true },
            { label: "C", text: "おやすみ", correct: false }
        ]
    },
    {
        type: "audio",
        audio: "../../assets/play-circle.svg",
        answers: [
            { label: "A", text: "ありがとう", correct: true },
            { label: "B", text: "こんにちは", correct: false },
            { label: "C", text: "さようなら", correct: false }
        ]
    },
    {
        type: "audio",
        audio: "../../assets/play-circle.svg",
        answers: [
            { label: "A", text: "おやすみ", correct: false },
            { label: "B", text: "おはよう", correct: true },
            { label: "C", text: "こんばんは", correct: false }
        ]
    },
    {
        type: "audio",
        audio: "../../assets/play-circle.svg",
        answers: [
            { label: "A", text: "こんばんは", correct: true },
            { label: "B", text: "おはよう", correct: false },
            { label: "C", text: "こんにちは", correct: false }
        ]
    }
];

// Biến trạng thái
let currentQ = 0;
let totalQ = questions.length;
let selectedIdx = null;
let score = 0;
let lastScore = 0;

// Lấy phần tử HTML để hiển thị câu hỏi và đáp án
const quesTest = document.querySelector('.ques-test');
const answerTest = document.querySelector('.answer-test');
const currQuesTest = document.querySelector('.curr-ques-test');

// Hàm phát âm tiếng Nhật bằng giọng máy
function speakJapanese(text) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ja-JP'; // tiếng Nhật
    window.speechSynthesis.speak(utter);
}

// Hàm hiển thị câu hỏi
function renderQuestion(index) {
    selectedIdx = null;
    const q = questions[index];

    // Xóa câu cũ
    answerTest.innerHTML = '';
    quesTest.querySelector('.card')?.remove();

    // Tạo khung câu hỏi mới
    let card = document.createElement('div');
    card.className = 'card';

    if (q.type === "text") {
        card.innerHTML = `
            <p class="select-ans">Chọn đáp án đúng</p>
            <p class="ques">${q.question}</p>
        `;
    } else {
        card.innerHTML = `
            <p class="select-ans">Nghe và trả lời câu hỏi</p>
            <button class="btn-play"><img src="${q.audio}" alt="audio"></button>
        `;
    }

    quesTest.insertBefore(card, answerTest);

    // Nếu là câu nghe thì gán sự kiện phát âm
    if (q.type === "audio") {
        let btn = card.querySelector('.btn-play');
        let correctAns = q.answers.find(ans => ans.correct);
        if (btn && correctAns) {
            btn.onclick = () => speakJapanese(correctAns.text);
        }
    }

    // Hiển thị các đáp án
     q.answers.forEach((ans, i) => {
        const ansDiv = document.createElement('div');
        ansDiv.className = `answer ans`;
        ansDiv.innerHTML = `
            <div class="c" id="c">${ans.label}</div>
            <div><p>${ans.text}</p></div>
        `;
        ansDiv.addEventListener('click', function () {
            answerTest.querySelectorAll('.ans').forEach(e => e.classList.remove('selected'));
            ansDiv.classList.add('selected');
            selectedIdx = i;
        });
        answerTest.appendChild(ansDiv);
    });

    // Cập nhật số thứ tự câu
    if (currQuesTest) {
        currQuesTest.textContent = `Câu ${index + 1}/${totalQ}`;
    }
}

// Khi nhấn nút "Kiểm tra"
document.querySelector('.check')?.addEventListener('click', () => {
    if (selectedIdx === null) return;

    let q = questions[currentQ];
    let ansEls = answerTest.querySelectorAll('.ans');

    ansEls.forEach((el, i) => {
        el.classList.remove('correct', 'wrong');
        if (q.answers[i].correct) el.classList.add('correct');
        if (i === selectedIdx && !q.answers[i].correct) el.classList.add('wrong');
    });

    if (q.answers[selectedIdx].correct) score++;

    setTimeout(() => {
        currentQ++;
        if (currentQ < totalQ) {
            renderQuestion(currentQ);
        } else {
            lastScore = score;
            showResultPopup();
        }
    }, 1000);
});

// Nút câu trước
document.querySelector('.ques-prev')?.addEventListener('click', () => {
    if (currentQ > 0) {
        currentQ--;
        renderQuestion(currentQ);
    }
});

// Hiện popup điểm
function showResultPopup() {
    const overlay = document.getElementById('overlay');
    const popUp = document.getElementById('popUp');
    const pointEl = document.querySelector('.point-number-me');
    const knEl = document.querySelector('.point-number-kn');

    if (pointEl) pointEl.textContent = `${score}/${questions.length}`;

    if (knEl) {
        let knScore = Math.round((score / questions.length) * 100);
        let icon = knEl.querySelector('img');
        knEl.innerHTML = '';
        if (icon) knEl.appendChild(icon);
        knEl.append(` ${knScore}`);
    }

    if (overlay && popUp) {
        overlay.style.display = 'block';
        popUp.style.display = 'block';
    }
}

// Nút "Làm lại"
document.querySelector('.redo')?.addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popUp').style.display = 'none';
    currentQ = 0;
    score = 0;
    renderQuestion(currentQ);
});

// Render câu đầu tiên khi mở trang
renderQuestion(currentQ);

// Đóng popup nếu bấm ra ngoài
let overlay = document.getElementById('overlay');
let popUp = document.getElementById('popUp');
if (overlay && popUp) {
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            popUp.style.display = 'none';
        }
    };
}

// Đánh dấu menu đang mở
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