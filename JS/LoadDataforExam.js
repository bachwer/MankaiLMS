
let ID = localStorage.getItem("IdExam");
let index = parseInt(localStorage.getItem("indexExam"));

let indexID  = 0

getDataExam();
function getDataExam() {

    const dataExam = [];
    db.collection("Exam").doc(`${ID}`).get()
        .then((doc) => {
            if(doc.exists) {
                dataExam.push({ id: doc.id, ...doc.data() });

            }
            console.log(dataExam);
            console.log(index)
            loadDada(dataExam[0].exam[index])

    })

}

let examData;
let timeTest = 0;


let Description = [
    ["エン・タイ・デュはグエン・タイ・デュイです エン・タイ・デュはグエン・タイ・デュイですエン・タイ・デュはグ",
        "エン・タイ・デュイです グエン・タイ・デュイです エン・タグエン・タイ・デュイです エン・タ"],
    ["次の文章を読んで、質問に答えなさい",
        "日本では、春になると桜の花が咲きます。多くの人々がお花見を楽しみます。"],
    ["次の会話を読んで、質問に答えなさい",
        "A: 明日のパーティーに行きますか？ B: はい、行きます。何時に集合ですか？"],
];

function loadDada(data){



    let test1 = pushToArray(data.test1.dataQues, )
    let test2 = pushToArray(data.test2.dataQues,)
    let test3 =  pushToArray(data.test3.dataQues,)
    console.log(data.test3.dataQues[0].audioLink)
    console.log(test1)
    console.log(test2)
    console.log(test3)


    console.log(data);
    timeTest = data.time;

    examData = {
        title: data.name,
        sections:[
            {
                title: "Chữ Hán - Từ vựng",
                content: Description[0],
                questions: test1,
            },
            {
                title: "Ngữ pháp - Đọc hiểu",
                content: Description[1],
                questions: test2,
            },
            {
                title: "Nghe hiểu",
                content: Description[2],
                linkAudio: data.test3.dataQues[0].audioLink,
                questions: test3,

            }
        ]

    }
}


function pushToArray(data){
    const arr = [];
    for(let i = 0; i < data.length; i++){
        const item = data[i]
        let answersCorrect = [false,false,false,false]
        indexID++;
        answersCorrect[item.correct] = true;
        arr.push(

                {
                    id: indexID,
                    text: item.question,
                    answers: [
                        { id: "a", text: item.answers[0], correct: answersCorrect[0] },
                        { id: "b", text: item.answers[1], correct: answersCorrect[1] },
                        { id: "c", text: item.answers[2], correct: answersCorrect[2] },
                        { id: "d", text: item.answers[3], correct: answersCorrect[3] }
                    ]
                }


        )

    }
    return arr;
}


