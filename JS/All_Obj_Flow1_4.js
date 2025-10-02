// BÀI KIỂM TRA OBJ VIDEO (video.html)
// const descripObjVideo = document.getElementById("descripObjVideo");
// descripObjVideo.innerHTML = "<b>";
let ID = localStorage.getItem('IdCourse');
let index = localStorage.getItem('indexLesson');
let flashcards = [];
let cardsData1 = [];
let questions_Test1 = [];
let questions_Test2 = [];
let questions_Test3 = [];
let questions_Test4 = [];
let questions_Test5 = "";
let PDFLink = "";
let textContent = {}
let questionsAudio = [];
let numberQues;




function numberQuestion() {
  numberQues = 0
  if (questions_Test1.length !== 0) {
    numberQues++;
  }
  if (questions_Test2.length !== 0) {
    numberQues++;
  }
  if (questions_Test3.length !== 0) {
    numberQues++;
  }
  if (questions_Test4.length !== 0) {
    numberQues++;
  }
  if (questions_Test5.length !== 0) {
    numberQues++;
  }

}



getDataCourses();


console.log(ID);
let data;
function getDataCourses() {
  const dataCourses = [];
  db.collection("courses").doc(`${ID}`).get()
    .then((doc) => {
      if (doc.exists) {
        dataCourses.push({ id: doc.id, ...doc.data() });

        console.log(dataCourses);
        console.log(index)
        data = dataCourses;

        loadDataFlashcard(dataCourses)
        loadDataTest1(dataCourses)
        loadDataTest2(dataCourses)
        loadDataTest3(dataCourses)
        loadDataTest4(dataCourses)
        loadDataTest5(dataCourses)
        loadTextContent(dataCourses);
        loadAudio(dataCourses);
        loadF(dataCourses);
        loadPDF(dataCourses[0].Lesson[index].PDF);
        console.log(index)
        numberQuestion()


      } else {
        console.log("Document does not exist");
      }
    })
    .catch((error) => {
      console.log("false", error);
    });

}


function loadPDF(dataCourses) {

  PDFLink = dataCourses;
}


function loadDataFlashcard(dataCourses) {
  const flashcards = dataCourses[0].Lesson[index].Flash.allWordFlash;

  cardsData1 = [
    { text: flashcards[0].word1, id: 1 },
    { text: flashcards[0].word1, id: 1 },
    { text: flashcards[1].word1, id: 2 },
    { text: flashcards[1].word1, id: 2 },
    { text: flashcards[2].word1, id: 3 },
    { text: flashcards[2].word1, id: 3 },
    { text: flashcards[3].word1, id: 4 },
    { text: flashcards[3].word1, id: 4 },
    { text: flashcards[4].word1, id: 5 },
    { text: flashcards[4].word1, id: 5 },
    { text: flashcards[5].word1, id: 6 },
    { text: flashcards[5].word1, id: 6 }
  ];

}

function loadF(dataCourses) {
  for (let i = 0; i < dataCourses[0].Lesson[index].Flash.allWordFlash.length; i++) {
    const item = dataCourses[0].Lesson[index].Flash.allWordFlash[i];

    flashcards.push(
      { japanese: item.word1, meaning: item.word2 },
    );
  }
  console.log(flashcards);

}

function loadDataTest1(dataCourses) {



  for (let i = 0; i < dataCourses[0].Lesson[index].Test.allQuestionTN.length; i++) {
    const item = dataCourses[0].Lesson[index].Test.allQuestionTN[i];

    questions_Test1.push({
      content: item.question,
      options: item.answers,
      correct: item.answers[item.correct],
    });
  }

}

function loadDataTest2(dataCourses) {
  for (let i = 0; i < dataCourses[0].Lesson[index].Test.allQuestionTN.length; i++) {
    const item = dataCourses[0].Lesson[index].Test.allQuestionTN[i];

    questions_Test2.push({
      japanese: [item.question],
      options: item.answers,
      correct: item.answers[item.correct],
    });
  }

}

let score_Test2 = 0;



function loadDataTest3(dataCourses) {
  for (let i = 0; i < dataCourses[0].Lesson[index].Test.allQuestionDVOC.length; i++) {
    const item = dataCourses[0].Lesson[index].Test.allQuestionDVOC[i];

    questions_Test3.push({
      title: "Bài nghe - Đọc hiểu",
      content: [item.question],
      sections: [
        {
          question: [item.question],
          options: item.answers,
          correct: item.answers[item.correct],
        },
        {
          question: [item.question],
          options: item.answers,
          correct: item.answers[item.correct],
        },
      ]
    });
  }
}

function loadDataTest4(dataCourses) {

  for (let i = 0; i < dataCourses[0].Lesson[index].Test.allQuestionGC.length; i++) {
    const item = dataCourses[0].Lesson[index].Test.allQuestionGC[i];

    questions_Test4.push(
      { answer: item.answer, btn1: item.word1, btn2: item.word2 },
    );
  }

}
function loadDataTest5(dataCourses) {
  questions_Test5 = dataCourses[0].Lesson[index].Test.allQuestionTL;
}

