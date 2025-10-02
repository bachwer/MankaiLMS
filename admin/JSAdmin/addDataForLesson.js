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


let codeToAddQes;
let codeForType4andFlash
let TNIndex = 0;
let NDIndex = 0;
let DVOCIndex = 0;
let audioIndex = 0;
let wordIndex = 0;
let wordIndexFlash = 0
let allQuestionTN = [];
let allQuestionND = [];
let allQuestionDVOC = [];
let allQuestionGC =[];
let allQuestionTL = "";
let limitAllQuestionGC;
let allWordFlash = [];
let audioQuestion = [];

let ID = localStorage.getItem('ID');
let index = parseInt(localStorage.getItem('index'));

let data;
getDataCourses();
function getDataCourses(){
    const dataCourses = [];
    db.collection("courses").doc(`${ID}`).get()
        .then((doc) => {
            if (doc.exists) {
                dataCourses.push({ id: doc.id, ...doc.data() });
                console.log("True");
                console.log(dataCourses);
                data = dataCourses;
                checkAllSubCollection(dataCourses[0].Lesson);

            } else {
                console.log("Document does not exist");
            }
        })
        .catch((error) => {
            console.log("false", error);
        });

}















let addVideo = document.getElementById("addVideo");
let addBook = document.getElementById("addBook");
let addTest = document.getElementById("addTest");

addTest.addEventListener("click", (e) => {
    let questionPopup = document.getElementById("questionPopup");
    questionPopup.style.display = "block";
    overlay.style.display = "block";
    checkTestSaveTemporary()




})

addVideo.addEventListener("click", function(e) {
    let modelVideo = document.getElementById("modelVideo");
    modelVideo.style.display = "block";
    overlay.style.display = "block";

})

addBook.addEventListener("click", function() {
    let modelDocument = document.getElementById("modelDocument");
    modelDocument.style.display = "flex";
    overlay.style.display = "block";

    document.getElementById("lessonName").value =  data[0].Lesson[index].document.title || "";
    document.getElementById("targetLesson").value = data[0].Lesson[index].document.targetLesson || "";
    document.getElementById("descriptionLesson").value = data[0].Lesson[index].document.description || "";
    document.getElementById("lessonContent").innerHTML = data[0].Lesson[index].document.lessonContent || "";


})


let overlay = document.getElementById("overlay");
overlay.addEventListener("click", function() {
    close()
})



let saveLessonBtn = document.getElementById("saveLessonBtn");
saveLessonBtn.addEventListener("click", async (e) => {
    let lessonName = document.getElementById("lessonName").value;
    let targetLesson = document.getElementById("lessonName").value;
    let descriptionLesson = document.getElementById("descriptionLesson").value;
    let lessonContent = document.getElementById("lessonContent").innerHTML;

    if (!lessonName || !targetLesson || !descriptionLesson || !lessonContent) {
        console.log("False");
    }

    try {
        const docRef = db.collection("courses").doc(ID);
        const docSnap = await docRef.get();
        const data = docSnap.data();
        const Lesson = data.Lesson;
        const position = Object.keys(Lesson);

        Lesson[position[index]].document = {
            title:lessonName,
            description:descriptionLesson,
            targetLesson:targetLesson,
            lessonContent:lessonContent
        }

        await docRef.set({
                Lesson:Lesson,
            }, { merge: true }
        )
        getDataCourses();
        console.log("Lesson successfully added");
        close();
    } catch {
        console.log("False");
    }


    // console.log(lessonName);
    // console.log(targetLesson);
    // console.log(descriptionLesson);
    // console.log(lessonContent);


})






