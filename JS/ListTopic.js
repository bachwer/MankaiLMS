let tableBox = document.getElementById('tableBox');
const topics = [
    { title: "Chào hỏi", icon: "handshake.svg" },
    { title: "Hội thoại", icon: "chat.svg" },
    { title: "Con số", icon: "numbers.svg" },
    { title: "Ngày và Giờ", icon: "calendar.svg" },
    { title: "Phương hướng & Địa điểm", icon: "direction.svg" },
    { title: "Phương tiện đi lại", icon: "transport.svg" },
    { title: "Địa điểm nghỉ ngơi", icon: "hotel.svg" },
    { title: "Ăn uống", icon: "food.svg" },
    { title: "Mua sắm", icon: "shopping.svg" },
    { title: "Thành phố & Tỉnh", icon: "city.svg" },
    { title: "Quốc gia", icon: "flag.svg" },
    { title: "Danh lam thắng cảnh", icon: "sightseeing.svg" },
    { title: "Gia đình", icon: "family.svg" },
    { title: "Hẹn hò", icon: "dating.svg" },
    { title: "Khẩn cấp", icon: "emergency.svg" },
    { title: "Bệnh tật", icon: "sickness.svg" },
    { title: "Câu đồng âm, khác nghĩa", icon: "wordplay.svg" }
];


let dataTopic = []
loadCourse()
function loadCourse(){
    const dataUser = [];
    db.collection("topicsWord").get()
        .then((querySnapShot) => {
            querySnapShot.forEach((doc) => {
                dataUser.push({ ...doc.data(), docId: doc.id });
            })
            console.log(dataUser);
            dataTopic =  dataUser;
            loadDataTopic(dataUser)


        })
}




function loadDataTopic(topics){


    for(let i = 0; i < topics.length; i++){
        let div = document.createElement('div');
        div.innerHTML = `
      <div class="box boxHeight">

            <div class="boxIcon ">
                <img src="../assets/IconTopic/img.png" width="28px" alt="Icon"/>
            </div>

            <span class="title">Chủ đề</span>
            <p>${topics[i].title}</p>
            <span>${Object.keys(topics[i].japanese.words).length} từ vựng</span>
        </div>
  
    
    `;
        div.classList.add('boxFull1');

        tableBox.appendChild(div);

        div.addEventListener("click", () => {
            console.log(topics[i].docId);
            localStorage.setItem("IdTopic", topics[i].docId);
            window.location.href = "../HTML/Detail1.html"
        })
    }


}



loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";
    setTimeout(() => {
        spinner.style.display = "none";
    }, 1500);
}









