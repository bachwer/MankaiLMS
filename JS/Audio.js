// Khai báo các biến chính
const btnCheck = document.getElementById("btnCheck");
const containerFooter = document.querySelector(".containerFooter");
const successBanner = document.querySelector(".success-banner");
const failBanner = document.querySelector(".fail-banner");
const btnPrev = document.querySelector('.containerFooter .btn2');
const btnNext = document.querySelector('.btn1');
const containerMain = document.querySelector('.containerMain');
const buttonBanners = document.querySelectorAll('.button-banner');
const explain = document.querySelector(".explanation-container");
const overlay = document.getElementById('overlay');
const popUp = document.getElementById('popUp');
let currentIndex = 0;
let correctAnswers = 0;
let score_Audio = 0;

// Hàm render câu hỏi
function renderQuestion(index) {
    // Kiểm tra để đảm bảo index nằm trong phạm vi hợp lệ
    if (index < 0 || index >= questionsAudio.length) {
        console.error("Index không hợp lệ:", index);
        return;
    }

    const q = questionsAudio[index];
    containerMain.innerHTML = `
    <div class="textNumber">
          <span>Câu ${index + 1}/${questionsAudio.length}</span>
        </div>
        <div class="title">
          <h2>Điền từ bạn nghe được</h2>
        </div>
        <div class="audioButton">
          <img class="btnSpeak" src="../../assets/volume-high.svg" alt="audio">
        </div>
        <div class="textJapanese">
          <p><span style="color: #F37142;">${q.text}</span>${q.text1}</p>
          <p>${q.content}<input class="inputField" placeholder="Nhập từ còn thiếu"></input>
            ${q.content1}</p>
        </div>
    `;

    // Thêm lại event listener cho nút audio sau khi render
    const btnSpeak = document.querySelector('.btnSpeak');
    if (btnSpeak) {
        btnSpeak.addEventListener('click', function () {
            // Đọc nội dung tiếng Nhật của câu hỏi hiện tại
            speakJapanese(q.text + ' ' + q.text1);
        });
    }

    containerFooter.style.display = "flex";
    if (successBanner) successBanner.style.display = "none";
    if (failBanner) failBanner.style.display = "none";

    // Focus vào input mới render
    setTimeout(() => {
        const newInput = document.querySelector('.inputField');
        if (newInput) {
            newInput.value = "";
            newInput.focus(); // Thêm focus() để tập trung vào input
        }
    }, 10);
}

function speakJapanese(text) {
    try {
        window.speechSynthesis.cancel(); // Hủy lặp lại nếu đang đọc
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error("Lỗi khi đọc văn bản:", error);
        // Hiển thị thông báo lỗi cho người dùng nếu cần
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Không thể phát âm thanh. Vui lòng thử lại sau.',
            confirmButtonText: 'OK'
        });
    }
}

// Khi nhấn "Kiểm Tra"
btnCheck.addEventListener("click", function () {
    const input = document.querySelector('.inputField');
    if (!input || !input.value.trim()) {
        Swal.fire({
            icon: 'warning',
            title: 'Thông báo',
            text: 'Vui lòng nhập đáp án trước khi kiểm tra!',
            confirmButtonText: 'OK'
        });
        return;
    }
    const q = questionsAudio[currentIndex];
    const userAnswer = input.value.trim();
    containerFooter.style.display = "none";
    if (userAnswer === q.answer) {
        if (successBanner) successBanner.style.display = "flex";
        if (failBanner) failBanner.style.display = "none";
        explain.style.display = "block";
        correctAnswers++;
        score_Audio += 5;
    } else {
        if (failBanner) failBanner.style.display = "flex";
        if (successBanner) successBanner.style.display = "none";
        explain.style.display = "block";

    }
});

// Sự kiện cho nút "Tiếp tục" trong banner
buttonBanners.forEach(btn => {
    btn.addEventListener("click", function () {
        if (successBanner) successBanner.style.display = "none";
        if (failBanner) failBanner.style.display = "none";
        explain.style.display = "none";

        // Sửa lỗi kiểm tra và tăng index
        if (currentIndex < questionsAudio.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        } else {
            document.querySelector('.popUpContainer').style.display = "block";
            overlay.style.display = "block";
            popUp.style.display = "flex";
            progressAudio()

            // Cập nhật điểm số
            const scoreElement = document.querySelector('.point-number-me');
            const pointElement = document.getElementById('score-point');
            if (scoreElement) {
                scoreElement.textContent = `${correctAnswers}/${questionsAudio.length}`;
            }
            if (pointElement) {
                pointElement.textContent = `${score_Audio}`;
            }
        }
    });
});

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
        if (currentIndex < questionsAudio.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        }
    });
}

// Hiển thị câu hỏi đầu tiên khi tải trang

// Thêm xử lý cho nút "Làm lại" trong popup
document.querySelector('.redo').addEventListener('click', function () {
    currentIndex = 0;
    correctAnswers = 0;
    score_Test1 = 0;
    document.querySelector('.popUpContainer').style.display = "none";
    overlay.style.display = "none";
    popUp.style.display = "none";
    renderQuestion(currentIndex);
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