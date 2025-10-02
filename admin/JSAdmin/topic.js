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


// Dữ liệu mẫu - các chủ đề học tiếng Nhật
// get data
function getDataFromFirestore() {
  const data = [];
  db.collection("topicsWord").get()
      .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, ...doc.data()});
        });
        console.log("Dữ liệu từ Firebase:", data);
        loadContentTopic(data, 1)
        createButtonForPagination(data, 1);
        CalculatorWord(data);

      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
      });
  return data;
}

const allData = getDataFromFirestore();


//delete a element in object
async function deleteElementIObject(id) {
  // let docID = await findDocIDByInnerID(id);
  const docRef = db.collection("topicsWord").doc(id);

  docRef.delete()
      .then(() => {
        console.log("Đã xóa document");
      })
      .catch(error => {
        console.error("Lỗi khi xóa document:", error);
      });

  //
  // async function findDocIDByInnerID(targetID) {
  //   const snapshot = await db.collection("topicsWord").get();
  //
  //   let foundDocID = null;
  //
  //   snapshot.forEach(doc => {
  //     const data = doc.data();
  //     if (data.id === targetID) {
  //       foundDocID = doc.id;
  //     }
  //   });
  //
  //   if (foundDocID) {
  //     console.log(`Tìm thấy docID: ${foundDocID}`);
  //     return foundDocID;
  //   } else {
  //     console.log("Không tìm thấy document với id =", targetID);
  //     return null;
  //   }
  // }

}

//add element

function addElement(newItem){
  db.collection("topicsWord").add(newItem)
      .then(docRef => {
        console.log("Đã thêm document với docID:", docRef.id);
      })
      .catch(error => {
        console.error("Lỗi khi thêm document:", error);
      });
}













