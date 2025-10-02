let check = false;
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

getDataCourses();

console.log(ID);
let data;
function getDataCourses(){
    const dataCourses = [];
    db.collection("courses").doc(`${ID}`).get()
        .then((doc) => {
            if (doc.exists) {
                dataCourses.push({ id: doc.id, ...doc.data() });
                console.log("True");
                console.log(dataCourses);
                data = dataCourses;
                showCourses(dataCourses);
            } else {
                console.log("Document does not exist");
            }
        })
        .catch((error) => {
            console.log("false", error);
        });

}


function checkAllSubCollection(dataLesson, i){
    check = true;
    let percentCourse = 0
    let keyVideo    = Object.keys(dataLesson[i]?.video    || {}).length;
    const keyDocument = Object.keys(dataLesson[i]?.document || {}).length;
    const keyTest     = Object.keys(dataLesson[i]?.Test     || {}).length;
    const keyPDF      = Object.keys(dataLesson[i]?.PDF      || {}).length;
    const keyFlash    = Object.keys(dataLesson[i]?.Flash    || {}).length;
    const keyAudio = Object.keys(dataLesson[i]?.Audio || {}).length;



    if(keyVideo > 0){
        percentCourse += (100 / 6)
        keyVideo = 1;
    }
    if(keyDocument > 0){
        percentCourse += (100 / 6)
    }
    if(keyTest > 0){
        percentCourse += (100 / 6)

    }
    if(keyPDF > 0){
        percentCourse += (100 / 6)

    }
    if(keyFlash > 0){
        percentCourse += (100 / 6)

    }
    if(keyAudio > 0){
        percentCourse += (100 / 6)

    }

    if(percentCourse.toFixed(0) < 98){
        check = false;
        console.log(percentCourse);
    }
    console.log(check);


    return [percentCourse.toFixed(0),keyVideo , keyTest]

}








let SectionMainContent = document.getElementById('SectionMainContent');

function showCourses(dataCourses){
    SectionMainContent.innerHTML = '';
    const data = dataCourses[0];

    for(let i = 0; i < dataCourses[0].Lesson.length; i++) {
        const dataLesson = checkAllSubCollection(dataCourses[0].Lesson, i);
        const progress =  dataLesson[0];
        const video =dataLesson[1];
        const test =dataLesson[2];

        let div = document.createElement('div');
        div.innerHTML = `
             <div class="card2">
                <div class="card-header">${dataCourses[0].title}</div>
                <div class="card-title">${dataCourses[0].Lesson[i].name}</div>
                <div class="card-info">${video} Video • ${data.Lesson[i].time} phút • ${test} bài test</div>
                <div class="progress-all">
                    <div class="progress-bar">
                    <div class="progress" style="width: ${progress}%;  "></div>
                    </div>
                    <div class="progress-text">${progress}% hoàn thành</div>
                    </div>
            </div>
        `;
        SectionMainContent.appendChild(div);

        div.addEventListener("click", function () {
            console.log(i);
            localStorage.setItem("index", i.toString());
            window.location.href = "../HTMLAdmin/addDataForLesson.html"
        })

    }

}




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
           await getDataCourses()
           console.log("false");
           const status = false;
           db.collection("courses").doc(ID).set({ status }, { merge: true });
           close();
           setTimeout(() =>{
               getDataCourses()
           },1000)

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
        const docRef = db.collection("courses").doc(ID);
        const docSnap = await docRef.get();

        let data = docSnap.exists ? docSnap.data() : { Lesson: [], numberLessons: 0 };
        const lessons = Array.isArray(data.Lesson) ? data.Lesson : [];

        const newLesson = {
            name: lessonTitle,
            time: timeLesson,
            video:{},
        };

        lessons.push(newLesson); // thêm vào mảng

        await docRef.set({
            Lesson: lessons,
            numberLessons: lessons.length,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });


    } catch (err) {
        console.error(err);
        // } finally {
        //     isProcessing = false;
        // }
    }
}

let btnConfirm = document.getElementById("btnConfirm");

btnConfirm.addEventListener("click", async () => {
    console.log(check)
   if(check === true){
       const status = true;


       db.collection("courses").doc(ID).set({ status }, { merge: true })
           .then(() => {

               window.location.href = "../HTMLAdmin/Courses.html"
           })
           .catch((error) => {
               console.error(error);
           });



   }else{
       console.log("false");
       const status = false;
       db.collection("courses").doc(ID).set({ status }, { merge: true });

   }
})

btnDel.addEventListener("click", async () => {

    db.collection("courses").doc(ID).delete()
        .then(() => {

            window.location.href = "../HTMLAdmin/Courses.html";
        })
        .catch((error) => {
            console.error("Lỗi khi xóa: ", error);
        });

})