


let IdExam = localStorage.getItem("IdExam");

//doc.exists kiem tra ton tai khi truy van
getDataExam();
function getDataExam(){
    const dataExam = [];
    db.collection("Exam").doc(`${IdExam}`).get()
        .then(doc => {
            if(doc.exists){
                dataExam.push({ id: doc.id, ...doc.data() });
                console.log(dataExam);
                showExam(dataExam);
            }else{
                console.log(IdExam);
            }
        })
        .catch((error) => {
            console.log("false", error);
        });


}






function showExam(dataExam){
    let tableBox = document.getElementById("tableBox");
    tableBox.innerText = "";

    for (let i = 0; i <= dataExam[0].exam.length; i++) {


        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
        <div class="card-level">${dataExam[0].title}</div>
        <div class="card-header">${dataExam[0].exam[i].name}</div>
        <div class="card-participants">
            <img alt="Icon" src="../assets/profile-2user.svg" />
            <span class="card-title">9626 người tham gia</span>
        </div>
        <div class="card-duration">
            <img alt="Icon" src="../assets/clock.svg" />
            <span class="card-info">${dataExam[0].exam[i].time} phút</span>
        </div>
        <button class="card-button"><span>Vào Thi Ngay</span></button>
    `;

        div.addEventListener('click', (e) => {

            const popUp1 = document.getElementById('popUp1');
            const overlay = document.getElementById('overlay');
            popUp1.style.display = 'block';
            localStorage.setItem("indexExam", i.toString());
            overlay.style.display = 'block';

        })

        tableBox.appendChild(div);
    }


}

// JSON.stringify(



let logoHome = document.getElementById('logoHome');
logoHome.addEventListener('click', () => {
    window.location.href = "../HTML/HomePage.html"
})

const popUp1 = document.getElementById('popUp1');
const overlay = document.getElementById('overlay');
const returnBtn = document.getElementById('return');
const examBtn = document.getElementById('exam');

returnBtn.addEventListener('click', function() {
    popUp1.style.display = 'none';
    overlay.style.display = 'none';
});

examBtn.addEventListener('click', function() {
    window.location.href = "../HTML/composition.html";
});

overlay.addEventListener('click', function() {
    popUp1.style.display = 'none';
    overlay.style.display = 'none';
});

