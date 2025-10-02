

let dataCourse = []
//load Course nhé !!
loadRanking()
function loadRanking(){
  const dataUser = [];
  db.collection("courses").get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          dataUser.push({ ...doc.data(), docId: doc.id });
        })
        console.log(dataUser);
        dataCourse =  dataUser;



        renderCourses(1, dataCourse);



      })
}














const totalPerPage = 6;
let currentPage = 1;
let sectionMain = document.getElementById("tableBox");


const courses = [];
for (let i = 0; i < 10; i++) {
  courses.push({
    title: "Tiếng Nhật Sơ cấp",
    lessons: "54 bài học",

  });
}




function renderCourses(page, dataCourse) {
  const start = (page - 1) * totalPerPage;
  const end = start + totalPerPage;

  sectionMain.innerHTML = "";

  for(let i = start; i < dataCourse.length + 1; i++){

    let data = {};
    if(i === 0){
       data = {};
      data = {
        title: "Tiếng Nhật Sơ cấp",
        lessons: "54 bài học",
      };
    }else {
      data = {};
      if(  dataCourse[i - 1].status === true ){
        data = dataCourse[i - 1];
      }else{
        console.log("error")
      }


    }

      if (!data || !data.title) {
        console.warn(`Status i = ${i}`, data);
        continue; // bỏ qua nếu không có dữ liệu hợp lệ
      }


    let div = document.createElement("div");
    div.innerHTML = `
       <div class="course-card">
            <div class="course-image-container">
              <div class="course-image">
                <img src="../assets/DSC01453 1.svg" alt="" />
                <div class="course-overlay-title">
                  <div class="label">Khóa học</div>
                  <div class="title">${data.title}</div>
                </div>
              </div>
            </div>

            <div class="course-info">
              <div class="course-details">
                <div class="course-title-container">
                  <div class="course-category">Khóa học</div>
                  <div class="course-title">${data.title}</div>
                </div>
                <div class="course-stats">
            <div class="course-lessons">${Array.isArray(data?.Lesson) ? data.Lesson.length : 1} Bài</div>                
            </div>
              </div>

              <div class="button-container">
                <button class="button">
                  <span class="icon"><img src="../assets/button-icon.svg" alt=""/></span>
                </button>
              </div>
          </div>
      </div>
    `;

    div.classList.add("boxCourse-card");
    if (i === 0) {
      div.addEventListener("click", function () {
        window.location.href = "../HTML/2_1 Hiragana/hiragana.html"
      })

    } else {
      div.addEventListener("click", () => {
        localStorage.setItem("IdCourse", data.docId)

        window.location.href = "../HTML/detailPage.html"

      });
    }

    sectionMain.appendChild(div);


  }





  renderPagination();
}

function renderPagination() {
  const totalPage = Math.ceil(courses.length / totalPerPage);
  const pagination = document.getElementById("pagination");
  const btnPagesEl = document.getElementById("btnPages");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (totalPage <= 1) {
    pagination.style.display = "none";
    return;
  } else {
    pagination.style.display = "none";
  }

  btnPagesEl.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("btn-active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderCourses(currentPage, dataCourse);
    });
    btnPagesEl.appendChild(btn);
  }

  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage === totalPage;

  btnPrev.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderCourses(currentPage, dataCourse);
    }
  };

  btnNext.onclick = () => {
    if (currentPage < totalPage) {
      currentPage++;
      renderCourses(currentPage, dataCourse);
    }
  };
}