//add Video
let addVideoBtn = document.getElementById("addVideoBtn");
addVideoBtn.addEventListener("click", async (e) => {
    let videoUrl = document.getElementById("videoUrl").value;
    let videoTitle = document.getElementById("videoTitle").value;
    let description = document.getElementById("videoDescription").innerHTML;

    if(!videoUrl || !videoTitle || !description){
       console.log("Error");
       return;
    }
      const idVideo = getIdYoutube(videoUrl);


    console.log(videoTitle);
    try {
        const docRef = db.collection("courses").doc(ID);
        const docSnap = await docRef.get();
        const data = docSnap.data();
        const Lesson = data.Lesson;
        const position  = Object.keys(Lesson);



        Lesson[position[index]].video = {
            idVideo: idVideo,
            videoTitle: videoTitle,
            description: description,
        };
        await docRef.set({
            Lesson:Lesson,}, { merge: true }
        )
        close();
        console.log("Lesson successfully added");
        getDataCourses();
    } catch {
        console.log("False");
    }
})

function getIdYoutube(videoUrl){
    const id = videoUrl.split("=");
    return id[1];
}






function checkAllSubCollection(dataLesson){

    const keyVideo    = Object.keys(dataLesson[index]?.video    || {}).length;
    const keyDocument = Object.keys(dataLesson[index]?.document || {}).length;
    const keyTest     = Object.keys(dataLesson[index]?.Test     || {}).length;
    const keyPDF      = Object.keys(dataLesson[index]?.PDF      || {}).length;
    const keyFlash    = Object.keys(dataLesson[index]?.Flash    || {}).length;
    const keyAudio = Object.keys(dataLesson[index]?.Audio || {}).length;



    if(keyVideo > 0){
        let addVideo = document.getElementById("addVideo");
        addVideo.style.backgroundColor = "#cde4a8"
        addVideo.style.border = "5px solid rgb(139 182 70)"

        document.getElementById("videoUrl").value = "https://www.youtube.com/watch?v=" + dataLesson[index].video.idVideo;
        document.getElementById("videoTitle").value = dataLesson[index].video.videoTitle;
        document.getElementById("videoDescription").innerHTML = dataLesson[index].video.description;
    }
    if(keyDocument > 0){
        let addBook = document.getElementById("addBook");
        addBook.style.backgroundColor = "#cde4a8"
        addBook.style.border = "5px solid rgb(139 182 70)"

        document.getElementById("lessonContentType5").innerHTML = allQuestionTL;
    }
    if(keyTest > 0) {
        let addTest = document.getElementById("addTest");
        addTest.style.backgroundColor = "#cde4a8"
        addTest.style.border = "5px solid rgb(139 182 70)"

        allQuestionTN = dataLesson[index].Test.allQuestionTN;
        allQuestionND = dataLesson[index].Test.allQuestionND;
        allQuestionDVOC = dataLesson[index].Test.allQuestionDVOC;
        allQuestionGC = dataLesson[index].Test.allQuestionGC;
        allQuestionTL = dataLesson[index].Test.allQuestionTL;

        TNIndex = dataLesson[index].Test.allQuestionTN.length;
        NDIndex = dataLesson[index].Test.allQuestionND.length;
        DVOCIndex = dataLesson[index].Test.allQuestionDVOC.length;
        wordIndex = dataLesson[index].Test.allQuestionGC.length;

        document.getElementById("lessonContentType5").innerHTML = dataLesson[index].Test.allQuestionTL
        ;

    }
    if(keyPDF > 0) {
        let PDF = document.getElementById("PDF");
        PDF.style.backgroundColor = "#cde4a8"
        PDF.style.border = "5px solid rgb(139 182 70)"

        document.getElementById("urlPDF").value = dataLesson[index].PDF.linkPDf;
        document.getElementById("PDFDescription").innerHTML = dataLesson[index].PDF.description;



    }
    if(keyFlash > 0){
        let flashCard = document.getElementById("flashCard");
        flashCard.style.backgroundColor = "#cde4a8"
        flashCard.style.border = "5px solid rgb(139 182 70)"

        allWordFlash = dataLesson[index].Flash.allWordFlash;
        wordIndexFlash  = dataLesson[index].Flash.allWordFlash.length;


        //
    }
    if(keyAudio > 0 ){
        let addAudio = document.getElementById("addAudio");
        addAudio.style.backgroundColor = "#cde4a8"
        addAudio.style.border = "5px solid rgb(139 182 70)"
        audioQuestion = dataLesson[index].Audio.audioArr;
        audioIndex = dataLesson[index].Audio.audioArr.length;

    }







        checkTestSaveTemporary();



}



