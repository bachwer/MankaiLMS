// Khai báo các biến chính
const btnCheck = document.querySelector(".btn4");
const btnPrev = document.querySelector('.containerFooter .btn2');
const btnNext = document.querySelector('.btn1');
const containerFooter = document.querySelector(".containerFooter");
const successBanner = document.querySelector(".success-banner");
const failBanner = document.querySelector(".fail-banner");
const continueBtns = document.querySelectorAll(".button-banner");
const choices = document.querySelectorAll(".choice");
const textNumber = document.querySelector(".textNumber span");
const boxContent = document.querySelector(".boxContent");
const textJapanese = document.querySelector(".textJapanese");
const audioBtn = document.querySelector(".audioButton button");
const choiceContainer = document.querySelector(".choices");
const explain = document.querySelector(".explanation-container");

let selectedAnswer = null;
let currentIndex = 0;
let correctAnswers = 0;
let textToSpeak = "";

// Hàm hiển thị câu hỏi
function renderQuestion(index) {


    const q = questions_Test2[index];

    // Cập nhật số câu hỏi
    textNumber.textContent = `Câu ${index + 1}/${questions_Test2.length}`;

    // Cập nhật nội dung
    boxContent.textContent = q.content || "";


    // Cập nhật text tiếng Nhật
    textJapanese.innerHTML = `
        <p><span>${q.japanese[0]}</span> ${q.japanese[1] || ''}</p>
        <p>${q.japanese[2] || ''}</p>`;

    textToSpeak = q.japanese[0] + q.japanese[1] + q.japanese[2];
    // Tạo các nút lựa chọn
    choiceContainer.innerHTML = q.options.map((option, i) =>
        `<button class="choice">
            <span>${String.fromCharCode(65 + i)}</span> ${option}
        </button>`).join('');

    // Lấy danh sách các nút mới sau khi cập nhật innerHTML
    const currentChoices = choiceContainer.querySelectorAll('.choice');

    // Cập nhật style và thêm event listeners cho các nút
    currentChoices.forEach((button, i) => {
        // Thiết lập thuộc tính và style cho nút
        button.setAttribute('data-answer', q.options[i]);
        Object.assign(button.style, {
            backgroundColor: '#fff',
            border: '2px solid #B5B5B5',
            color: '#333',
            cursor: 'pointer'
        });

        // Thêm event listener cho nút
        button.addEventListener('click', function () {
            selectedAnswer = this.getAttribute('data-answer');
            // Xóa selected class từ tất cả các nút
            currentChoices.forEach(btn => btn.classList.remove('selected'));
            // Thêm selected class cho nút được click
            this.classList.add('selected');
        });
    });




    // Reset trạng thái
    selectedAnswer = null;

    // Cập nhật hiển thị của các phần tử UI
    containerFooter.style.display = 'flex';
    if (successBanner) successBanner.style.display = 'none';
    if (failBanner) failBanner.style.display = 'none';
}

function speakJapanese(text) {
    window.speechSynthesis.cancel(); // Hủy lặp lại nếu đang đọc
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
}

// Ví dụ: Gắn sự kiện cho nút nghe (nếu có nút với class .btnSpeak)
const btnSpeak = document.getElementById('btnSpeak');
btnSpeak.addEventListener('click', function () {
        btnSpeak.addEventListener('click', function () {
            console.log(textToSpeak)
            speakJapanese(textToSpeak);
        });
})


// Sự kiện nút kiểm tra
btnCheck.addEventListener("click", function () {

    const q = questions_Test2[currentIndex];
    choices.forEach(button => {
        const answer = button.getAttribute("data-answer");
        button.disabled = true;
        if (answer === q.correct) {
            button.classList.add("correct");
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "#fff";
            button.querySelector("span").style.color = "#fff";
            button.querySelector("span").style.borderColor = "#fff";
        } else if (answer === selectedAnswer) {
            button.classList.add("wrong");
            button.style.backgroundColor = "#F44336";
            button.style.color = "#fff";
            button.querySelector("span").style.color = "#fff";
            button.querySelector("span").style.borderColor = "#fff";
        }
    });
    containerFooter.style.display = "none";
    if (selectedAnswer === q.correct) {
        successBanner.style.display = "flex";
        failBanner.style.display = "none";
        explain.style.display = "block";
        correctAnswers++;
        score_Test2 += 5;
    } else {
        failBanner.style.display = "flex";
        successBanner.style.display = "none";
        explain.style.display = "block";

    }
});

// Sự kiện cho nút “Tiếp tục” trong banner
continueBtns.forEach(btn => {
    btn.addEventListener("click", async function () {
        successBanner.style.display = "none";
        failBanner.style.display = "none";
        explain.style.display = "none";

        if (currentIndex < questions_Test2.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        } else {
            document.querySelector('.popUpContainer').style.display = "block";
            overlay.style.display = "block";
            popUp.style.display = "flex";

            // Cập nhật điểm số
            const scoreElement = document.querySelector('.point-number-me');
            const pointElement = document.getElementById('score-point');
            if (scoreElement) {
                scoreElement.textContent = `${correctAnswers}/${questions_Test2.length}`;
            }
            if (pointElement) {
                pointElement.textContent = `${score_Test2}`;

            }
            console.log(score_Test2);
            await SavePoint(score_Test2) //function update point
            testLesson(1)
        }
    });
});

// scoreElement






// Xử lý nút "Câu Trước"
if (btnPrev) {
    btnPrev.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion(currentIndex);
        }
    });
}

// Xử lý nút "Bài tiếp Theo"
if (btnNext) {
    btnNext.addEventListener("click", function () {
        if (currentIndex < questions_Test2.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        }
    });
}

// Thêm xử lý cho nút "Làm lại" trong popup
document.querySelector('.redo').addEventListener('click', function () {
    currentIndex = 0;
    correctAnswers = 0;
    score_Test2 = 0;
    document.querySelector('.popUpContainer').style.display = "none";
    overlay.style.display = "none";
    popUp.style.display = "none";
    renderQuestion(currentIndex);
});

// Thêm xử lý cho nút "Học tiếp" trong popup
document.querySelector('.study').addEventListener('click', function () {    // Có thể chuyển hướng đến bài học tiếp theo hoặc trang khác
    document.querySelector('.popUpContainer').style.display = "none";
    overlay.style.display = "none";
    popUp.style.display = "none";
    if (questions_Test3.length > 0) {
        window.location.href = "Test3.html"
    } else {
        window.location.href = "Test4.html"
    }
});











loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        renderQuestion(currentIndex);
    }, 2000);
}