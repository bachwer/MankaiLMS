const btnCheck = document.querySelector('.btn4');
const btnPrev = document.querySelector('.btn2');
const btnNext = document.querySelector('.btn1');
const containerFooter = document.querySelector('.containerFooter');
const successBanner = document.querySelector('.success-banner');
const failBanner = document.querySelector('.fail-banner');
const continueBtns = document.querySelectorAll('.button-banner');
const containerMain = document.querySelector('.containerMain');
const titleMain = document.querySelector('.titleMain');
const questionMain = document.querySelector('.questionMain');
const overlay = document.getElementById('overlay');
const popUp = document.getElementById('popUp');
const explain = document.querySelector(".explanation-container");
let currentIndex = 0;
let selectedAnswers = {}; // {sectionIndex: answer}
let isChecked = false;
let correctAnswers = 0;
let score_Test3 = 0;

// Hàm render câu hỏi
function renderQuestion(index) {
    const q = questions_Test3[index];

    // Render tiêu đề, số câu, nội dung và nút loa
    if (titleMain) {
        titleMain.innerHTML = `
            <div class="textNumber">Câu ${index + 1}/${questions_Test3.length}</div>
            <h3>${q.title || ""}</h3>
            <div class="questionContent">${q.content || ""}</div>
            <div class="audioButton">
                <button type="button">
                      <img src="../../assets/volume-high.svg" alt="audio" />
                </button>
            </div>
        `;
    }

    // Reset state trước khi render câu hỏi mới
    isChecked = false;
    selectedAnswers = {};
    let textToSpeak = "";

    // Render các section câu hỏi
    if (questionMain) {
        questionMain.innerHTML = "";
        q.sections.forEach((section, secIdx) => {
            const sectionEl = document.createElement('section');
            const qDiv = document.createElement('div');
            qDiv.textContent = section.question;
            textToSpeak =section.question;
            sectionEl.appendChild(qDiv);

            section.options.forEach((opt, optIdx) => {
                const btn = document.createElement('button');
                btn.innerHTML = `<span class="btnAnswer">${String.fromCharCode(65 + optIdx)}</span> ${opt}`;
                btn.className = "option-btn";
                btn.dataset.section = secIdx;
                btn.dataset.answer = opt;

                // Reset style cho button mới
                btn.style.border = "2px solid #DDDDDD";
                btn.style.backgroundColor = "#fff";

                // Ensure button is enabled for new question
                btn.disabled = false;

                // Thêm event listener cho button
                btn.addEventListener('click', function () {
                    if (isChecked) return;

                    // Reset style cho tất cả các button trong cùng section
                    sectionEl.querySelectorAll('button').forEach(b => {
                        b.style.border = "2px solid #DDDDDD";
                        b.style.backgroundColor = "#fff";
                    });

                    // Cập nhật style cho button được chọn
                    this.style.border = "2.5px solid #3D8BFD";
                    this.style.backgroundColor = "#eaf3ff";

                    // Lưu đáp án đã chọn
                    selectedAnswers[secIdx] = opt;
                });

                sectionEl.appendChild(btn);
            });

            questionMain.appendChild(sectionEl);
        });
    }

    // Reset UI elements
    containerFooter && (containerFooter.style.display = "flex");
    if (successBanner) successBanner.style.display = "none";
    if (failBanner) failBanner.style.display = "none";

    // Gán lại sự kiện cho nút loa
    const audioBtn = document.querySelector('.audioButton button');
    if (audioBtn) {
        audioBtn.addEventListener("click", () => {

            speakJapanese(textToSpeak)
        })
        function speakJapanese(text) {
            window.speechSynthesis.cancel(); // Hủy lặp lại nếu đang đọc
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            window.speechSynthesis.speak(utterance);
        }

    }
}