let btnDel = document.getElementById("btnDel");
btnDel.addEventListener("click", async () => {
    try {
        const docRef = db.collection("courses").doc(ID);
        const docSnap = await docRef.get();
        const data = docSnap.data();
        const Lesson = data.Lesson;

        Lesson.splice(index, 1);


        await docRef.update({
            Lesson:Lesson,
        });
        window.location.href ="../HTMLAdmin/lesson.html";
    }
    catch{
        console.log("Error");
    }
})


function close(){
    let overlay = document.getElementById("overlay");
    let modelVideo = document.getElementById("modelVideo");
    let modelDocument = document.getElementById("modelDocument");
    let questionPopup = document.getElementById("questionPopup");
    let popupContainer = document.getElementById("popupContainer");
    let QuestionType4 = document.getElementById("QuestionType4");
    let modelPDF = document.getElementById("modelPDF");
    modelPDF.style.display="none";
    QuestionType4.style.display = "none";
    popupContainer.style.display = "none";
    questionPopup.style.display = "none";
    modelDocument.style.display = "none";
    modelVideo.style.display = "none";
    overlay.style.display = "none";
}



const buttons = document.querySelectorAll(".lesson-tool-btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const command = button.dataset.command;
        const value = button.dataset.value || null;
        document.execCommand(command, false, value);
    });
});

    const questionTypeItems = document.querySelectorAll('.question-type-item');
    const selectBtn = document.getElementById('selectBtn');
    const cancelBtn = document.getElementById('cancelBtnTEST');
    const notification = document.getElementById('notification');
    const selectedTypeSpan = document.getElementById('selectedType');

    // Tên hiển thị cho các loại câu hỏi
    const questionTypeNames = {
        'multiple-choice': 'TN', //trac nghiem
        'true-false': 'ND', //Nghe doc
        'short-answer': 'DVOC',// Chon tu dung
        'matching': 'GC', // ghep cau
        'fill-blank': 'TL'//tu luan
    };


    let selectedItem = null;

    // Chọn loại câu hỏi
    questionTypeItems.forEach(item => {
    item.addEventListener('click', function() {
        questionTypeItems.forEach(i => i.classList.remove('selected'));
        this.classList.add('selected');
        selectedItem = this;
        selectBtn.disabled = false;
    });
});





selectBtn.addEventListener('click', function() {
    codeToAddQes = "";
    if (selectedItem) {
        const questionType = selectedItem.getAttribute('data-type');
        const questionTypeName = questionTypeNames[questionType];
        //number qes for each type


        console.log(questionTypeName);
       document.getElementById("questionList").innerHTML = "";
        let titleADDQes =  document.getElementById("titleADDQes");


        if (questionTypeName === "TN" || questionTypeName === "ND" || questionTypeName === "DVOC") {
            let popupContainer = document.getElementById("popupContainer");
            popupContainer.style.display = "block";

            if (questionTypeName === "TN") {
                console.log(questionTypeName);
                document.getElementById("questionList").innerHTML = "";
                titleADDQes.textContent = "Thêm câu hỏi Trắc Nghiệm"
                addQuestion(0, TNIndex, allQuestionTN);
            } else if (questionTypeName === "ND") {
                console.log(questionTypeName);
                titleADDQes.textContent = "Thêm câu hỏi Nghe Đọc"
                addQuestion(0, NDIndex, allQuestionND);

            } else if (questionTypeName === "DVOC") {
                console.log(questionTypeName);
                titleADDQes.textContent = "Thêm câu hỏi Chọn từ đúng"
                addQuestion(0, DVOCIndex, allQuestionDVOC);
            }



            codeToAddQes = questionTypeName;
        }else if(questionTypeName === "GC") {
            let QuestionType4 = document.getElementById("QuestionType4");
            QuestionType4.style.display = "block";
            let Question4Content = document.getElementById("Question4Content");
            Question4Content.innerHTML = "";
            document.getElementById("titleType4").textContent = "Điền cặp từ đúng để ghép thành câu";
            document.getElementById("titleType41").textContent = "Giới hạn 10 cặp từ";
            limitAllQuestionGC = 10;
            codeForType4andFlash = "TYPE4"
            addWord(0, wordIndex, allQuestionGC);
        }else if(questionTypeName === "TL"){
            let lessonSection = document.getElementById("lessonSection");
            lessonSection.style.display="block";

        }

    }
});



    let cancelBtnAddQue = document.getElementById("cancelBtnAddQue");
