

loadDataExam();
function loadDataExam(){
  const dataExam = [];
  db.collection("Exam").get()
      .then((querySnapShot) =>{
         querySnapShot.forEach((doc) =>{
           dataExam.push({
             ...doc.data(),
             docId: doc.id,
           });

         })
        showExam(dataExam);
        console.log(dataExam);


      })



}





function showExam(dataExam){
  let sectionMain = document.getElementById("tableBox");
  sectionMain.innerHTML = "";

  for (let i = 0; i < dataExam.length; i++) {

    const data = dataExam[i];

    console.log(data)
  if(data.status === false){
    continue;
  }

    let div = document.createElement("div");
    div.innerHTML = `
     <div class="card">
      <div class="header-card">
        <div class="content">
          <div class="title-section">
            <div class="label">Bài thi</div>
            <div class="title">${data.title}</div>
          </div>
          <div class="info">
            <div class="label">${data.exam.length} Bài thi</div>
            <div class="dot"></div>
            <div class="label">1000 người đã tham gia</div>
          </div>
        </div>

        <div class="icon-card">
          <div class="grid-lines-card"></div>
          <div class="icon-content-card">
            <img src="../assets/Frame 1000007116.svg" alt="Frame" />
          </div>
        </div>
      </div>

      <div class="button-container">
        <button class="button-card">
          <span>Tham gia ngay <img class="arbtn" src="../assets/arrow-right.svg" alt="arrow-right" /> </span>
        </button>
      </div>
    </div>
    
    `;

    div.addEventListener('click', (e) => {
      localStorage.setItem("IdExam", data.docId)
      console.log(data.docId);
      window.location.href="../HTML/flow3_1.2.html";

    })
    div.classList.add("boxCard");
    sectionMain.appendChild(div);
}


}










let logoHome = document.getElementById('logoHome');
logoHome.addEventListener('click', () => {
  window.location.href = "../HTML/HomePage.html"
})