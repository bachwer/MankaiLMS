
const spinner = document.getElementById("spinnerContainer");
spinner.style.display = "flex";

setTimeout(() => {

    spinner.style.display = "none";


    console.log(examData)
    const mainSection = document.querySelector('.main-container section');
    mainSection.innerHTML = '';

    examData.sections.forEach((section, secIdx) => {




        console.log(section)
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'header-content1';
        let sectionHTML =
            `
                <div class="content-group1">
                <div class="ques1">
                    <p class="text-content-ques">${section.title}</p>
                    ${section.content.map(text => `<p class="content-ques">${text}</p>`).join('')}
                </div>
               
                   
                   <div class="audio-wrapper">
                        ${section.linkAudio ? `
                        <div class="card-volume">
                            <div class="volume" id="volume">
                                <img src="../assets/volumeHigh1.svg" alt="No audio available">
                            </div>
                            <div class="custom-audio"> 
                                <audio id="audio" preload="metadata">
                                    <source src="${section.linkAudio}" type="audio/mp3">
                                </audio> 
                                  <div class="progress2">
                                        <input type="range" id="seek" value="0">
                                   </div>
                                   <div class="time">
                                      <span id="currentTime">00:00</span>
                                      <span id="duration">00:00</span>
                                    </div>
                            </div>
                            
                           
                        </div> `: ``}</div>
                        <div class="card1"></div>
                        

                        
`;
        section.questions.forEach((question, quesIdx) => {

            sectionHTML +=
                `<div class="content-group1 ques" data-question-id="${question.id}">
            <div class="down">
                <p>${question.text}</p>
                <img class="arrow-down" src="../assets/arrow-down.svg">
            </div>
            <div class="answer-test">
                ${question.answers.map(answer =>
                    `<div class="answer${answer.id} ans" data-answer-id="${answer.id}" data-is-correct="${answer.correct}">
                        <div class="icon-ans" data-answer-id="${answer.id}">${answer.id.toUpperCase()}</div>
                        <div>
                            <p>${answer.text}</p>
                        </div>
                    </div>`
                ).join('')}
            </div>
        </div>`;
        });

        sectionHTML += `</div>`;
        sectionDiv.innerHTML = sectionHTML;
        mainSection.appendChild(sectionDiv);
    });

    const ansBtn = document.querySelectorAll('.ans');
    const navBtn = document.querySelectorAll('.btn-navi');
    const subBtn = document.getElementById('submit-btn');
// const transBtn = document.querySelector('.trans');
// const exitBtn = document.querySelector('.exit');
    const arrowDownBtn = document.querySelectorAll('.arrow-down');
    const ansTest = document.querySelectorAll('.answer-test');

    const overLay = document.getElementById('overlay');
    const popUp = document.getElementById('popUp');
    const popUpSec = document.getElementById('pop-up-sec');

    const navBtnContainer = document.querySelectorAll('.group-ques1');
    let totalQues = 0;

    for (let i = 0; i < examData.sections.length; i++) {
        totalQues += examData.sections[i].questions.length;
    }

    navBtnContainer.forEach((list, idx) => {
        if (idx === 0) {
            let buttonsHTML = '';
            for (let i = 1; i <= totalQues; i++) {
                buttonsHTML += `<button class="btn-navi">${i}</button>`;
            }
            list.querySelector('div').innerHTML = buttonsHTML;
        }
    })




//fix thêm chức năng
    const answerUser = {}
    let arrCheck1 = [];
    let arrCheck2 = [];
    let arrCheck3 = [];
    document.querySelectorAll('.ans').forEach(answer => {
        answer.addEventListener('click', function() {
            if (!document.querySelector('.submit').classList.contains('submitted')) {
                const questionContainer = this.closest('.ques');
                const quesId = questionContainer.dataset.questionId;
                const answerTest = questionContainer.querySelector('.answer-test');
                const questionId = this.closest('.ques').dataset.questionId;
                answerUser[questionId] = this.dataset.answerId;

                answerTest.querySelectorAll('.ans').forEach(ans => {
                    ans.classList.remove('selected-ans');
                    ans.querySelector('.icon-ans').classList.remove('selected')
                });

                // Add select for ans đc select
                this.classList.add('selected-ans');
                this.querySelector('.icon-ans').classList.add('selected')

                // Up navi
                const navBtn = document.querySelectorAll('.btn-navi')
                navBtn.forEach(btn => btn.classList.remove('selected'))

                const navIndex=  parseInt(quesId)

                const navButton = navBtn[navIndex - 1];
                console.log(navButton)
                if (navButton) {
                    // navButton.classList.add('selected');
                    navButton.classList.add('answered')
                    console.log(navIndex);
                    let index = 0;
                    let arrCheck = arrCheck1;

                    let test1 = examData.sections[0].questions[examData.sections[0].questions.length - 1].id;
                    let test2 = examData.sections[1].questions[examData.sections[1].questions.length - 1].id;

                    if(navIndex <= test2 && navIndex > test1) {
                        index = 1;
                        arrCheck = arrCheck2;
                    }if(navIndex > test2) {
                        index = 2;
                        arrCheck = arrCheck3;
                    }


                    if(!arrCheck.includes(navIndex)){
                        console.log(index);
                        // arrCheck.push(navIndex);
                        if(index === 0){
                            arrCheck1.push(navIndex);
                            checkCompletePart(index, arrCheck1);
                        }else if(index === 1){
                            arrCheck2.push(navIndex);
                            checkCompletePart(index, arrCheck2);
                        }else if(index === 2){
                            arrCheck3.push(navIndex);
                            checkCompletePart(index, arrCheck3);

                        }


                    }
                }
            }
        });
    });



    window.addEventListener('scroll', function () {
        const element = document.getElementById('tableQues');
        const scrollY = window.scrollY;

        if (scrollY > 100) { // Thay 100 bằng khoảng cách bạn muốn
            element.style.top = '50px';
        } else {
            element.style.top = '300px';
        }
    });









    function calcuScores() {
        const scores = {
            voca: 0,
            read: 0,
            lis: 0
        }
        examData.sections.forEach((sec, secIdx) => {
            sec.questions.forEach(question => {
                const ansId = answerUser[question.id]
                let key
                if(secIdx === 0) key = 'voca'
                else if (secIdx === 1) key = 'read'
                else if (secIdx === 2) key = 'lis'
                if (ansId) {
                    const selectAnswer = question.answers.find(ans => ans.id === ansId)
                    if(selectAnswer) {
                        if(selectAnswer.correct)  scores[key] += 1;
                        // else scores[key] -= 1;
                    }
                }
            })
        })
        return scores
    }

    let check=false
    document.getElementById('submit-btn').addEventListener('click', function() {
        if (!check) {
            check = true;
            stopTimer();

            const scores = calcuScores()
            document.getElementById('voca').textContent =  `${scores.voca}/${examData.sections[0].questions.length}`;
            document.getElementById('read').textContent = `${scores.read}/${examData.sections[1].questions.length}`;
            document.getElementById('lis').textContent = `${scores.lis}/${examData.sections[2].questions.length}`;
            let point = examData.sections[0].questions.length + examData.sections[1].questions.length + examData.sections[2].questions.length;
            let pointUser = scores.voca + scores.read + scores.lis;
            let overall = (pointUser / point) * 100;


            document.querySelectorAll('.answer-test').forEach(answerTest => {
                const selectAns = answerTest.querySelector('.selected-ans');
                const correctAns = answerTest.querySelector('[data-is-correct="true"]');

                if (selectAns) {
                    selectAns.classList.remove('selected-ans');
                    selectAns.querySelector('.icon-ans').classList.remove('selected');

                    if (selectAns.getAttribute('data-is-correct') === "true") {
                        selectAns.classList.add('correct');

                    } else {
                        selectAns.classList.add('wrong');
                        selectAns.querySelector('.icon-ans').classList.add('wrong-icon');
                        if (correctAns) {
                            correctAns.classList.add('correct');
                            correctAns.querySelector('.icon-ans').classList.add('correct-icon');
                        }
                    }
                } else if (correctAns) {
                    correctAns.classList.add('correct');
                    correctAns.querySelector('.icon-ans').classList.add('correct-icon');
                }
            });

            if (overLay && popUp && popUpSec) {
                popUpSec.style.display = 'block';
                overLay.style.display = 'block';
                popUp.style.display = 'block';
                complete(overall)
                audio.pause();


            }
        }
    });


    const testTime = document.getElementById('test-time');
    let timeLeft = 45 * 60;
    let time;

    function updateTimer() {
        if (timeLeft > 0) {
            testTime.textContent = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
            timeLeft--;
            time = setTimeout(updateTimer, 1000);
        } else {
            testTime.textContent = '00:00';
            clearTimeout(time);
            subBtn.click();
        }
    }

    function stopTimer() {
        clearTimeout(time);
    }

    updateTimer();

    overLay.style.display = 'none';
    popUp.style.display = 'none';

// document.querySelectorAll('.redo, .study').forEach(button => {
//     button.addEventListener('click', function() {
//         overLay.style.display = 'none';
//         popUp.style.display = 'none';
//         popUpSec.style.display = 'none';
//     });
// });

    document.getElementById("redo").addEventListener('click', function() {
        window.location.href = "../HTML/HomePage.html"
    });

    document.getElementById("study").addEventListener('click', function() {

        overLay.style.display = 'none';
        popUp.style.display = 'none';
        popUpSec.style.display = 'none';
    });


    arrowDownBtn.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const ansSec = this.closest('.ques').querySelector('.answer-test');
            const hide = ansSec.style.display === 'none';

            if (hide) {
                ansSec.style.display = 'flex';
                this.style.transform = 'rotate(180deg)';
            } else {
                ansSec.style.display = 'none';
                this.style.transform = 'rotate(0deg)';
            }
        });
    });

    navBtn.forEach((button, index) => {
        button.addEventListener('click', function() {
            const questions = document.querySelectorAll('.ques')
            if (index < questions.length) {

                const ansSec = questions[index].querySelector('.answer-test');
                ansTest.forEach(section => {
                    section.style.display = 'none';
                    section.closest('.ques').querySelector('.arrow-down').style.transform = 'rotate(0deg)';
                });
                ansSec.style.display = 'flex';

                const arrow = questions[index].querySelector('.arrow-down');
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });



// .btn-voca{
//     border: 1px solid #12B76A;
//     background: #ECFDF3;
//     color: #12B76A;
// }
//
// .btn-grama{
//     color: #F37142;
//     border: 1px solid #F37142;
//     background: #FFF7F4;
// }btn-lis





//bach

    let test1 = document.getElementById("test1");


    test1.addEventListener('click', function() {
        removeChoice()
        scrollToSecondContainer(0)
        test1.classList.add('btn-grama');
    })

    let test2 = document.getElementById("test2");
    test2.addEventListener('click', function() {
        removeChoice()
        scrollToSecondContainer(1)
        console.log("true")
        test2.classList.add('btn-grama');
    })


    let test3 = document.getElementById("test3");
    test3.addEventListener('click', function() {
        removeChoice()
        scrollToSecondContainer(2)
        test3.classList.add('btn-grama');
    })




    function removeChoice(){
        let test1 = document.getElementById("test1");
        let test2 = document.getElementById("test2");
        let test3 = document.getElementById("test3");
        test1.classList.remove("btn-grama");
        test3.classList.remove("btn-grama");
        test2.classList.remove("btn-grama");
    }

    function scrollToSecondContainer(index) {
        const containers = document.querySelectorAll('.header-content1');

        containers[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


//function check hoàn thành của mỗi phần;
    function checkCompletePart(index, arr){
        let check = true;
        for(let i = 0; i < examData.sections[index].questions.length; i++){

            if(!arr.includes(examData.sections[index].questions[i].id)){
                check = false;
            }
        }
        if(check){
            console.log(true);
            if(index === 0){
                let test1 = document.getElementById("test1");
                test1.classList.add('btn-voca');
                test1.disable = true;

            }if(index === 1){
                let test1 = document.getElementById("test2");
                test1.classList.add('btn-voca');
                test1.disable = true;
            }else if(index === 2){
                let test1 = document.getElementById("test3");
                test1.classList.add('btn-voca');
                test1.disable = true;
            }


        }else{
            console.log(false);
        }
        console.log(arr)

    }



}, 2000); // 2000ms = 2 giây









// luu nguoi dung test
function complete(overall) {
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    const dateOder = dataCurrent();

    db.collection("resultsExam")
        .orderBy("timestamp", "asc")
        .get()
        .then(resultsSnapshot => {
            const resultsData = resultsSnapshot.docs;

            if (resultsData.length >= 5) {
                const oldestDocId = resultsData[0].id;
                return db.collection("resultsExam").doc(oldestDocId).delete()
                    .then(() => {
                        return addNewResult(overall, dataUser.name, dateOder, dataUser.imgUrl);
                    });
            } else {
                return addNewResult(overall, dataUser.name, dateOder, dataUser.imgUrl);
            }
        })
        .then(() => {
            console.log("Kết quả đã được xử lý thành công.");
        })
        .catch(err => {
            console.error("Lỗi trong quá trình xử lý kết quả:", err);
        });

    function addNewResult(overall, name, birthDate, img) {
        return db.collection("resultsExam").add({
            name: name,
            birthDate: birthDate,
            overall: overall,
            imgUrl: img,
            timestamp: new Date()
        });
    }
}


function dataCurrent(){
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;


    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);

    const date = `${day}/${month}/${year}`;


    console.log(`${time} - ${date}`);
    return time + " - " + date;
}





//audio


setTimeout(() =>{
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playPauseBtn = document.getElementById('volume');
    const seekBar = document.getElementById('seek');

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML =`
              <img src="../assets/pause.svg" width="24px" alt="icon">
            `;

        } else {
            audio.pause();
            //
            playPauseBtn.innerHTML =`
              <img src="../assets/button-icon.svg" width="30px" alt="icon">
            `;

        }
    });

    audio.addEventListener('loadedmetadata', () => {
        seekBar.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });
}, 2000)