cancelBtnAddQue.addEventListener("click", async () => {
    let popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
})
let submitBtn = document.getElementById("submitBtn");



submitBtn.addEventListener("click", async () => {
    const arrQuestion = collectQuestions();
    if (arrQuestion.length === 0) {
        console.log("Error");

    } else {

        if (codeToAddQes === "TN") {
            allQuestionTN = arrQuestion
            TNIndex = allQuestionTN.length;


        } else if (codeToAddQes === "ND") {
            allQuestionND = arrQuestion;
            NDIndex = allQuestionND.length;

            console.log(allQuestionND);
        } else if (codeToAddQes === "DVOC") {
            allQuestionDVOC = arrQuestion;
            DVOCIndex = allQuestionDVOC.length;

        }

        if (arrQuestion.length !== 0) {
            let popupContainer = document.getElementById("popupContainer");
            popupContainer.style.display = "none";
        }
        checkTestSaveTemporary()
    }


    if (codeToAddQes === "TN") {
        TNIndex = allQuestionTN.length;
        console.log(TNIndex);
    } else if (codeToAddQes === "ND") {
        NDIndex = allQuestionND.length;

    } else if (codeToAddQes === "DVOC") {
        DVOCIndex = allQuestionDVOC.length;

    }

})



function checkTestSaveTemporary(){
    let testType1 = document.getElementById("testType1");
    let testType2 = document.getElementById("testType2");
    let testType3 = document.getElementById("testType3");
    let testType4 = document.getElementById("testType4");
    let testType5 = document.getElementById("testType5");


    if(allQuestionTN.length > 0){
        testType1.classList.add("true");
  }else{
        testType1.classList.remove("true");
    }
  if(allQuestionND.length > 0){
      testType2.classList.add("true");
  }else{
      testType2.classList.remove("true");
  }

  if(allQuestionDVOC.length > 0){
      testType3.classList.add("true");

  }else{
      testType3.classList.remove("true");
  }

  if(allQuestionGC.length > 0){
      testType4.classList.add("true");
  }else{
      testType4.classList.remove("true");
  }
  if(allQuestionTL.length > 0){
      testType5.classList.add("true");
  }else{
      testType5.classList.remove("true");
  }

}





// let titleADDQes= document.getElementById("titleADDQes")

//add more Question
const addQuestionBtn = document.getElementById("addQuestionBtn");
addQuestionBtn.addEventListener("click", function(){
    if(codeToAddQes === "TN"){
        TNIndex++;
        setTimeout(() => addQuestion(TNIndex - 1,TNIndex, allQuestionTN), 400);
        console.log(TNIndex);
    }else if(codeToAddQes === "ND"){
        NDIndex++;
        setTimeout(() =>  addQuestion(NDIndex - 1,NDIndex, allQuestionND), 400);
    }else if(codeToAddQes === "DVOC"){
        DVOCIndex++;
        setTimeout(() =>  addQuestion(DVOCIndex - 1, DVOCIndex, allQuestionDVOC), 400);
    }else if(codeToAddQes === "AUDIO"){
        audioIndex++;
        setTimeout(() =>  addQuestion(audioIndex - 1, audioIndex, audioQuestion), 400);
    }

})


