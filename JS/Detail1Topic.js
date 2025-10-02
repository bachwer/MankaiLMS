


let IdTopic = localStorage.getItem("IdTopic");

let dataTopic = []
getDataTopic()
function getDataTopic(){
    const data = [];
    db.collection("topicsWord").doc(`${IdTopic}`).get()
        .then((doc) => {
            if (doc.exists) {
                data.push({ id: doc.id, ...doc.data() });

                console.log(data);
                dataTopic = data;
                loadDataWords(data);
            } else {
                console.log("Document does not exist");
            }
        })
        .catch((error) => {
            console.log("false", error);
        });

}
let textSpeak = "";






function loadDataWords(dataWords){

    const data = dataWords[0];


    Object.entries(data.japanese.words).forEach(([key, value], index) => {
        // console.log(`🔹 Từ ${index + 1}: ${key}`);
        // console.log(`   - Cách đọc: ${value[0]}`);
        // console.log(`   - Nghĩa: ${value[1]}`);


        let div=document.createElement('div');
        div.innerHTML = `
     <div class="boxDetail">

      <div class="boxDetail1">
        <div class="boxDetail-header">
          <span>Từ vựng:</span>

          <div class="flex">
            <div class="circle">
              <img alt="icon" src="../assets/microphone-2.svg" width="16px"  height="16px"/>
            </div >

            <div class="circle1">
              <img alt="icon" src="../assets/volume-high.svg" width="16px"  height="16px"/>

            </div>

          </div>
        </div>

      </div>
      <h1> ${key}</h1>

      <div class="boxText">

        <span>${value[0]}</span>


      </div>
      <div class="boxText">
        <span>${value[1]}</span>

      </div>
    </div>
    
    `;

        sectionMain.appendChild(div);

        div.addEventListener("click", () => {
            loadPopUp(key, value[0], value[1]);
            overlay.style.display = 'block';
            popUp.style.display = 'block';

        })






    });
}


let logoHome = document.getElementById('logoHome');
logoHome.addEventListener('click', () => {
    window.location.href = "../HTML/HomePage.html"
})

let sectionMain = document.getElementById('tableBox');
let overlay = document.getElementById('overlay');
let popUp = document.getElementById('popUp');
overlay.addEventListener('click', function (e) {

    if (e.target === overlay) {
        overlay.style.display = 'none';
        popUp.style.display = 'none';
    }
});



function loadPopUp(key, phonetic1, meaning1){

    let phonetic = document.getElementById('phonetic');
    let meaning = document.getElementById('meaning');
    let japanese = document.getElementById('japanese');


    phonetic.innerText = phonetic1
    meaning.innerText = meaning1
    japanese.innerText = key
    textSpeak = key;
}

let volume = document.getElementById('volume');

volume.addEventListener('click', (e) => {
    speakJapanese(textSpeak)
})


function speakJapanese(text) {
    window.speechSynthesis.cancel(); // Hủy lặp lại nếu đang đọc
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
}


loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";

    }, 1500);
}