function loadTextContent(dataCourses) {

  textContent = {
    lessonContent: dataCourses[0].Lesson[index].document.lessonContent,
    targetLesson: dataCourses[0].Lesson[index].document.targetLesson,
    title: dataCourses[0].Lesson[index].document.title,
    description: dataCourses[0].Lesson[index].document.description,
  }


}

function loadAudio(dataCourses) {
  for (let i = 0; i < dataCourses[0].Lesson[index].Audio.audioArr.length; i++) {
    const item = dataCourses[0].Lesson[index].Audio.audioArr[i];

    const arr = (item.question).split("_")
    questionsAudio.push(
      {
        text: arr[0] ? arr[0] : "",
        text1: arr[1] ? arr[1] : "",
        content: arr[2] ? arr[2] : "",
        content1: arr[3] ? arr[3] : "",
        answer: item.answers,

      },
    );
  }
  console.log(questionsAudio);
}


//  questionsAudio = [
//   {
//     text: `私はグエン・タイ・デュイです。`,
//     text1: `郵政通信技術大学の学生です 私は`,
//     content: `エン・タイ・デュはグエン・タイ・デュイです `,
//     content1: `私はグエン・タイ・デュイです`,
//     answer: "エン・タイ・デュはグエン・タイ・デュイです",
//   },
//   {
//     text: `これはペンです。`,
//     text1: `これは何ですか？`,
//     content: `これは `,
//     content1: `です`,
//     answer: "これは",
//   },
// ];















// AUDIO OBJ CÂU HỎI MẪU (Audio.html)

let scoreAudio = 0;
let answeredQuestionsAudio = 0;


// Quiz data - các câu hỏi và đáp án (checkvocanew.html)
// const quizData = [
//   {
//     question: "こんにちは",
//     answers: [
//       { text: "Xin chào", correct: true },
//       { text: "Tạm biệt", correct: false },
//       { text: "Cảm ơn", correct: false },
//       { text: "Xin lỗi", correct: false }
//     ],
//     explanation: "こんにちは (konnichiwa) là cách nói 'Xin chào' trong tiếng Nhật, thường được sử dụng vào buổi chiều."
//   },
//   {
//     question: "ありがとう",
//     answers: [
//       { text: "Xin chào", correct: false },
//       { text: "Tạm biệt", correct: false },
//       { text: "Cảm ơn", correct: true },
//       { text: "Xin lỗi", correct: false }
//     ],
//     explanation: "ありがとう (arigatou) có nghĩa là 'Cảm ơn' trong tiếng Nhật."
//   },
// ];
// explanation = từ nhật + "có nghĩa là" + "tiếng việt"
// làm 5 câu hỏi cố định
let score = 0;


//Flash card (flashCard.html)

//hoctum.html
// lấy của flashcard
// const cards = [
//   { id: 1, text: "私は" },
//   { id: 2, text: "たは" },
//   { id: 3, text: "学生" },
//   { id: 4, text: "先生" },
//   { id: 5, text: "日本" },
//   { id: 6, text: "社員" },
//   { id: 7, text: "高校" },
//   { id: 8, text: "医者" },
//   { id: 9, text: "です" },
//   { id: 10, text: "主婦" },
//   { id: 11, text: "んは" },
//   { id: 12, text: "山田" },
//   { id: 13, text: "留学" },
//   { id: 14, text: "国人" },
//   { id: 15, text: "中国" },
//   { id: 16, text: "ベト" },
//   { id: 17, text: "先生" },
//   { id: 18, text: "ゃあ" },
//   { id: 19, text: "日本" },
//   { id: 20, text: "はい、" },
//   { id: 21, text: "違いま" }
// ];
let scorecards = 0;
let answeredQuestionscards = 0;


//hoctumSubject.html
// const cardsData = [
//   { text: "ちこれには" },
//   { text: "ちこれには" },
//   { text: "こにちはれ" },
//   { text: "こにちはれ" },
//   { text: "これにちは" },
//   { text: "これにちは" },
//   { text: "はにこれち" },
//   { text: "はにこれち" },
//   { text: "にこれちは" },
//   { text: "にこれちは" },
//   { text: "れこにちは" },
//   { text: "れこにちは" },
// ];
// Add 6 từ thôi nhé xong t tự double lên
let scorecardsData = 0;
let answeredQuestionscardsData = 0;


//IT_Document.html
const contentMainObj = [
  {
    Titlecontent: `Sách yêu thích của tôi`,
    Maincontent: `Tôi là một đọc giả đam mê sách. Dưới đây là
            những cuốn sách mà tôi yêu thích.`,
    Book1: `Cuốn “Đắc nhân tâm” của Dale Carnegie là
            một trong những cuốn sách tâm lý học kinh điển nhất.`,
    Book2: `Cuốn “Vũ trụ trong lòng bàn tay” của Neil
            deGrasse Tyson là một cuốn sách khoa học tuyệt vời, giúp bạn hiểu
            rõ hơn về vũ trụ.`,
    Book3: `Bí mật của sự giàu có” của T. Harv Eker là một cuốn sách kinh doanh hữu ích, giúp bạn định hướng tài chính cho mình.`,
    Listcontent: `10 cuốn sách hay nhất về khoa học`,
    Listcontent1: `Cách trở thành một đọc giả đam mê`,
  }
];



