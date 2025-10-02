let AllCourse = document.getElementById('AllCourse')
let userData = JSON.parse(localStorage.getItem('dataUser'));
loadDataUser();



AllCourse.addEventListener('click', () => {
    window.location.href = ""
    window.location.href = "../HTML/AllCrouse.html"
})


let dataCourse = []
loadCourse()
function loadCourse(){
    const dataUser = [];
    db.collection("courses").get()
        .then((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                dataUser.push({ ...doc.data(), docId: doc.id });
            })
            console.log(dataUser);
            dataCourse =  dataUser;
            loadCourseHomePage(dataUser)

        })
}




function loadCourseHomePage(dataCourse){


    let CourseCard = document.getElementById('Course-card')

    for(let i = 0; i < dataCourse.length + 1; i++) {
        let div = document.createElement('div');

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
                continue;
            }


        }

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
                <span class="icon"
                ><img src="../assets/button-icon.svg" alt=""
                /></span>
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



        CourseCard.appendChild(div);



    }


}



let sectionMainBox = document.querySelectorAll(".sectionMainBox");

sectionMainBox.forEach(section => {
    section.addEventListener("click", () => {
        window.location.href = "../HTML/2_1 Hiragana/hiragana.html"
    })
})



function loadDataUser(){
    let nameInfo =  document.getElementById('nameInfo');
    let emailInfo =  document.getElementById('emailInfo');
    let nameUser = document.getElementById("nameUser");
    let emailUser = document.getElementById("emailUser");
    let homeTown = document.getElementById("homeTown");
    let point = document.getElementById("point");
    const avatarImg = document.querySelectorAll(".imgLoadLc");




    avatarImg.forEach(img => {
        img.src = userData.imgUrl;
        img.style.borderRadius = "50%";
        img.style.width = "50px";
        img.style.objectFit= "cover";

    });

    point.innerHTML = `
    <img src="../assets/Object%201%20.svg" alt=""> ${userData.point}</h3>
    `;
    nameUser.textContent = userData.name;
    emailUser.textContent = userData.email + " |";
    homeTown.innerText = userData.hometown;
    emailInfo.innerText = userData.email;
    nameInfo.innerText = userData.name;
}


loadRanking();
function loadRanking(){
    const dataUser = [];
    db.collection("accountUser").get()
        .then((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                dataUser.push({ ...doc.data(), docId: doc.id });
            })


            dataUser.sort((a, b) => b.point - a.point);
            loadTopRanking(dataUser)
            ranking(dataUser)

        })
}




function loadTopRanking(dataUser){



    let imgTop3 = document.getElementById("imgTop3");
   let imgTop2 = document.getElementById("imgTop2");
   let imgTop1 = document.getElementById("imgTop1");
   let nameTop3 =  document.getElementById("nameTop3");
   let nameTop2 =  document.getElementById("nameTop2");
   let nameTop1 =  document.getElementById("nameTop1");
   let point1 = document.getElementById("point1");
   let point2 = document.getElementById("point2");
   let point3 = document.getElementById("point3");


    let name = dataUser[0].name.split(" ");
    let name1 = dataUser[1].name.split(" ");
    let name2 = dataUser[2].name.split(" ");

    point1.textContent=dataUser[0].point;
    point2.textContent=dataUser[1].point;
    point3.textContent=dataUser[2].point;




    nameTop1.textContent = name[name.length - 2] +" "+ name[name.length - 1];
    nameTop2.textContent = name1[name1.length - 2] +" "+ name1[name1.length - 1];
    nameTop3.textContent = name2[name2.length - 2] +" "+ name2[name2.length - 1];

    imgTop1.src = dataUser[0].imgUrl;
    imgTop2.src = dataUser[1].imgUrl;
    imgTop3.src = dataUser[2].imgUrl;
    imgTop1.style.borderRadius = "50%";
    imgTop3.style.borderRadius = "50%";
    imgTop2.style.borderRadius = "50%";


}



function ranking(dataUser){
    let tableUser = document.getElementById('tableUser');
    tableUser.innerHTML = '';


    for(let i = 0; i < 10; i++) {
        const data = dataUser[i];
        // Effect
        let effect = ""


        if (data && userData.codeUser === data.docId) {
            effect = "Effect";
            console.log("true")
        }





        let div = document.createElement('div');
        div.innerHTML = `
        <div class="boxUser ${effect}">

          <span>${i + 1}</span>
            <div class="flex1">
              <div class="circleTop12">
                    <img class="imgAvatar" src="${data?.imgUrl|| "" }" alt="img" />
              </div>
              <p>${data.name || "" }</p>
            </div>

            <div class="StarBox1">
              <img class="star" src="../assets/Object%201%20.svg" alt="" />
              <h3>${data.point || ""}</h3>
            </div>

          </div>
        `;

        tableUser.appendChild(div);
        if(data.docId === userData.codeUser){
            let rankingUser = document.getElementById("rankingUser");
            rankingUser.innerText = (i+1).toString();

        }
    }
}


let informationUser = document.getElementById("informationUser");
informationUser.addEventListener("click", () => {
    window.location.href = "../HTML/informationUser.html"
})


let signOut = document.getElementById("signOut");

signOut.addEventListener("click", () => {
    localStorage.setItem("dataUser", "");
    window.location.href = "../index.html";

})

let topicPage = document.getElementById("topicPage");
topicPage.addEventListener("click", function() {
    window.location.href = "../HTML/1.2ListTopic.html"
})

let testPage = document.getElementById("testPage");
testPage.addEventListener("click", () => {
    window.location.href = "../HTML/flow3_1-2.html"
})