function addQuestion(currentNum, questionIndex , arr) {
     console.log(arr);
    console.log(currentNum);
    console.log(questionIndex);
    console.log(arr[0]?.question ?? '');
    if(currentNum < 0){
        currentNum = 0;
    }
   for(let i = currentNum; i < questionIndex; i++){
       const questionItem = document.createElement("div");
       questionItem.classList.add("question-item");
       const questionHTML = `
  <div class="question-item" data-index="${questionIndex}">
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


function collectQuestions() {
    let questions = [];
    const questionItems = document.querySelectorAll(".question-item");

    for (const item of questionItems) {
        const questionText = item.querySelector(".question-input").value.trim();
        const answerInputs = item.querySelectorAll(".answers input[type='text']");
        const radioName = item.querySelector("input[type='radio']").name;
        const selected = item.querySelector(`input[type="radio"][name="${radioName}"]:checked`);
        const answers = Array.from(answerInputs).map(input => input.value.trim());

        // Kiểm tra nếu chưa chọn đáp án
        if (!selected) {

            return [];
        }

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

    return questions;
}







let cancelBtnAddQue2 = document.getElementById("cancelBtnAddQue2");
cancelBtnAddQue2.addEventListener("click", (e) => {
    let QuestionType4 = document.getElementById("QuestionType4");

    QuestionType4.style.display = "none";
})







//limit world + adđd




let addQuestionBtn2 = document.getElementById("addQuestionBtn2");
addQuestionBtn2.addEventListener("click", (e) => {
    let index;
    if(codeForType4andFlash === "TYPE4"){
        index = wordIndex;
    }else{
        index = wordIndexFlash;
    }

    if(index > limitAllQuestionGC - 1){
        addQuestionBtn2.disabled =true;
    }else{
        if(codeForType4andFlash === "TYPE4"){
            wordIndex++;
            addWord(wordIndex - 1, wordIndex, allQuestionGC);
        }else{
            wordIndexFlash++;
            addWord(wordIndexFlash - 1, wordIndexFlash, allWordFlash);
        }
    }
})


function addWord(currentWord, n, arr) {
    let placeHol1 ;
    let placeHol2 ;
    if(codeForType4andFlash === "TYPE4"){
         placeHol1  = "Từ 1"
         placeHol2  = "Từ 2"
    }else{
         placeHol1  = "TỪ Vựng"
         placeHol2  = "Dich Nghĩa"
    }

    let Question4Content = document.getElementById("Question4Content");
    if (currentWord < 0) {
        currentWord = 0;
    }
    for (let i = currentWord; i < n; i++) {
        const div = document.createElement("div");

        div.classList.add("questionType4");

        div.innerHTML = `
            <h3>${i + 1}</h3>
            <input type="text" class="word1" placeholder="${placeHol1}" value="${arr[i]?.word1 ?? ''}">
            <input type="text" class="word2" placeholder="${placeHol2}" value="${arr[i]?.word2 ?? ''}">
            <img class="delete" data-index="${i}" src="../img/x-solid.svg" style="width: 20px; height: 18px;" alt="icon">
        `;

        Question4Content.appendChild(div);
    }
}



document.addEventListener("click", (e) => {
    if (e.target.closest(".delete")) {
        const btn = e.target.closest(".delete");
        const itemToRemove = btn.closest(".questionType4");

        if (itemToRemove) {
            itemToRemove.remove();


            if(codeForType4andFlash === "TYPE4"){
                wordIndex--;
            }else{
                wordIndexFlash--;
            }
        }


        const allItems = document.querySelectorAll("#Question4Content .questionType4");

        allItems.forEach((item, newIndex) => {
            const h3 = item.querySelector("h3");
            if (h3) h3.textContent = newIndex + 1;

            const delBtn = item.querySelector(".delete");
            if (delBtn) delBtn.dataset.index = newIndex;
        });
    }
});

let submitBtn2 = document.getElementById("submitBtn2");

submitBtn2.addEventListener("click", async (e) => {
    let Question4Content = document.getElementById("QuestionType4");

    if (codeForType4andFlash === "FLASH") {
        const word = saveQuestionGC()
        if (word.length !== 0) {
            console.log("FLASH");

            try {
                const docRef = db.collection("courses").doc(ID);
                const docSnap = await docRef.get();
                const data = docSnap.data();
                const Lesson = data.Lesson;
                const position = Object.keys(Lesson);


                Lesson[position[index]].Flash = {

                    allWordFlash: word,
                }
                ;
                await docRef.set({
                        Lesson: Lesson,
                    }, {merge: true}
                )
                close();
                console.log("Lesson successfully added");
                console.log(word);
                getDataCourses();

            } catch {
                console.log("False");
            }


            Question4Content.style.display = "none";


        }
    } else {
        const word = saveQuestionGC()
        if (word.length === 10) {
            allQuestionGC = word;
            console.log(allQuestionGC);
            Question4Content.style.display = "none";
            checkTestSaveTemporary();
            console.log("TYPE4");
        }
    }


})



function saveQuestionGC(){
    const word = [];
    let questionItems = document.querySelectorAll("#Question4Content .questionType4");

    for(const item of questionItems){
        const word1= item.querySelector(".word1").value.trim();
        const word2= item.querySelector(".word2").value.trim();

        if(word1 !== "" && word2 !== "") {
            word.push({
                answer: word1 +" " + word2,
                word1: word1,
                word2: word2,
            });
        }else{
            return [];
        }

    }


    return word;
}

let cancelBtnType5 = document.getElementById("cancelBtnType5");

cancelBtnType5.addEventListener("click", (e) => {
    let lessonSection = document.getElementById("lessonSection");
    lessonSection.style.display="none";
})
let submitBtnType5 = document.getElementById("submitBtnType5");
submitBtnType5.addEventListener("click", (e) => {
    allQuestionTL = document.getElementById("lessonContentType5").innerHTML;
    if(allQuestionTL.length === 0){
        console.log("error");
    }else{
        console.log(allQuestionTL);
        let lessonSection = document.getElementById("lessonSection");
        lessonSection.style.display="none";
        checkTestSaveTemporary();
    }
})





let saveALL = document.getElementById("saveALL");
saveALL.addEventListener("click", async (e) => {
    console.log("save");
    console.log(allQuestionTN);
    console.log(allQuestionND);
    console.log(allQuestionDVOC)
    console.log(allQuestionGC);
    console.log(allQuestionTL);


   if( allQuestionTN.length === 0 &&
       allQuestionND.length === 0 &&
       allQuestionDVOC.length === 0 &&
       allQuestionGC.length === 0&&
       allQuestionTL.length === 0){
       console.log("error");
   }else{

       try {
           const docRef = db.collection("courses").doc(ID);
           const docSnap = await docRef.get();
           const data = docSnap.data();
           const Lesson = data.Lesson;
           const position = Object.keys(Lesson);


           Lesson[position[index]].Test = {
               allQuestionTN:allQuestionTN,
               allQuestionND:allQuestionND,
               allQuestionDVOC:allQuestionDVOC,
               allQuestionGC:allQuestionGC,
               allQuestionTL:allQuestionTL,
       }
           ;
           await docRef.set({
                   Lesson: Lesson,
               }, {merge: true}
           )
           close();
           getDataCourses();
           console.log("Lesson successfully added");

       } catch {
           console.log("False");
       }
   }

    getDataCourses()

})







let cancelBtnPDF = document.getElementById("cancelBtnPDF");
cancelBtnPDF.addEventListener("click", (e) => {
    close();
})

let PDF = document.getElementById("PDF");
PDF.addEventListener("click", (e) => {
    let modelPDF = document.getElementById("modelPDF");
    modelPDF.style.display="block";
    overlay.style.display="block";
})



let submitBtnPDF = document.getElementById("submitBtnPDF");
submitBtnPDF.addEventListener("click", async (e) => {
    let urlPDF = document.getElementById("urlPDF").value;
    let content = document.getElementById("PDFDescription").innerHTML;


    if (urlPDF.length === 0 || content.length === 0) {
        console.log("error");
    } else {
        console.log(urlPDF);

        try {
            const docRef = db.collection("courses").doc(ID);
            const docSnap = await docRef.get();
            const data = docSnap.data();
            const Lesson = data.Lesson;
            const position = Object.keys(Lesson);


            Lesson[position[index]].PDF = {
                linkPDf: urlPDF,
                description: content,
            };
            await docRef.set({
                    Lesson: Lesson,
                }, {merge: true}
            )
            close();
            console.log("Lesson successfully added");
            getDataCourses();
        } catch {
            console.log("False");
        }
    }
    getDataCourses()

})



let flashCard = document.getElementById("flashCard");
flashCard.addEventListener("click", (e) => {
    let QuestionType4 = document.getElementById("QuestionType4");
    document.getElementById("titleType4").textContent = "Thêm từ vào flash Card";
    document.getElementById("titleType41").textContent = "Giới hạn 30 cặp từ";
    limitAllQuestionGC = 30;
    codeForType4andFlash = "FLASH"

    QuestionType4.style.display = "block";
    let Question4Content = document.getElementById("Question4Content");
    Question4Content.innerHTML = "";
    addWord(0, wordIndexFlash, allWordFlash);


})


let addAudio = document.getElementById("addAudio");

addAudio.addEventListener("click", (e) => {
    let questionList = document.getElementById("questionList1");
    let popupContainer = document.getElementById("popupContainer1");
    popupContainer.style.display = "block";
    questionList.innerHTML = "";
    codeToAddQes = "AUDIO";

    document.getElementById("titleADDQes").innerText = 'Thêm câu hỏi Nghe Đọc';
    addQuestion(0, audioIndex, audioQuestion);
    addQuestionAudio(0, audioIndex, audioQuestion);
    console.log(audioQuestion);

})




let cancelBtnAddQue1 = document.getElementById("cancelBtnAddQue1");
cancelBtnAddQue1.addEventListener("click", async () => {
    let popupContainer = document.getElementById("popupContainer1");
    popupContainer.style.display = "none";
})

function addQuestionAudio(currentNum, questionIndex , arr) {

    if(currentNum < 0){
        currentNum = 0;
    }
    for(let i = currentNum; i < questionIndex; i++){
        const questionItem = document.createElement("div");
        questionItem.classList.add("question-item");
        const questionHTML = `
  <div class="question-item" data-index="${questionIndex}">
    <label>Câu ${i + 1}</label>
    <input type="text" class="question-input" placeholder="Nhập câu hỏi..." value="${arr[i]?.question ?? ''}">

    <div class="answers">
     <input class="answer-input" type="text" placeholder="Cụm từ đúng.." value="${arr[i]?.answers[0] ?? ''}">
    </div>
  </div> 
`;
        // value="3"
        document.getElementById("questionList1").insertAdjacentHTML("beforeend", questionHTML);
    }
}


let addQuestionBtn1 = document.getElementById("addQuestionBtn1");

addQuestionBtn1.addEventListener("click", (e) => {

    audioIndex++;
    addQuestionAudio(audioIndex - 1, audioIndex, audioQuestion);


})

function collectQuestions1() {
    let questions = [];
    const questionItems = document.querySelectorAll(".question-item");

    for (const item of questionItems) {
        const questionText = item.querySelector(".question-input").value.trim();
        const answers = item.querySelector(".answer-input").value.trim();

        if (questionText !== "" && answers !== "") {
            questions.push({
                question: questionText,
                answers: answers,
            });
        } else {
            return [];
        }
    }

    return questions;
}

let submitBtn1 = document.getElementById("submitBtn1");
submitBtn1.addEventListener("click", async (e) => {

    const arr = collectQuestions1();
    if (arr.length === 0) {

    } else {
        audioQuestion = arr;
        let popupContainer = document.getElementById("popupContainer1");
        popupContainer.style.display = "none";
        console.log(audioQuestion);


        audioIndex = audioQuestion.length;

        try {
            const docRef = db.collection("courses").doc(ID);
            const docSnap = await docRef.get();
            const data = docSnap.data();
            const Lesson = data.Lesson;
            const position = Object.keys(Lesson);


            Lesson[position[index]].Audio = {
                audioArr: audioQuestion,
            };
            await docRef.set({
                    Lesson: Lesson,
                }, {merge: true}
            )
            close();
            console.log("Lesson successfully added");
            getDataCourses()
        } catch {
            console.log("False");
        }
    }

    audioIndex = audioQuestion.length;




})




