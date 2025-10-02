const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
    const li = item.parentElement;

    item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
            i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});



// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
    "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
    "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

if (window.innerWidth < 768) {
    sidebar.classList.add("hide");
}
//
// window.addEventListener("resize", function () {
//   if (this.innerWidth > 576) {
//     searchButtonIcon.classList.replace("bx-x", "bx-search");
//     searchForm.classList.remove("show");
//   }
// });

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
});

let index = parseInt(localStorage.getItem('index'));
let ID = localStorage.getItem('ID');


let indexVocabulary = 0;
let indexGrammar = 0;
let indexListening = 0;
let arrVocabulary = [];
let arrGrammar = [];
let arrListening = [];
let codeTest = ""

getDataCourses();
let data;
function getDataCourses(){
    const dataExam = [];
    db.collection("Exam").doc(`${ID}`).get()
        .then((doc) => {
            if (doc.exists) {
                dataExam.push({ id: doc.id, ...doc.data() });
                console.log("True");
                console.log(dataExam);
                data = dataExam;
                checkAddTested(dataExam[0].exam)

            } else {
                console.log("Document does not exist");
            }
        })
        .catch((error) => {
            console.log("false", error);
        });

}



let overlay = document.getElementById("overlay");
overlay.addEventListener("click", function () {
    close();
})

function close(){
    let popupContainer = document.getElementById("popupContainer");
    overlay.style.display = "none";
    popupContainer.style.display = "none";
}







function addQuestion(currentNum, questionIndex , arr) {
    console.log(arr);
    console.log(currentNum);
    console.log(questionIndex);
    console.log(arr[0]?.question ?? '');
    if(currentNum < 0){
        currentNum = 0;
    }
    for(let i = currentNum; i < questionIndex; i++){
        const audioAdd = document.createElement("div");
        if(codeTest === "LS" && currentNum === 0){
            audioAdd.innerHTML =   `
            <label>Add link audio<br>
            <input type="text" class="audioLink-input" placeholder="..." value="${arr[i]?.audioLink || ""}">
             <br>
            </label>
            `
        }else{
            audioAdd.innerHTML =   ``;
        }



        const questionItem = document.createElement("div");
        questionItem.classList.add("question-item");
        const questionHTML = `
  <div class="question-item" data-index="${questionIndex}">
    ${audioAdd.innerHTML}
    
    <label>Câu ${i + 1}</label>
    <input type="text" class="question-input" placeholder="Nhập câu hỏi..." value="${arr[i]?.question ?? ''}">

    <div class="answers">
      <label><input type="radio" name="answer-${i}" value="0" ${arr[i]?.correct === 0 ? 'checked' : ''}> <input type="text" placeholder="Đáp án A" value="${arr[i]?.answers[0] ?? ''}"></label>
      <label><input type="radio" name="answer-${i}" value="1" ${arr[i]?.correct === 1 ? 'checked' : ''}> <input type="text" placeholder="Đáp án B" value="${arr[i]?.answers[1] ?? ''}"></label>
      <label><input type="radio" name="answer-${i}" value="2" ${arr[i]?.correct === 2 ? 'checked' : ''}> <input type="text" placeholder="Đáp án C" value="${arr[i]?.answers[2] ?? ''}"></label>
      <label><input type="radio" name="answer-${i}" value="3" ${arr[i]?.correct === 3 ? 'checked' : ''}> <input type="text" placeholder="Đáp án D" value="${arr[i]?.answers[3] ?? ''}"></label>
    </div>
  </div> 
`;
        // value="3"
        document.getElementById("questionList").insertAdjacentHTML("beforeend", questionHTML);
    }
}


let cancelBtnAddQue = document.getElementById("cancelBtnAddQue");
cancelBtnAddQue.addEventListener("click", (e) => {
    close();
})




// add test vocabulary
let vocabulary = document.getElementById("vocabulary");
vocabulary.addEventListener("click", function () {
    let popupContainer = document.getElementById("popupContainer");
    let questionList = document.getElementById("questionList");
    let titleADDQes = document.getElementById("titleADDQes");
    titleADDQes.innerText = "Thêm câu Từ Vựng"
    overlay.style.display = "block";

    questionList.innerHTML = "";
    popupContainer.style.display = "block";
    codeTest = "VC"
    addQuestion(0,indexVocabulary, arrVocabulary);
})

//add test Grammar

let grammar = document.getElementById("grammar");
grammar.addEventListener("click", (e) => {
    let popupContainer = document.getElementById("popupContainer");
    let questionList = document.getElementById("questionList");
    let titleADDQes = document.getElementById("titleADDQes");
    titleADDQes.innerText = "Thêm câu ngữ pháp"
    overlay.style.display = "block";
    questionList.innerHTML = "";
    popupContainer.style.display = "block";

    codeTest = "GM"
    addQuestion(0,indexGrammar, arrGrammar);
})

let listening = document.getElementById("listening");
listening.addEventListener("click", (e) => {
    let popupContainer = document.getElementById("popupContainer");
    let questionList = document.getElementById("questionList");
    let titleADDQes = document.getElementById("titleADDQes");
    titleADDQes.innerText = "Thêm câu hỏi nghe"
    overlay.style.display = "block";
    questionList.innerHTML = "";
    popupContainer.style.display = "block";

    codeTest = "LS"
    addQuestion(0,indexListening, arrListening);

})

