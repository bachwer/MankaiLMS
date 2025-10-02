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














let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    let addCourseModal = document.getElementById('addCourseModal');
    let overlay = document.getElementById('overlay');

    overlay.style.display = 'block';
    addCourseModal.style.display = 'block';
})

let closeAddCourseModal = document.getElementById('closeAddCourseModal');
closeAddCourseModal.addEventListener('click', () => {

    close();
})
let cancelAddWord = document.getElementById("cancelAddWord");
cancelAddWord.addEventListener('click', () => {
    close();
})
let overlay = document.getElementById('overlay');
overlay.addEventListener('click', () => {
    close()
})
let saveNewWord = document.getElementById("saveNewWord");
saveNewWord.addEventListener('click', async () => {
    let courseTitle = document.getElementById("courseTitle").value;
    // let courseLessons = document.getElementById("courseLessons").value;


    if (courseTitle === "") {
        console.log("error");

    } else {
        const allCourses =[
            {
            title: courseTitle,
            Lesson: [],
            numberLessons: 0,
            dataCourses: {},
            status: false,

        },
]
        await createCourses(allCourses);
        await  getDataCourses()

        close();
    }


})

function close(){
    let overlay = document.getElementById('overlay');
    let addCourseModal = document.getElementById('addCourseModal');addCourseModal.style.display = 'none';
    overlay.style.display = 'none';
}


let SectionMainContent = document.getElementById('SectionMainContent');

function showCourses(dataCourses){
    SectionMainContent.innerHTML = '';
    for(let i = 0; i < dataCourses.length; i++) {
        let courses = dataCourses[i]
        let className = "";
        let text =""
        if(courses.status === false){
            text = "Chờ duyệt"
            className = "waitingAlert"
        }else{
            text = "Đã duyệt"
            className = "TrueAlert"

        }


        let div = document.createElement('div');
        div.innerHTML = `
        
       
            <div class="header-card">
              <div class="content">
                <div class="title-section">
                  <div class="label">Courses</div>
                  <div class="title">Title: ${courses.title}</div>
                </div>
                <div class="info">
                  <div class="label">${courses.Lesson?.length ?? "0"} Bài</div>
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

            <div class="button-container">
              <button class="button-card">
                <span>Xem chi tiết <img class="arbtn" src="../img/arrow-right.svg" alt="arrow-right" /> </span>
              </button>
            </div>
   
        
        
        `;
        div.classList.add("card");
        SectionMainContent.appendChild(div);

        div.addEventListener('click', (e) => {
            localStorage.setItem("ID", courses.id );
            window.location.href = "../HTMLAdmin/lesson.html";
        })
    }

}


getDataCourses();
function getDataCourses(){
    const dataCourses = [];
    db.collection("courses").get()

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




//create Courses
async function createCourses(courses) {
    const batch = db.batch();
    const colRef = db.collection('courses');
    courses.forEach(data => {
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

// JS confirm


