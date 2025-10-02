let progressLesson = JSON.parse(localStorage.getItem("progressLesson"));
let arr = JSON.parse(localStorage.getItem("arrFlash"));
let arrTest = JSON.parse(localStorage.getItem("arrTest"));
let indexLesson = parseInt(localStorage.getItem("indexLesson"));
let dataUser = JSON.parse(localStorage.getItem("dataUser"));


checkProgress();
function checkProgress() {
    let checkArr = [false, false, false, false, false, false]

    if (progressLesson.video > 99) {
        document.querySelector("#video div").className = "finished"
        document.getElementById("progressVideo").innerText = "100%";
        checkArr[0] = true;
    }

    if (progressLesson.text > 99) {
        document.querySelector("#book div").className = "finished"
        document.getElementById("progressText").innerText = "100%";
        checkArr[1] = true;
    }

    if (progressLesson.testLesson > 99) {
        document.querySelector("#test div").className = "finished"
        document.getElementById("progressTest").innerText = "100%";
        checkArr[2] = true;
    } else {
        document.getElementById("progressTest").innerText = progressLesson?.testLesson.toFixed(0) + "%" || "0%";
    }

    if (progressLesson.flashCard > 99) {
        console.log("true")
        document.querySelector("#flashCard div").className = "finished"
        document.getElementById("progressFlash").innerText = "100%";
        checkArr[3] = true;
    } else {
        document.getElementById("progressFlash").innerText = progressLesson.flashCard.toFixed(0) + "%";
    }

    if (progressLesson.pdf > 99) {
        document.querySelector("#Sile div").className = "finished"
        document.getElementById("progressPDF").innerText = "100%";
        checkArr[4] = true;
    }
    if (progressLesson.audio > 99) {
        document.querySelector("#audio div").className = "finished"
        document.getElementById("progressAudio").innerText = "100%";
        checkArr[5] = true;

    }

    return checkArr;
}



function progressVideo(num) {
    const progressVideo = document.getElementById("progressVideo");

    // xoa qua trinh cu
    clearInterval(progressInterval);

    let i = num;
    progressVideo.innerText = i + "%";

    progressInterval = setInterval(async () => {
        i++;
        if (i > 100) {
            clearInterval(progressInterval);
            let classVideo = document.getElementById("classVideo");
            classVideo.classList.remove("menuVideo");
            classVideo.classList.add("finished");
            progressLesson.video = 100;
            localStorage.setItem("progressLesson", JSON.stringify(progressLesson));
            await saveProgressLesson()
            return;
        }
        progressVideo.innerText = i + "%";
    }, 800);
}



async function flashCard1(i) {
    // progressLesson.flashCard += 100 /3
    console.log(arr[i])
    console.log(arr[0] + arr[1] + arr[2])
    arr[i] = 100 / 3

    localStorage.setItem("arrFlash", JSON.stringify(arr));

    progressLesson.flashCard = arr[0] + arr[1] + arr[2];

    document.getElementById("progressFlash").innerText = progressLesson?.flashCard.toFixed(0) + "%" || "0%";


    if (progressLesson.flashCard >= 99) {
        document.querySelector("#flashCard div").className = "finished"
        document.getElementById("progressFlash").innerText = "100%";
        await saveProgressLesson()

    }
    localStorage.setItem("progressLesson", JSON.stringify(progressLesson));

}


async function testLesson(i) {




    arrTest[i] = 100 / numberQues;
    progressLesson.testLesson = arrTest[0] + arrTest[1] + arrTest[2] + arrTest[3] + arrTest[4];
    document.getElementById("progressTest").innerText = progressLesson?.testLesson.toFixed(0) + "%" || "0%";
    if (progressLesson.testLesson >= 99) {
        document.querySelector("#test div").className = "finished"
        document.getElementById("progressTest").innerText = "100%";
        await saveProgressLesson()
    }

    localStorage.setItem("arrTest", JSON.stringify(arrTest));
    localStorage.setItem("progressLesson", JSON.stringify(progressLesson));

}



//-------------


function progressPDF(num) {
    const progressPDF = document.getElementById("progressPDF");


    clearInterval(progressInterval1);

    let i = num;
    progressPDF.innerText = i + "%";

    progressInterval1 = setInterval(async () => {
        i++;
        if (i > 100) {
            clearInterval(progressInterval1);
            document.querySelector("#Sile div").className = "finished"
            document.getElementById("progressPDF").innerText = "100%";

            progressLesson.pdf = 100;
            localStorage.setItem("progressLesson", JSON.stringify(progressLesson));
            await saveProgressLesson();

            return;
        }
        progressPDF.innerText = i + "%";
    }, 300);
}



function progressText(num) {
    const progressPDF = document.getElementById("progressText");


    clearInterval(progressInterval2);

    let i = num;
    progressPDF.innerText = i + "%";

    progressInterval2 = setInterval(async () => {
        i++;
        if (i > 100) {
            clearInterval(progressInterval2);
            document.querySelector("#book div").className = "finished"
            document.getElementById("progressText").innerText = "100%";

            progressLesson.text = 100;
            localStorage.setItem("progressLesson", JSON.stringify(progressLesson));
            await saveProgressLesson()
            return;
        }
        progressPDF.innerText = i + "%";
    }, 250);
}

async function progressAudio() {
    document.querySelector("#audio div").className = "finished"
    document.getElementById("progressAudio").innerText = "100%";
    progressLesson.audio = 100;
    localStorage.setItem("progressLesson", JSON.stringify(progressLesson));
    await saveProgressLesson();
}



console.log(ID)
console.log(indexLesson)
console.log(dataUser.codeUser)



async function saveProgressLesson() {


    const arr = checkProgress()
    const ProgressLesson = [
        {
            idCourse: ID,
            progress: [{
                indexLesson: indexLesson,
                video: arr[0],
                text: arr[1],
                testLesson: arr[2],
                flashCard: arr[3],
                pdf: arr[4],
                audio: arr[5],
            }]
        }
    ]
    console.log(ProgressLesson)

    const userDoc = await db.collection("accountUser").doc(dataUser.codeUser).get();
    let progressLesson = userDoc.data()?.progressLesson || [];


    const existingId = progressLesson.findIndex(item => item.idCourse === ID);

    if (existingId !== -1) {
        // Đã có khóa học
        const course = progressLesson[existingId];

        // Đảm bảo `progress` tồn tại là mảng
        if (!Array.isArray(course.progress)) {
            course.progress = [];
        }

        const newLesson = JSON.parse(JSON.stringify(ProgressLesson[0].progress[0]));
        const lessonIndex = course.progress.findIndex(lesson => lesson.indexLesson === newLesson.indexLesson);

        if (lessonIndex !== -1) {
            console.log(newLesson);
            console.log("Thấy LEsson")
            // Bài học đã tồn tại → chỉ cập nhật thông tin (không ghi đè hết)
            const updatedProgress = [...course.progress];
            updatedProgress[lessonIndex] = {
                ...updatedProgress[lessonIndex],
                ...newLesson
            };

            course.progress = updatedProgress;
        } else {
            console.log("Không Thấy")
            course.progress.push(newLesson);

        }

    } else {
        // Khóa học chưa có → thêm mới
        progressLesson.push(ProgressLesson[0]);
    }
    dataUser.progressLesson = progressLesson;
    console.log("🚨 Data to save Firestore:", JSON.stringify(progressLesson, null, 2));
    await db.collection("accountUser").doc(dataUser.codeUser).set({
        progressLesson: progressLesson
    }, { merge: true });  // ✅ merge giữ lại phần cũ
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
}