//
// grammar
// listening



//add ques
let addQuestionBtn = document.getElementById("addQuestionBtn");
addQuestionBtn.addEventListener("click", (e) => {

    if(codeTest === "VC"){
        indexVocabulary++;
        addQuestion(indexVocabulary - 1,indexVocabulary, arrVocabulary);
    }else if(codeTest === "GM") {
        indexGrammar++;
        addQuestion(indexGrammar - 1,indexGrammar, arrGrammar);
    }else{
        indexListening++;
        addQuestion(indexListening - 1,indexListening, arrListening);
    }


})



let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", async (e) => {

    let arrTest = [];

    arrTest = saveQuesToArr()
    if (arrTest.length === 0) {

    } else {

        if (codeTest === "VC") {
            arrVocabulary = arrTest;
            console.log(arrVocabulary);
            await saveTestToFireBase(arrVocabulary, "test1");
        } else if (codeTest === "GM") {
            arrGrammar = arrTest;
            console.log(arrGrammar)
            await saveTestToFireBase(arrGrammar, "test2");
        } else {
            arrListening = arrTest;
            console.log(arrListening)
            await saveTestToFireBase(arrListening, "test3");
        }

        indexVocabulary = arrVocabulary.length;
        indexGrammar = arrGrammar.length;
        indexListening = arrListening.length;
        close();
        await getDataCourses()
    }
})



function saveQuesToArr() {
    let questions = [];
    const questionItems = document.querySelectorAll(".question-item");

    for (const item of questionItems) {
        const linkAudio =  item.querySelector(".audioLink-input")?.value.trim() ?? "";
        const questionText = item.querySelector(".question-input").value.trim();
        const answerInputs = item.querySelectorAll(".answers input[type='text']");
        const radioName = item.querySelector("input[type='radio']").name;
        const selected = item.querySelector(`input[type="radio"][name="${radioName}"]:checked`);
        const answers = Array.from(answerInputs).map(input => input.value.trim());

        // Kiểm tra nếu chưa chọn đáp án
        if (!selected) {
            return [];
        }
        if(codeTest === "LS"){
            if(!linkAudio){
                return [];
            }else{
                const correctIndex = parseInt(selected.value);
                // Kiểm tra câu hỏi và các đáp án không được rỗng
                if (questionText && answers.every(a => a !== "")) {
                    questions.push({
                        audioLink: linkAudio,
                        question: questionText,
                        answers: answers,
                        correct: correctIndex
                    });
                } else {
                    return [];
                }

            }
        }else{
            const correctIndex = parseInt(selected.value);
            // Kiểm tra câu hỏi và các đáp án không được rỗng
            if (questionText && answers.every(a => a !== "")) {
                questions.push({
                    question: questionText,
                    answers: answers,
                    correct: correctIndex
                });
            } else {
                return [];
            }
        }





    }

    return questions;
}


async function saveTestToFireBase(arr, keySave) {
    const docRef = db.collection("Exam").doc(ID);
    const dosSnap = await docRef.get();
    let data = dosSnap.data();
    const exam = data.exam;
    const position = Object.keys(exam);


    exam[position[index]][keySave] = {
        dataQues:  arr,
    };
    await docRef.set({ exam: exam},{ merge: true });
    close();


}

// let indexVocabulary = 0;
// let indexGrammar = 0;
// let indexListening = 0;
// let arrVocabulary = [];
// let arrGrammar = [];
// let arrListening = [];


function checkAddTested(dataExam){

    let checkVocabulary = Object.keys((dataExam[index]?.test1?.dataQues) || {}).length;
    let checkGrammar  = Object.keys((dataExam[index]?.test2?.dataQues) || {}).length;
    let checkListening = Object.keys((dataExam[index]?.test3?.dataQues) || {}).length;
    if(checkVocabulary > 0){
        let vocabulary = document.getElementById("vocabulary");
        vocabulary.style.backgroundColor = "#cde4a8"
        vocabulary.style.border = "5px solid rgb(139 182 70)"
        arrVocabulary = dataExam[index].test1.dataQues;
        indexVocabulary = dataExam[index].test1.dataQues.length;
    }

    if(checkGrammar > 0){
        let grammar = document.getElementById("grammar");
        grammar.style.backgroundColor = "#cde4a8"
        grammar.style.border = "5px solid rgb(139 182 70)"
        indexGrammar = dataExam[index].test2.dataQues.length;
        arrGrammar = dataExam[index].test2.dataQues;
    }
    if(checkListening > 0){

        let listening = document.getElementById("listening");
        listening.style.backgroundColor = "#cde4a8"
        listening.style.border = "5px solid rgb(139 182 70)"
        indexListening = dataExam[index].test3.dataQues.length;
        arrListening = dataExam[index].test3.dataQues;
    }

    // vocabulary
    // grammar
    // listening
}


let btnDel = document.getElementById("btnDel");
btnDel.addEventListener("click", async () => {
    try {
        const docRef = db.collection("Exam").doc(ID);
        const docSnap = await docRef.get();
        const data = docSnap.data();
        const exam = data.exam;

        exam.splice(index, 1);


        await docRef.update({
            exam:exam,
        });
        window.location.href ="../HTMLAdmin/addQesInExam.html";
    }
    catch{
        console.log("Error");
    }
})
