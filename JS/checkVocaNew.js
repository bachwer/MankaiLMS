
let quizData;

loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        // Tạo câu hỏi trắc nghiệm từ thẻ ghi nhớ
        quizData = flashcards.map((card) => {
            // Tạo các câu trả lời sai bằng cách lấy ngẫu nhiên 3 thẻ khác
            const wrongAnswers = [];

            while (wrongAnswers.length < 3) {
                const randomIndex = Math.floor(Math.random() * flashcards.length);
                const randomMeaning = flashcards[randomIndex].meaning;

                if (randomMeaning !== card.meaning && !wrongAnswers.includes(randomMeaning)) {
                    wrongAnswers.push(randomMeaning);
                }
            }

            // Tạo 4 câu trả lời (1 đúng, 3 sai) và xáo trộn chúng
            const answers = [
                { text: card.meaning, correct: true },
                { text: wrongAnswers[0], correct: false },
                { text: wrongAnswers[1], correct: false },
                { text: wrongAnswers[2], correct: false }
            ];

            // Xáo trộn các đáp án
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];
            }

            return {
                question: `Từ "${card.japanese}" có nghĩa là gì?`,
                answers: answers,
                explanation: `Từ "${card.japanese}" có nghĩa là "${card.meaning}" trong tiếng Việt.`
            };
        });


    }, 2500);
}






// Khai báo biến điểm và theo dõi
let scoreCorrect = 0;
let answeredQuestions = 0;

// Các phần tử DOM
const check = document.querySelector(".check");
const answers = document.querySelectorAll('.ans');
const checkBtn = document.querySelector('.check');
const prevBtn = document.querySelector('.ques-prev');
const continueBtn = document.querySelector(".continue-btn");
const continueBtnFail = document.querySelector(".continue-btn-fail");
const btnChangeQues = document.querySelector('.btn-change-ques');
const container = document.querySelector('.container');
const menu = document.querySelector(".menu");
const explanationContainer = document.querySelector('.explanation-container');
const explanationContainer1 = document.querySelector('.explanation-container1');
const overlay = document.getElementById("overlay");
const popUp = document.getElementById("popUp");
const redoButton = document.querySelector(".redo");
const studyButton = document.querySelector(".study");
const power = document.getElementById("power");
const questionContainer = document.getElementById('question');
const progressBar = document.querySelector('.progress');
const scorePoint = document.getElementById('score-point');

// Biến để theo dõi trạng thái bài kiểm tra
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let userAnswers = [];
let progressBarWidthMax = 400;
let progressBarWidth = 0;
progressBar.style.width = 0;

// Hàm hiển thị câu hỏi hiện tại
function displayQuestion() {
    // Xóa nội dung câu hỏi trước đó
    questionContainer.innerHTML = '';
    selectedAnswerIndex = null;

    // Tạo phần tử câu hỏi
    const questionElement = document.createElement('div');
    questionElement.classList.add('card-title');
    questionElement.innerHTML = `
    <div class="card-subject">
      <div class="card-content">${quizData[currentQuestionIndex].question}</div>
    </div>
  `;

    // Tạo vùng chứa cho các câu trả lời
    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answer-test');

    // Tạo các phần tử trả lời
    const options = ['A', 'B', 'C', 'D'];
    quizData[currentQuestionIndex].answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('ans');
        answerElement.innerHTML = `
      <div class="icon-ans" id="${options[index].toLowerCase()}">${options[index]}</div>
      <div>
        <p class="t">${answer.text}</p>
      </div>
    `;

        // Thêm sự kiện click để chọn câu trả lời
        answerElement.addEventListener('click', () => {
            // Xóa lớp đã chọn khỏi tất cả các câu trả lời
            answersContainer.querySelectorAll('.ans').forEach(ans => ans.classList.remove('selected'));

            // Thêm lớp đã chọn vào câu trả lời được nhấp
            answerElement.classList.add('selected');

            // Kích hoạt nút kiểm tra
            checkBtn.classList.add('btn-green');

            // Lưu chỉ mục câu trả lời đã chọn
            selectedAnswerIndex = index;
        });

        answersContainer.appendChild(answerElement);
    });

    // Thêm câu hỏi và câu trả lời vào vùng chứa
    questionContainer.appendChild(questionElement);
    questionContainer.appendChild(answersContainer);

    // Cập nhật nội dung giải thích cho câu hỏi hiện tại
    const explanationContents = document.querySelectorAll('.explanation-content');
    explanationContents.forEach(content => {
        content.innerHTML = `<span class="key">${quizData[currentQuestionIndex].question}</span> ${quizData[currentQuestionIndex].explanation}`;
    });

}


// Hàm chuyển đến câu hỏi tiếp theo
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Nếu là câu hỏi cuối cùng, hiển thị cửa sổ hoàn thành
        showCompletionPopup();
    }
}

// Hàm quay lại câu hỏi trước
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Hiển thị cửa sổ hoàn thành
async function showCompletionPopup() {
    overlay.style.display = 'block';
    popUp.style.display = 'block';

    // Cập nhật hiển thị điểm
    const scoreDisplay = document.querySelector('.point-number-me');
    if (scoreDisplay) {
        scoreDisplay.textContent = `${scoreCorrect}/${answeredQuestions}`;
    }


    const expPoints = scoreCorrect * 5;
    scorePoint.textContent = `${expPoints}`;
    await SavePoint(expPoints)
    flashCard1(2);
}

