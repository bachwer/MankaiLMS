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

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});


function CalculatorWord(data) {
  let arr = [];
  arr[0] = data.length;
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    total += Object.keys(data[i].japanese.words).length;
  }
  arr[1] = total;
  let WordsNum = document.getElementById("WordsNum");
  let WordsNum1 = document.getElementById("WordsNum1");

  WordsNum.innerText = arr[0] + " Chủ Đề từ vựng";
  WordsNum1.innerText = arr[1] + " từ vựng tiếng nhật kèm audio";
}


getDataFromFirestore();

function getDataFromFirestore() {
  const data = [];
  db.collection("topicsWord").get()
      .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        });
        console.log("Dữ liệu từ Firebase:", data);
        CalculatorWord(data);

      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  return data;
}


getDataFromFirestore1();

function getDataFromFirestore1() {
  const data = [];
  db.collection("courses").get()
      .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        });
        console.log("Dữ liệu từ Firebasec:", data);
        checkCourse(data);


      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  return data;
}

function checkCourse(data) {
  let numCourse = 0;
  let numLesson = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].status === true) {
      numCourse++;

      numLesson += data[i].Lesson.length;


    }


  }


  console.log(numLesson);
  console.log(numCourse);
  let CoursesNum = document.getElementById("CoursesNum");
  let CoursesNum1 = document.getElementById("CoursesNum1");
  CoursesNum.innerText = numCourse.toString() + " Khoá học tiếng nhật chuẩn mankai";
  CoursesNum1.innerText = numLesson.toString() + " Bài học chất lượng!";
}


loadDataResults()

function loadDataResults() {

  const data = [];
  db.collection("resultsExam").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        })

        console.log(data);
        renData(data);
      })

}


function renData(data){
  let ShowResultsUser = document.getElementById("ShowResultsUser");
  for(let i = 0; i < data.length; i++){

    let classResult = ""
    if(data[i].overall > 80){
      classResult = "completed2"
    }else if(data[i].overall > 49){
      classResult = "process"
    }else{
      classResult = "pending"
    }




    let tr = document.createElement("tr");
    tr.innerHTML =  `
    <td> <img src="${data[i].imgUrl}" alt=""/>
        <p>${data[i].name}</p>
    </td>
   <td>${data[i].birthDate}</td>
   <td><span class="status ${classResult}"><storng>${data[i].overall + " %"}</storng></span></td>
    
    `;
    ShowResultsUser.appendChild(tr)
  }

}

function addWordPage(){
  window.location.href = "../HTMLAdmin/topic.html"
}

function addCoursePage(){
  window.location.href = "../HTMLAdmin/Courses.html"

}
function addExamPage(){
  window.location.href = "../HTMLAdmin/addExam.html"


}
function addAccount(){
  window.location.href = "../HTMLAdmin/student.html"


}