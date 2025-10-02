



let ID = localStorage.getItem('IdCourse');
let dataUser = JSON.parse(localStorage.getItem('dataUser'));


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
                data = dataCourses;
                loadLesson(dataCourses);
            } else {
                console.log("Document does not exist");
            }
        })
        .catch((error) => {
            console.log("false", error);
        });

}



let check = true;
function checkAllSubCollection(dataLesson, i) {
    let percentCourse = 0
    let keyVideo = Object.keys(dataLesson[i]?.video || {}).length;
    const keyDocument = Object.keys(dataLesson[i]?.document || {}).length;
    const keyTest = Object.keys(dataLesson[i]?.Test || {}).length;
    const keyPDF = Object.keys(dataLesson[i]?.PDF || {}).length;
    const keyFlash = Object.keys(dataLesson[i]?.Flash || {}).length;
    const keyAudio = Object.keys(dataLesson[i]?.Audio || {}).length;


    if (keyVideo > 0) {
        percentCourse += (100 / 6)
        keyVideo = 1;
    }
    if (keyDocument > 0) {
        percentCourse += (100 / 6)
    }
    if (keyTest > 0) {
        percentCourse += (100 / 6)

    }
    if (keyPDF > 0) {
        percentCourse += (100 / 6)

    }
    if (keyFlash > 0) {
        percentCourse += (100 / 6)

    }
    if (keyAudio > 0) {
        percentCourse += (100 / 6)

    }

    if (percentCourse.toFixed(0) < 98) {
        check = false;
        console.log(percentCourse);

    }
    return [percentCourse.toFixed(0), keyVideo, keyTest]

}


function CheckExistenceLesson() {
    if (Array.isArray(dataUser.progressLesson) && dataUser.progressLesson.length > 0) {

        for (let i = 0; i < dataUser.progressLesson.length; i++) {
            const idLesson = dataUser.progressLesson[i].idCourse;
            if (idLesson === ID) {
                console.log(i + "--")
                return dataUser.progressLesson[i];
            }
        }
    }
    return [];
}


function getDataUserOfLesson(progress) {

    const arr = [0, 0, 0, 0, 0, 0, 0];
    // return data if true = 100 false = 0
    if (progress.video === true) {
        arr[0] = 100;
    }
    if (progress.flashCard === true) {
        arr[1] = 100;
    }
    if (progress.audio === true) {
        arr[2] = 100;
    }
    if (progress.pdf === true) {
        arr[3] = 100;
    }
    if (progress.testLesson === true) {
        arr[4] = 100;
    }
    if (progress.text === true) {
        arr[5] = 100;
    }
    arr[6] = ((arr[0] + arr[1] + arr[2] + arr[3] + arr[4] + arr[5]) / 600 * 100).toFixed(0);

    return arr;
    // return calculation progress => don



}



function loadLesson(data) {
    console.log(data[0].Lesson);


    const LessonDataUser = CheckExistenceLesson()



    let tableBox = document.getElementById("tableBox");

    for (let i = 0; i < data[0].Lesson.length; i++) {
        let arrProgress = [0, 0, 0, 0, 0, 0, 0];
        if (LessonDataUser.length !== 0) {
            for (let j = 0; j <= i + 1; j++) {

                if (LessonDataUser.progress[j]?.indexLesson === i) {
                    console.log(j)
                    console.log(i)
                    arrProgress = getDataUserOfLesson(LessonDataUser.progress[j])
                    break;
                }

            }

        }
        console.log(i)

        let classProgress = "";

        if (arrProgress[6] > 80) {
            classProgress = "progress2"
        } else if (arrProgress[6] >= 50) {
            classProgress = "progress1"
        } else {
            classProgress = "progress"
        }






        const lesson = checkAllSubCollection(data[0].Lesson, i);
        const video = lesson[1];
        const test = lesson[2];



        let div = document.createElement("div");
        div.innerHTML = `
    <div class="card">
                <div class="card-header">Tiếng Nhật N1</div>
                <div class="card-title"> ${data[0].Lesson[i].name}</div>
                <div class="card-info">${video} Video • ${data[0].Lesson[i].time} phút • ${test} bài test</div>
                <div class="progress-all">
                    <div class="progress-bar">
                    <div class="${classProgress}" style="width: ${arrProgress[6]}%"></div>
                    </div>
                    <div class="${classProgress}-text">${arrProgress[6]}% hoàn thành</div>
                    </div>
            </div>
            
    `;

        div.addEventListener("click", function (key, value) {
            localStorage.setItem("indexLesson", i.toString());



            const progressLesson = {
                video: arrProgress[0],
                flashCard: arrProgress[1],
                testLesson: arrProgress[4],
                pdf: arrProgress[3],
                text: arrProgress[5],
                audio: arrProgress[2],
            }
            let arr = [0, 0, 0]
            let arrTest = [0, 0, 0, 0, 0]

            if (arrProgress[1] === 100) {
                arr = [33.3, 33.3, 33.3]
            }
            if (arrProgress[4] === 100) {
                arrTest = [20, 20, 20, 20, 20]
            }

            localStorage.setItem("arrTest", JSON.stringify(arrTest));
            localStorage.setItem("arrFlash", JSON.stringify(arr));
            localStorage.setItem("progressLesson", JSON.stringify(progressLesson));









            console.log(i);

            window.location.href = "../HTML/Flow_1.4/video.html";
        })



        tableBox.appendChild(div);
    }

}







let logoHome = document.getElementById('logoHome');
logoHome.addEventListener('click', () => {
    window.location.href = "../HTML/HomePage.html"
})