// Xử lý nút kiểm tra
btnCheck && btnCheck.addEventListener("click", function () {
    const q = questions_Test3[currentIndex];
    let allAnswered = true;
    let allCorrect = true;

    q.sections.forEach((section, secIdx) => {
        if (!selectedAnswers[secIdx]) {
            allAnswered = false;
        }
        if (selectedAnswers[secIdx] !== section.correct) {
            allCorrect = false;
        }
    });

    if (!allAnswered) {
        Swal.fire({
            icon: 'warning',
            title: 'Thông báo',
            text: 'Vui lòng chọn đáp án cho tất cả các câu hỏi!',
            confirmButtonText: 'OK'
        });
        return;
    }

    // Đánh dấu đã kiểm tra, disable các nút
    isChecked = true;
    questionMain.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
        const secIdx = btn.dataset.section;
        const answer = btn.dataset.answer;
        const correct = q.sections[secIdx].correct;
        if (answer === correct) {
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "#fff";
            btn.querySelector("span").style.color = "#3D8BFD"; // hoặc màu mặc định bạn muốn
            btn.querySelector("span").style.borderColor = "#3D8BFD";

        } else if (selectedAnswers[secIdx] === answer) {
            btn.style.backgroundColor = "#F44336";
            btn.style.color = "#fff";
            btn.querySelector("span").style.color = "#3D8BFD"; // hoặc màu mặc định bạn muốn
            btn.querySelector("span").style.borderColor = "#3D8BFD";

        }
    });

    containerFooter && (containerFooter.style.display = "none");
    if (allCorrect) {
        successBanner && (successBanner.style.display = "flex");
        failBanner && (failBanner.style.display = "none");
        explain && (explain.style.display = "block");
        correctAnswers++;
        score_Test3 += 5;
    } else {
        failBanner && (failBanner.style.display = "flex");
        successBanner && (successBanner.style.display = "none");
        explain && (explain.style.display = "block");
    }
});

function speakJapanese(text) {
    window.speechSynthesis.cancel(); // Hủy lặp lại nếu đang đọc
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
}

// Ví dụ: Gắn sự kiện cho nút nghe (nếu có nút với class .btnSpeak)
const btnSpeak = document.querySelector('.btnSpeak');
if (btnSpeak) {
    btnSpeak.addEventListener('click', function () {
        // Đọc nội dung tiếng Nhật của câu hỏi hiện tại
        const q = questions_Test3[currentIndex];
        speakJapanese(q.content);
    });
}

// Sự kiện cho nút “Tiếp tục” trong banner
continueBtns.forEach(btn => {
    btn.addEventListener("click", async function () {
        successBanner && (successBanner.style.display = "none");
        failBanner && (failBanner.style.display = "none");
        explain && (explain.style.display = "none");
        // Nếu có nhiều câu hỏi, chuyển sang câu tiếp theo
        if (currentIndex < questions_Test3.length - 1) {
            currentIndex++;
            selectedAnswers = {};
            renderQuestion(currentIndex);
        } else {
            document.querySelector('.popUpContainer').style.display = "block";
            overlay.style.display = "block";
            popUp.style.display = "flex";

            // Cập nhật điểm số
            const scoreElement = document.querySelector('.point-number-me');
            const pointElement = document.getElementById('score-point');
            if (scoreElement) {
                scoreElement.textContent = `${correctAnswers}/${questions_Test3.length}`;
            }
            if (pointElement) {
                pointElement.textContent = `${score_Test3}`;
            }

            await SavePoint(score_Test3) //function update point
            testLesson(2)
        }
    });
});

// scoreElement






// Xử lý nút "Câu Trước"
btnPrev && btnPrev.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        selectedAnswers = {};
        renderQuestion(currentIndex);
    }
});

// Xử lý nút "Bài tiếp Theo"
btnNext && btnNext.addEventListener("click", function () {
    if (currentIndex < questions_Test3.length - 1) {
        currentIndex++;
        selectedAnswers = {};
        renderQuestion(currentIndex);
    }
});
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
    if (questions_Test4.length > 0) {
        window.location.href = "Test4.html"
    } else {
        window.location.href = "Test5.html"
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