function loadContentTopic(data, page) {
  const start =(page - 1)* 8;
  let end = start + 8;
  if(data.length < end){
    end = data.length ;
  }

  let contentTopic = document.getElementById("contentTopic");
  contentTopic.innerHTML= "";
  for(let i = start; i < end; i++) {
    let topic = data[i]
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>
      <p>${topic.title}</p>
    </td>
    <td>${Object.keys(topic.japanese.words).length} từ</td>
    <td>
      <div class="action">
        <button class="edit-btn" data-index="${i}"><i class="bx bxs-pencil"></i></button>
        <button class="delete-btn" data-index="${i}"><i class="bx bxs-trash"></i></button>
      </div>
    </td>`;

    contentTopic.appendChild(tr);
  }
}


// sự kiện delete và edit của topic !!!
document.addEventListener("click", async (e) => {
  if (e.target.closest(".edit-btn")) {
    const btn = e.target.closest(".edit-btn");
    const index = btn.dataset.index;
    vocabularyModal.style.display = "flex";
    overlay.style.display = "block";

    showDetailVocabulary(allData[index], index);

  }

  if (e.target.closest(".delete-btn")) {
    const btn = e.target.closest(".delete-btn");
    const index = btn.dataset.index;
    const snapshot = await db.collection("topicsWord").get();
    const docs = snapshot.docs;
    const docID = docs[index].id
    await deleteElementIObject(docID)
    getDataFromFirestore();

  }
});





let indexTopic;

function showDetailVocabulary(topic, index){

  let titleVocabulary = document.getElementById("titleVocabulary");
  let numberWord = document.getElementById("numberWord");
  let contentWords = document.getElementById("contentWords");
  let num  = Object.keys(topic.japanese.words).length;
  titleVocabulary.innerText = topic.title;


  numberWord.innerText = num.toString();


  contentWords.innerHTML = "";
  for(let i = 0; i < num; i++) {
    const keys = Object.keys(topic.japanese.words);
    const key = keys[i];
    let div = document.createElement("div");
    const [romaji, meaning] = topic.japanese.words[key];

    div.innerHTML = `
    
    <div class="word-item">
            <div class="word-info">
              <h3 class="word-text">${key}</h3>
              <p  class="word-phonetic">/${romaji}/</p>
              <p  class="word-meaning">${meaning}</p>
            </div>
            <div class="word-actions">
              <button data-text="${key}" class="audio-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button data-index="${i}" data-index1="${index}" class="edit-btn1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9313 1.98855C15.2179 1.86959 15.5254 1.80683 15.8354 1.80313C16.1454 1.79943 16.4544 1.85486 16.7437 1.96718C17.033 2.07951 17.2967 2.24704 17.5206 2.46093C17.7445 2.67482 17.9241 2.93095 18.05 3.21476C18.1758 3.49856 18.2453 3.80871 18.2553 4.12304C18.2652 4.43737 18.2153 4.75115 18.108 5.04431C18.0007 5.33747 17.838 5.60418 17.628 5.83334L6.49998 16.9583L1.66665 18.3333L3.04165 13.5L14.166 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
    `;

    contentWords.appendChild(div);

  }

  indexTopic = index;



}
document.addEventListener("click", (e) => {
  if (e.target.closest(".audio-btn")) {
    const btn = e.target.closest(".audio-btn");
    const index = btn.dataset.text;
    console.log(index);
    speakJapanese(index);
  }
});

function speakJapanese(text) {
  window.speechSynthesis.cancel(); // Hủy lặp lại nếu đang đọc
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  window.speechSynthesis.speak(utterance);
}




document.addEventListener("click", (e) => {
  if (e.target.closest(".edit-btn1")) {
    const btn = e.target.closest(".edit-btn1");
    console.log("hello");
    let index = null;
    let index2 = null
     index = btn.dataset.index;
     index2 = btn.dataset.index1;

    editWord(index, index2)
  }


});

// edit: delete, edit
function editWord(index, index2){


  let saveWordBtn = document.getElementById("saveWordBtn");
  let editBtn = document.getElementById("editBtn");
  saveWordBtn.style.display = "none";
  editBtn.style.display = "block";
  let deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.style.display = "block";
  let topic = allData[index2];

  const keys = Object.keys(topic.japanese.words);
  const key = keys[index];
  const [romaji, meaning] = topic.japanese.words[key];

  let popUpDetail1 = document.getElementById("popUpDetail1");
  popUpDetail1.style.display = "block";
  let wordInput = document.getElementById("wordInput");
  let meaningInput = document.getElementById("meaningInput");
  let phoneticInput = document.getElementById("phoneticInput");

  wordInput.value = key;
  meaningInput.value = meaning;
  phoneticInput.value = romaji;


  //edit word


  editBtn.addEventListener("click", async () => {
    if (index2 === null || key === null){
      console.log("sadda");
      return;
    }

    const snapshot = await db.collection("topicsWord").get();
    const docs = snapshot.docs;
    const doc = docs[index2];
    const docId = doc.id;
    console.log(docId);



    const updates = {};

    if (wordInput.value !== key) {
      updates[`japanese.words.${wordInput.value}`] = [phoneticInput.value, meaningInput.value];
      updates[`japanese.words.${key}`] = firebase.firestore.FieldValue.delete();
    } else {
      updates[`japanese.words.${key}`] = [phoneticInput.value, meaningInput.value];
    }

    await db.collection("topicsWord").doc(docId).update(updates);
    console.log("Đã cập nhật thành công!");


    popUpDetail1.style.display = "none";
    editBtn.style.display = "none";


    location.reload();
  });

  //delete word

  deleteBtn.addEventListener("click", async () => {
    if (index2 === null || key === null){
      console.log("sadda");
      return;
    }

    const snapshot = await db.collection("topicsWord").get();
    const docs = snapshot.docs;
    const doc = docs[index2];
    const docId = doc.id;

    const updates = {
      [`japanese.words.${key}`]: firebase.firestore.FieldValue.delete()
    };

    await db.collection("topicsWord").doc(docId).update(updates);

    popUpDetail1.style.display = "none";
    editBtn.style.display = "none";



    close();
    getDataFromFirestore();
  });


}










//popUp: thêm từ vựng vào fireBase
let vocabularyModal = document.getElementById("vocabularyModal");
let cancelBtn =document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", () => {
  close();
})
let overlay = document.getElementById("overlay");
overlay.addEventListener("click", (e) => {
  close();
})
function close(){
  let popUp = document.getElementById("popUpDetail");

  let popUpDetail1 = document.getElementById("popUpDetail1");
  let editBtn = document.getElementById("editBtn");
  popUpDetail1.style.display = "none";
  vocabularyModal.style.display = "none";
  overlay.style.display = "none";
  popUp.style.display = "none";
  saveWordBtn.style.display = "block";
  editBtn.style.display = "none";


}
let btnAdd  = document.getElementById("btnAdd");
btnAdd .addEventListener("click", (e) => {
  let popUp = document.getElementById("popUpDetail");
  overlay.style.display = "block";
  popUp.style.display = "block";
})

let addTopicBtn = document.getElementById("addTopicBtn");

addTopicBtn.addEventListener("click", (e) => {
  let topic = document.getElementById("topic").value;
  let descriptionTopicAdd = document.getElementById("descriptionTopicAdd");

  if(topic === ""){
    descriptionTopicAdd.style.color = "red";
    descriptionTopicAdd.innerText = "Không được bỏ trống !!";
    console.log("error");
    return 1;
  }else{
    const newItem = {
    title: topic,
    japanese: {
        words: {},
    },
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
};
  addElement(newItem);
    close()
    getDataFromFirestore();
  }
})




//popUp: show từ vưng của chủ đề
let closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", (e) => {
  vocabularyModal.style.display = "none";
  overlay.style.display = "none";

})

//pop add từ vựng và sửa + xoá
let addWordBtn = document.getElementById("addWordBtn");
let popUpDetail1 = document.getElementById("popUpDetail1");

addWordBtn.addEventListener("click", (e) => {
  popUpDetail1.style.display = "block";
  let editBtn = document.getElementById("editBtn");
  let deleteBtn = document.getElementById("deleteBtn");
  let wordInput = document.getElementById("wordInput");
  let meaningInput = document.getElementById("meaningInput");
  let phoneticInput = document.getElementById("phoneticInput");
  deleteBtn.style.display = "none";
  editBtn.style.display = "none";
  wordInput.value = "";
  meaningInput.value = "";
  phoneticInput.value = "";

})

// btn close
let cancelBtn1 = document.getElementById("cancelBtn1");
cancelBtn1.addEventListener("click", (e) => {
  let popUpDetail1 = document.getElementById("popUpDetail1");
  let editBtn = document.getElementById("editBtn");
  popUpDetail1.style.display = "none";
  editBtn.style.display = "none";
  saveWordBtn.style.display = "block";



});
let closePopup1 = document.getElementById("closePopup1");
closePopup1.addEventListener("click", (e) => {
  let popUpDetail1 = document.getElementById("popUpDetail1");
  let editBtn = document.getElementById("editBtn");
  popUpDetail1.style.display = "none";
  editBtn.style.display = "none";
  saveWordBtn.style.display = "block";


})
let saveWordBtn = document.getElementById("saveWordBtn");

saveWordBtn.addEventListener("click", async (e) => {
  let wordInput = document.getElementById("wordInput").value;
  let meaningInput = document.getElementById("meaningInput").value;
  let phoneticInput = document.getElementById("phoneticInput").value;


  if (wordInput === "" || meaningInput === "" || phoneticInput === "") {
    console.log("error");
  } else {
    console.log("lưu");

    const snapshot = await db.collection("topicsWord").get();
    const docs = snapshot.docs;
    const doc = docs[indexTopic];
    const docId = doc.id;

    allData[indexTopic].japanese.words[wordInput] = [phoneticInput, meaningInput];
    await db.collection("topicsWord").doc(docId).update({
      "japanese.words": allData[indexTopic].japanese.words
    });

    popUpDetail1.style.display = "none";

  }

  close();
  getDataFromFirestore()

})

let closePopup = document.getElementById("closePopup");

closePopup.addEventListener("click", (e) => {
  close();
})

//CRUD





function createButtonForPagination(data, currentPage){

  const pageSize = 8;
  const totalPage = Math.ceil(data.length / pageSize);
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  create("<", currentPage !== 1);

  for(let i = 1; i <= totalPage ; i++){
    create(i, currentPage !== i, i);
  }
  create(">", currentPage !== totalPage);

  function create(i, check, value){
    let button = document.createElement("button");
    button.innerText = i.toString();




    if(check === false){
      button.classList.add("disable");
      button.disabled = true;
    }
    pagination.appendChild(button);

    button.addEventListener("click", (e) => {


      if(i === "<"){
        currentPage = currentPage  - 1;
      }else if(i === ">" ){
        currentPage = currentPage  + 1;
      }else{
        currentPage = value;
      }
      console.log(i);
      console.log(currentPage);
      loadContentTopic(data, currentPage);
      createButtonForPagination(data, currentPage);

    })

  }
}



let searchTopic = document.getElementById("searchTopic");
searchTopic.addEventListener("input", (e) => {
  const dataSearch = [];
  const keyword = searchTopic.value;
  allData.forEach(item => {
    if (item.title && item.title.toLowerCase().includes(keyword.toLowerCase())) {
      dataSearch.push(item);
    }
  });

  loadContentTopic(dataSearch, 1);
  createButtonForPagination(dataSearch, 1)

})