// Đặt lại bài kiểm tra để thử lại
function restartQuiz() {
    overlay.style.display = 'none';
    popUp.style.display = 'none';

    checkBtn.style.display = 'block';
    prevBtn.style.display = 'block';
    // Đặt lại các biến trạng thái
    currentQuestionIndex = 0;
    scoreCorrect = 0;
    selectedAnswerIndex = null;
    answeredQuestions = 0;
    userAnswers = [];
    progressBarWidth = 0;
    progressBar.style.width = 0;
    displayQuestion();
}

// Các sự kiện lắng nghe
document.addEventListener('DOMContentLoaded', function () {
    // Hiển thị câu hỏi đầu tiên


    setTimeout(() => {
        const spinner = document.getElementById("spinnerContainer");
        spinner.style.display = 'none';
        displayQuestion();
    }, 3000);

    // Nút nguồn - điều hướng đến trang thẻ ghi nhớ
    if (power) {
        power.addEventListener("click", () => {
            window.location.href = "../../HTML/Flow_1.4/flashCard.html";
        });
    }

    // Sự kiện nút kiểm tra
    if (checkBtn) {
        checkBtn.addEventListener('click', function () {
            const selectedAnswer = document.querySelector('.ans.selected');

            if (checkBtn.textContent.trim() === 'Kiểm tra') {
                if (selectedAnswer) {
                    // Kiểm tra xem câu trả lời đã chọn có đúng không
                    const isCorrect = quizData[currentQuestionIndex].answers[selectedAnswerIndex].correct;

                    // Xóa lớp đã chọn khỏi tất cả các câu trả lời
                    document.querySelectorAll('.ans').forEach(ans => {
                        ans.classList.remove('selected');
                    });

                    // Lưu trạng thái câu trả lời
                    userAnswers[currentQuestionIndex] = {
                        index: selectedAnswerIndex,
                        correct: isCorrect
                    };

                    if (isCorrect) {
                        // Nếu đúng
                        scoreCorrect++;
                        btnChangeQues.style.borderTop = 'none';
                        explanationContainer.style.display = 'block';
                        explanationContainer1.style.display = 'none';
                        container.style.height = '957px';
                        selectedAnswer.classList.add('correct1');
                    } else {
                        // Nếu sai
                        btnChangeQues.style.borderTop = 'none';
                        explanationContainer1.style.display = 'block';
                        explanationContainer.style.display = 'none';
                        container.style.height = '957px';
                        selectedAnswer.classList.add('failed1');
                        // Đánh dấu câu trả lời đúng
                        const ansElements = document.querySelectorAll('.ans');
                        ansElements.forEach((ans, index) => {
                            if (quizData[currentQuestionIndex].answers[index].correct) {
                                ans.classList.add('correct');
                            }
                        });
                    }

                    // Ẩn các nút điều hướng và hiển thị nút tiếp tục
                    prevBtn.style.display = 'none';
                    checkBtn.style.display = 'none';

                    // Hiển thị nút tiếp tục phù hợp dựa trên đúng/sai
                    if (isCorrect) {
                        continueBtn.style.display = 'block';
                        continueBtnFail.style.display = 'none';
                        progressBarWidth += 100;
                        progressBar.style.width = `${progressBarWidth}px`;
                    } else {
                        continueBtnFail.style.display = 'block';
                        continueBtn.style.display = 'none';
                    }

                    // Cập nhật số câu hỏi đã trả lời và thanh tiến trình
                    answeredQuestions++;

                }
                menu.style.height = '940px';
            }
        });
    }

    // Sự kiện nút tiếp tục
    async function handleContinue() {
        // Ẩn các nút tiếp tục và vùng giải thích
        continueBtn.style.display = 'none';
        continueBtnFail.style.display = 'none';
        explanationContainer.style.display = 'none';
        explanationContainer1.style.display = 'none';
        if (progressBar.style.width === 400 + 'px') {
            showCompletionPopup();
        }

        // Đặt lại các lớp nút kiểm tra
        checkBtn.classList.remove('btn-green');

        // Xóa các lớp đánh dấu câu trả lời
        document.querySelectorAll('.ans').forEach(ans => {
            ans.classList.remove('correct1');
            ans.classList.remove('failed1');
            ans.classList.remove('correct');
        });

        btnChangeQues.style.borderTop = 'none';

        // Kiểm tra xem còn câu hỏi không
        if (currentQuestionIndex < quizData.length - 1) {
            // Nếu chưa xong, chuyển đến câu hỏi tiếp theo
            currentQuestionIndex++;
            displayQuestion();
            checkBtn.style.display = 'block';
            prevBtn.style.display = 'block';
        } else {
            // Nếu đã xong, hiển thị cửa sổ hoàn thành

            showCompletionPopup(scorePoint);




        }
    }



    if (continueBtn) {
        continueBtn.addEventListener("click", handleContinue);
    }

    if (continueBtnFail) {
        continueBtnFail.addEventListener("click", handleContinue);
    }

    // Sự kiện nút trước
    if (prevBtn) {
        prevBtn.addEventListener('click', prevQuestion);
    }

    // Sự kiện nút thử lại
    if (redoButton) {
        redoButton.addEventListener('click', restartQuiz);
    }

    // Sự kiện nút học
    if (studyButton) {
        studyButton.addEventListener('click', function () {
            overlay.style.display = 'none';
            popUp.style.display = 'none';
            window.location.href = "../../HTML/Flow_1.4/flashCard.html";
        });
    }


});