// Khai báo các biến chính
const btnCheck = document.getElementById("btnCheck");
const containerFooter = document.querySelector(".containerFooter");
const successBanner = document.querySelector(".success-banner");
const failBanner = document.querySelector(".fail-banner");
const btnPrev = document.querySelector('.containerFooter .btn2');
const btnNext = document.querySelector('.btn1');
const overlay = document.getElementById('overlay');
const popUp = document.getElementById('popUp');
const explain = document.querySelector(".explanation-container");
let selectedAnswer = null;
let currentIndex = 0;
let correctAnswers = 0;
let score_Test1 = 0;

// Hàm hiển thị câu hỏi
function renderQuestion(index) {
    const q = questions_Test1[index];
    document.querySelector(".numQuestion").textContent = `Câu ${index + 1}/${questions_Test1.length}`;

    // Hiển thị nội dung câu hỏi
    document.querySelector(".question-content").textContent = q.content;

    // Hiển thị các lựa chọn
    const answerButtons = document.querySelectorAll(".BtnAnswer .btn2");
    answerButtons.forEach((button, i) => {
        button.textContent = q.options[i];
        button.disabled = false;
        button.style.backgroundColor = "#FFF";
        button.style.color = "#B5B5B5";
        button.style.border = "2px solid #B5B5B5";
        button.style.cursor = "pointer";
    });

    selectedAnswer = null;

    // Hiện lại footer khi sang câu mới
    containerFooter.style.display = "flex";
}

// Gán sự kiện khi chọn đáp án
document.querySelectorAll(".BtnAnswer .btn2").forEach(button => {
    button.addEventListener("click", function () {
        selectedAnswer = button.textContent.trim();

        document.querySelectorAll(".BtnAnswer .btn2").forEach(btn => {
            btn.style.border = "2px solid #B5B5B5";
        });

        button.style.border = "2.5px solid #3D8BFD";
    });
});

// Khi nhấn “Kiểm Tra”

btnCheck.addEventListener("click", function () {

    const q = questions_Test1[currentIndex];
    const answerButtons = document.querySelectorAll(".BtnAnswer .btn2");

    let isCorrect = false;

    answerButtons.forEach(button => {
        const answer = button.textContent.trim();

        if (answer === q.correct) {
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "#FFF";
            if (selectedAnswer === answer) {
                isCorrect = true;
                correctAnswers++;
                score_Test1 += 5;
            }
        } else if (answer === selectedAnswer) {
            button.style.backgroundColor = "#F44336"; // đỏ cho sai
            button.style.color = "#FFF";
        }

        button.disabled = true;

        button.style.cursor = "not-allowed";
    });

    // Ẩn footer khi kiểm tra
    containerFooter.style.display = "none";

    // Hiển thị banner tương ứng
    if (isCorrect) {
        successBanner.style.display = "flex";
        failBanner.style.display = "none";
        explain.style.display = "block";
    } else {
        failBanner.style.display = "flex";
        successBanner.style.display = "none";
        explain.style.display = "block";
    }
});

// Sự kiện cho nút “Tiếp tục” trong banner
document.querySelectorAll(".button-banner").forEach(btn => {
    btn.addEventListener("click", async function () {
        // Ẩn cả 2 banner
        successBanner.style.display = "none";
        failBanner.style.display = "none";
        explain.style.display = "none";

        // Chuyển sang câu tiếp theo
        if (currentIndex < questions_Test1.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        } else {            // Hiển thị popup kết quả
            document.querySelector('.popUpContainer').style.display = "block";
            overlay.style.display = "block";
            popUp.style.display = "flex";

            // Cập nhật điểm số
            const scoreElement = document.querySelector('.point-number-me');
            const pointElement = document.getElementById('score-point');
            if (scoreElement) {
                scoreElement.textContent = `${correctAnswers}/${questions_Test1.length}`;
            }
            if (pointElement) {
                pointElement.textContent = `${score_Test1}`;
            }
            testLesson(0)
            await SavePoint(score_Test1) //function update point

        }
    });
});
// scoreElement











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

// Thêm xử lý cho nút "Học tiếp" trong popup
document.querySelector('.study').addEventListener('click', function () {    // Có thể chuyển hướng đến bài học tiếp theo hoặc trang khác
    document.querySelector('.popUpContainer').style.display = "none";
    overlay.style.display = "none";
    popUp.style.display = "none";
    if (questions_Test2.length > 0) {
        window.location.href = "Test2.html"
    } else if (questions_Test3.length > 0) {
        window.location.href = "Test3.html"
    } else {
        window.location.href = "Test4.html"
    }
});

// Xử lý nút "Câu Trước"
if (btnPrev) {
    btnPrev.addEventListener("click", function () {

        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion(currentIndex);
            // Ẩn banner nếu có
            successBanner.style.display = "none";
            failBanner.style.display = "none";
        }
    });
}









loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        renderQuestion(currentIndex);
    }, 2000);
}