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






















getDataCourses();
function getDataCourses(){
    const dataCourses = [];
    db.collection("Exam").get()

        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataCourses.push({id: doc.id, ...doc.data()});
            })
            console.log("True");
            showCourses(dataCourses);
            console.log(dataCourses);
        })
        .catch((error) => {
            console.log("false")
        })

}



function showCourses(dataCourses){
    SectionMainContent.innerHTML = '';

    for(let i = 0; i < 5; i++) {
        let className = "";
        let text =""
        if(dataCourses[i].status === false){
            text = "Chờ duyệt"
            className = "waitingAlert"
        }else{
            text = "Đã duyệt"
            className = "TrueAlert"

        }
        const data =dataCourses[i]

        let div = document.createElement('div');
        div.innerHTML = `
        
       
          
      <div class="header-card">
        <div class="content">
          <div class="title-section">
            <div class="label">Bài thi</div>
            <div class="title">${data.title}</div>
          </div>
          <div class="info">
            <div class="label">${data.exam.length} đề thi</div>
            <div class="dot"></div>
              <div class="label ${className}">${text}</div>
          </div>
        </div>

        <div class="icon-card">
          <div class="grid-lines-card"></div>
          <div class="icon-content-card">
            <img src="../img/Frame 1000007116.svg" alt="Frame" />
          </div>
        </div>
      </div>

    

        `;
        div.classList.add("card");
        SectionMainContent.appendChild(div);

        div.addEventListener('click', (e) => {
            localStorage.setItem("ID", data.id );
            console.log(data.id);
            window.location.href = "../HTMLAdmin/addQesInExam.html";
        })
    }

}
let overlay = document.getElementById('overlay');
overlay.addEventListener('click', () => {
    close()
})

function close(){
    let addCourseModal = document.getElementById('addCourseModal');
    let overlay = document.getElementById('overlay');

    overlay.style.display = 'none';
    addCourseModal.style.display = 'none';

}



let addExam = document.getElementById("saveNewWord")
addExam.addEventListener("click", async (e) => {

    let courseTitle = document.getElementById("courseTitle").value;
    if (courseTitle === "") {
        console.log("error");

    } else {
        const allExam = [
            {
                title: courseTitle,
                exam: [],
                status: false,

            },
        ]

        await createExam(allExam);
        close();
        getDataCourses()
    }
})



let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', async () => {
    let addCourseModal = document.getElementById('addCourseModal');
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    addCourseModal.style.display = 'block';

});





async function createExam(allExam) {
    const batch = db.batch();
    const colRef = db.collection('Exam');
    allExam.forEach(data => {
        const newDoc = colRef.doc();
        batch.set(newDoc, {
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        });
    });


    try {
        await batch.commit();
        console.log("true")
    } catch (err) {
        console.log("ERROR")
    }
}

