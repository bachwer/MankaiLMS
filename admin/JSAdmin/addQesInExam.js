
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


let ID = localStorage.getItem('ID');


console.log(ID);
let data;
getDataCourses();


function getDataCourses(){
    const dataExam = [];
    db.collection("Exam").doc(`${ID}`).get()
        .then((doc) => {
            if (doc.exists) {
                dataExam.push({ id: doc.id, ...doc.data() });
                console.log("True");
                console.log(dataExam);
                data = dataExam;
                showExam(dataExam);
            } else {
                console.log("Document does not exist");
            }
        })
        .catch((error) => {
            console.log("false", error);
        });
}

let checkStatus = false;

function checkProgress(data,index){
     checkStatus = true;

    let checkVocabulary = Object.keys((data[index]?.test1?.dataQues) || {}).length;
    let checkGrammar  = Object.keys((data[index]?.test2?.dataQues) || {}).length;
    let checkListening = Object.keys((data[index]?.test3?.dataQues) || {}).length;

    let progress = 0;

    if(checkVocabulary > 0){
        progress += Math.ceil(100 / 3);
    }
    if(checkGrammar > 0){
        progress += Math.floor(100 / 3);
    }

    if(checkListening > 0){
        progress += Math.floor(100 / 3);
    }
    if(progress < 98){
        checkStatus = false;
    }
    console.log(progress)
    return progress;
}





// dataCourses
function showExam(dataExam) {
    SectionMainContent.innerHTML = "";

    // data.Exam.length
    for (let i = 0; i <dataExam[0].exam.length ; i++) {
        let progress = checkProgress(dataExam[0].exam, i);

        let div = document.createElement('div');
        div.innerHTML = `
        <div class="card-level"> ${dataExam[0].title}</div>
        <div class="card-header">${dataExam[0].exam[i].name}</div>
        <div class="card-participants">
            <div class="progress-all">
                    <div class="progress-bar">
                    <div class="progress" style="width: ${progress}%;  "></div>
                    </div>
                    <div class="progress-text">${progress}% hoàn thành</div>
                    </div>
                    </div>
        </div>
        <div class="card-duration">
            <img alt="Icon" src="../img/clock.svg" />
            <span class="card-info">${dataExam[0].exam[i].time} phút</span>
        </div>
        <button class="card-button"><span>Chi tiết Đề thi</span></button>
    `;
        div.className = "card";
        SectionMainContent.appendChild(div);

        div.addEventListener("click", function () {
            console.log(i);
            localStorage.setItem("index", i.toString());
            window.location.href = "../HTMLAdmin/addDataExam.html"
        })
    }
}



//add

    let overlay = document.getElementById("overlay");
    let btnAdd = document.getElementById("btnAdd");

    btnAdd.addEventListener("click", function () {
        document.getElementById("lessonTitle").value = "";
        document.getElementById("timeLesson").value ="";
        let addCourseModal = document.getElementById("addCourseModal");

        overlay.style.display = "block";
        addCourseModal.style.display = "block";

        const newLesson = document.getElementById("newLesson");
        newLesson.addEventListener("click", async (e) => {

            let lessonTitle = document.getElementById("lessonTitle").value.trim();
            let timeLesson = document.getElementById("timeLesson").value.trim();
            console.log(lessonTitle);
            console.log(timeLesson);

            if(lessonTitle !== "" && timeLesson !== ""){
                await handleAddLesson(lessonTitle, timeLesson)

                close();

                console.log("false");
                const status = false;
                db.collection("Exam").doc(ID).set({status}, {merge: true});



                setTimeout(() => {
                    getDataCourses()
                }, 500);

            }else{
                console.log("false");
            }
        })
    })
    overlay.addEventListener("click", function() {
        close();
    })



function close(){
    let addCourseModal = document.getElementById("addCourseModal");
    overlay.style.display = "none";
    addCourseModal.style.display = "none";

}



async function handleAddLesson(lessonTitle, timeLesson) {
    try {
        const docRef = db.collection("Exam").doc(ID);
        const docSnap = await docRef.get();
        let data = docSnap.exists ? docSnap.data() : { exam: [] };
        const lessons = Array.isArray(data.exam) ? data.exam : [];
        const newLesson = {
            name: lessonTitle,
            time: timeLesson,
        };
        lessons.push(newLesson); // thêm vào mảng
        await docRef.set({
            exam: lessons,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

    } catch (err) {
        console.error(err);
        // } finally {
        //     isProcessing = false;
        // }
    }
}

btnDel.addEventListener("click", async () => {
    db.collection("Exam").doc(ID).delete()
        .then(() => {

            window.location.href = "../HTMLAdmin/addExam.html";
        })
        .catch((error) => {
            console.error("Lỗi khi xóa: ", error);
        });

})


let btnConfirm = document.getElementById("btnConfirm");
btnConfirm.addEventListener("click", async () => {
    if (checkStatus === true) {
        const status = true;


        db.collection("Exam").doc(ID).set({status}, {merge: true})
            .then(() => {

                window.location.href = "../HTMLAdmin/addExam.html"
            })
            .catch((error) => {
                console.error(error);
            });


    } else {
        console.log("false");
        const status = false;
        db.collection("Exam").doc(ID).set({status}, {merge: true});

    }
});