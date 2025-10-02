const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
let allDataUser = getDataUser();

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
async function getDataUser() {
  const dataUser = [];
  try {
    // Lấy dữ liệu từ Firestore
    const querySnapshot = await db.collection("accountUser").get();

    // Duyệt qua mỗi document và thêm vào mảng dataUser
    querySnapshot.forEach((doc) => {
      dataUser.push({ ...doc.data(), docId: doc.id });
    });

    console.log("Dữ liệu từ Firebase:", dataUser);
    // Cập nhật lại dữ liệu toàn cục
    allDataUser = dataUser;

    await loadData(dataUser, 1);  // Đảm bảo loadData hoạt động chính xác
    createButtonForPagination(dataUser, 1)
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
  }
}



let IDbb;

async function getID(check){

  const docRef = db.collection("idUser").doc("ID");

  docRef.get().then(async (doc) => {
    if (doc.exists) {
      const data = doc.data();
      console.log("Dữ liệu trong document:", data);
      if(check === true){
        await IDUser(data);
      }

      IDbb = data.idUser;
    } else {
      console.log("Không tìm thấy document");
    }
  }).catch((err) => {
    console.error("Lỗi khi lấy dữ liệu:", err);
  });


}
 getID(false)






async function IDUser(IDUser){
  const docRef = db.collection("idUser").doc("ID");
  docRef.update({
    idUser: IDUser.idUser + 1
  })
      .then(() => {
        console.log("Cập nhật thành công!11");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật:", error);
      });
  console.log(IDUser.idUser);

}




let containerAccountUser = document.getElementById("containerAccountUser");
function loadData(dataUser, page){
  const start =(page - 1)* 8;
  let end = start + 8;
  if(dataUser.length < end){
    end = dataUser.length ;
  }

  containerAccountUser.innerHTML= "";
  for(let i = start; i < end; i++) {

    const data = dataUser[i];

    let classStatus;

    if(data.status === "pending"){
      classStatus = "BoxWait";
    }else if(data.status === "active"){
      classStatus = "BoxActive";
    }else if(data.status === "inactive"){
      classStatus = "inactive";
    }else{
      classStatus = "BoxLock";
    }


    let tr = document.createElement("tr");
    tr.innerHTML = `
                    <td>
                    <img src="${data.imgUrl}"  alt="vav"/>
                    <p>${data.name}</p>
                  </td>
                  <td>
                     <div data-index="${i}" class="${classStatus} statusUser">
                      ${data.status}
                      </div>
                  </td>
                  <td>                    
                    ${data.id}
                  </td>
                 
                  <td>${data.birthDate.toString()}</td>
                  <td>
                    <div class="action">
                      <button data-doc-id="${data.docId}" class="edit-btn"><i class="bx bxs-pencil"></i></button>
                      <button data-index="${i}" class="delete-btn"><i class="bx bxs-trash"></i></button>
                    </div>
                  </td>
  `;
    containerAccountUser.appendChild(tr);

  }
}

document.addEventListener("click", async (e) => {
  const target = e.target.closest(".statusUser");
  if (!target) return;

  const index = target.dataset.index;
  if (index === undefined) {
    console.warn("Không tìm thấy data-index.");
    return;
  }

  // Hiển thị modal
  const modalStatus = document.getElementById("userModalContent");
  modalStatus.style.display = "block";
  overlay.style.display = "block";

  console.log("Index được chọn:", index);
  await editStatus(index);
});


//edit status
async function editStatus(index) {
  const data = allDataUser[index];
  const activeOption = document.querySelector('.status-option[data-value="active"]');
  const pendingOption = document.querySelector('.status-option[data-value="pending"]');
  const inactiveOption = document.querySelector('.status-option[data-value="inactive"]');
  const blockedOption = document.querySelector('.status-option[data-value="blocked"]');

  let nameStatus = document.getElementById("nameStatus");
  let emailStatus = document.getElementById("emailStatus");
  let avatarStatus = document.getElementById("avatarStatus");
  let status = document.getElementById("status");

  if (data.status === "pending") {
    const pendingOption = document.querySelector('.status-option[data-value="pending"]');
    removeSelect()
    pendingOption.classList.add("selected");
    status.style.backgroundColor = "#f3e7d0";
    status.style.color = "#eab541";
    status.textContent = "Pending"

  } else if (data.status === "active") {
    const pendingOption = document.querySelector('.status-option[data-value="active"]');
    removeSelect()
    pendingOption.classList.add("selected");
    status.style.color = "#90a56a";
    status.textContent = "Active"
    status.style.backgroundColor = "#d4edda";

  } else if (data.status === "inactive") {
    const pendingOption = document.querySelector('.status-option[data-value="inactive"]');
    removeSelect()
    pendingOption.classList.add("selected");
    status.style.color = "#d32f2f";
    status.textContent = "inactive"
    status.style.backgroundColor = "#e57373";
  } else {
    const pendingOption = document.querySelector('.status-option[data-value="blocked"]');
    removeSelect()
    pendingOption.classList.add("selected");
    status.style.color = "#636768";
    status.textContent = "Lock"
    status.style.backgroundColor = "#90a4ae";
  }

  nameStatus.innerText = data.name;
  emailStatus.innerText = data.email;
  avatarStatus.src = data.imgUrl;


  // change active
  let checkSelect = "";


  function removeSelect() {
    activeOption.classList.remove("selected");
    pendingOption.classList.remove("selected");
    inactiveOption.classList.remove("selected");
    blockedOption.classList.remove("selected");
  }



  activeOption.addEventListener("click", e => {
    removeSelect();
    activeOption.classList.add("selected");
    checkSelect = "active"
  })
  pendingOption.addEventListener("click", e => {
    removeSelect();
    pendingOption.classList.add("selected");
    checkSelect = "pending"

  })
  inactiveOption.addEventListener("click", e => {
    removeSelect();
    inactiveOption.classList.add("selected");
    checkSelect = "inactive"

  })
  blockedOption.addEventListener("click", e => {
    removeSelect();
    blockedOption.classList.add("selected");
    checkSelect = "blocked"

  })
//save status
  const docID = allDataUser[index].docId;
  let userBtnSave = document.getElementById("userBtnSave");

    userBtnSave.addEventListener("click", async (e) => {
      if(checkSelect !== ""){
      const update = {
        status: checkSelect,
      }
      db.collection("accountUser").doc(docID).set(update, {merge: true})
          .then(async () => {
            console.log("Cập nhật thành công!");

            await getDataUser();
          })
          .catch((error) => {
            console.error("Lỗi cập nhật:", error);
          });
    }
      close();
    },{ once: true });



}



document.addEventListener("click", async (e) => {
  if(e.target.closest(".delete-btn")) {
    const btn = e.target.closest(".delete-btn");
    const index = btn.dataset.index;
    const snapshot = await db.collection("accountUser").get();
    const docs = snapshot.docs;
    const docID = docs[index].id
    await deleteElementIObject(docID)
   await  getDataUser();
  }




  if (e.target.closest(".edit-btn")) {
    const btn = e.target.closest("[data-doc-id]");
    const docId = btn?.dataset?.docId;

    if (!docId) {
      console.error("Không tìm thấy docId");
      return;
    }

    // Mở modal
    let studentAccountModal = document.getElementById("studentAccountModal");
    let overlay = document.getElementById("overlay");
    studentAccountModal.style.display = "block";
    overlay.style.display = "block";

    // Xóa tất cả listener cũ trên nút Edit bằng clone
    let EditBtn = document.getElementById("editBtn");
    EditBtn.replaceWith(EditBtn.cloneNode(true));
    EditBtn = document.getElementById("editBtn");

    // Gọi hàm xử lý edit (gán listener mới trong editUser)
    await editUser(docId);
  }




})


//edit
async function editUser(docId) {
  if (!docId) {
    console.error("Không có docId trong phần tử.");
    return;
  }

  try {
    const docRef = db.collection("accountUser").doc(docId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const User = docSnap.data();
      console.log("Dữ liệu người dùng:", User);

      // Điền dữ liệu vào các trường
      document.getElementById("studentEmail").value = User.email;
      document.getElementById("point").value = User.point;
      document.getElementById("fullName").value = User.name;
      document.getElementById("birthDate").value = User.birthDate;
      document.getElementById("hometown").value = User.hometown;
      document.getElementById("classStudent").value = User.classStudent;
      document.getElementById("phoneNumber").value = User.phoneNumber;
      document.getElementById("studentPassword").value = User.password;
      document.getElementById("confirmPassword").value = User.password;
      document.getElementById("gender").value = User.gender;
      document.getElementById("studentPassword").type = "text";
      document.getElementById("confirmPassword").type = "text";

      const idS = User.id;
      let EditBtn = document.getElementById("editBtn");
      let createStudentBtn1 = document.getElementById("createStudentBtn");
      createStudentBtn1.style.display = "none";
      EditBtn.style.display = "block";
      EditBtn.innerText = "Lưu Thay đổi";

      EditBtn.addEventListener("click", (e) => {
        let studentPassword = document.getElementById("studentPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (studentPassword === confirmPassword) {
          let studentEmail = document.getElementById("studentEmail").value;
          let fullName = document.getElementById("fullName").value;
          let birthDate = document.getElementById("birthDate").value;
          let hometown = document.getElementById("hometown").value;
          let classStudent = document.getElementById("classStudent").value;
          let phoneNumber = document.getElementById("phoneNumber").value;
          let gender = document.getElementById("gender").value;
          let point = document.getElementById("point").value;

          const update = {
            id: idS,
            name: fullName,
            password: studentPassword,
            birthDate: birthDate,
            hometown: hometown,
            classStudent: classStudent,
            phoneNumber: phoneNumber,
            email: studentEmail,
            gender: gender,
            point: point,
          };

          console.log("Đang cập nhật vào docId:", docId);
          console.log("Dữ liệu cập nhật:", update);

          // Cập nhật dữ liệu vào Firebase
          db.collection("accountUser")
              .doc(docId)
              .set(update, { merge: true })
              .then(async () => {
                console.log("Cập nhật thành công!");
                close(); // Đóng form sau khi cập nhật thành công
                await getDataUser(); // Cập nhật lại dữ liệu người dùng trên UI
              })
              .catch((error) => {
                console.error("Lỗi cập nhật:", error);
              });
        } else {
          alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        }
      }, { once: true });

    } else {
      console.log("Không tìm thấy document với ID:", docId);
    }
  } catch (error) {
    console.error("Lỗi khi truy xuất document:", error);
  }
}


//delete a element in object
async function deleteElementIObject(id) {
  const docRef = db.collection("accountUser").doc(id);

  docRef.delete()
      .then(() => {
        console.log("Đã xóa document");
      })
      .catch(error => {
        console.error("Lỗi khi xóa document:", error);
      });
}









let addStudent = document.getElementById("addStudent");
addStudent.addEventListener("click", function () {
  let createStudentBtn = document.getElementById("createStudentBtn");
  createStudentBtn.style.display = "block";
  let studentAccountModal = document.getElementById("studentAccountModal");
  let overlay = document.getElementById("overlay");
  studentAccountModal.style.display = "block";
  overlay.style.display = "block";
  let studentEmail = document.getElementById("studentEmail").value = "";
  let studentPassword = document.getElementById("studentPassword").value = "";
  let confirmPassword = document.getElementById("confirmPassword").value = "";
  let point = document.getElementById("point").value = "";
  let fullName = document.getElementById("fullName").value = "";
  let birthDate = document.getElementById("birthDate").value  = "";
  let hometown = document.getElementById("hometown").value  = "";
  let classStudent = document.getElementById("classStudent").value  = "";
  let phoneNumber = document.getElementById("phoneNumber").value  = "";
  let gender = document.getElementById("gender").value  = "";



})

let cancelStudentBtn = document.getElementById("cancelStudentBtn");
cancelStudentBtn.addEventListener("click", (e) => {
  close()


})
let overlay = document.getElementById("overlay");

overlay.addEventListener("click", (e) => {
  close()
})
function close(){
  let studentAccountModal = document.getElementById("studentAccountModal");
  let overlay = document.getElementById("overlay");
  let createStudentBtn = document.getElementById("editBtn");
  let modalStatus = document.getElementById("userModalContent");
  modalStatus.style.display = "none";
  createStudentBtn.style.display = "none";
  studentAccountModal.style.display = "none";
  overlay.style.display = "none";
  createStudentBtn.innerText = "Tạo Tài Khoản"

}


//add
let createStudentBtn = document.getElementById("createStudentBtn");
createStudentBtn.addEventListener("click", async (e) => {
  let studentEmail = document.getElementById("studentEmail").value;
  let studentPassword = document.getElementById("studentPassword").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let fullName = document.getElementById("fullName").value;
  let birthDate = document.getElementById("birthDate").value;
  let hometown = document.getElementById("hometown").value;
  let classStudent = document.getElementById("classStudent").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let gender = document.getElementById("gender").value;

  if (studentEmail === "" || studentPassword === "" || fullName === "" || birthDate === "" || hometown === "" || confirmPassword === ""
      || classStudent === "" || phoneNumber === ""|| gender === "") {
    console.log("error");
  } else {
    if (studentPassword === confirmPassword) {
      console.log("create student");
      const accountStudent = [
        {
          id: IDbb,
          name: fullName,
          password: studentPassword,
          birthDate: birthDate,
          hometown: hometown,
          classStudent: classStudent,
          phoneNumber: phoneNumber,
          email: studentEmail,
          status: "pending",
          imgUrl: "https://res.cloudinary.com/dvbxj8sdd/image/upload/v1746361232/rw0pr6gwtmjfx4zpmhc1.webp",
          gender: gender,
          point: 0,
        }
      ]

      await recreateTopics(accountStudent)
      await getID(true);


      close();
      await getDataUser()
    }
  }
})
async function recreateTopics(accountStudent) {
  const batch = db.batch();
  const colRef = db.collection("accountUser");

  accountStudent.forEach(topic => {
    const newDoc = colRef.doc();
    batch.set(newDoc, {
      ...topic,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  });

  try {
    await batch.commit();
    console.log("Đã ghi lại toàn bộ topicsWord!");
  } catch (err) {
    console.error("Lỗi khi ghi dữ liệu:", err);
  }
}
let closeStudentModal = document.getElementById("closeStudentModal");
closeStudentModal.addEventListener("click", (e) => {
  close();
})










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
      loadData(data, currentPage);
      createButtonForPagination(data, currentPage);

    })

  }
}

let searchUser = document.getElementById("searchUser");
searchUser.addEventListener("input", (e) => {
  const dataSearch = [];
  const keyword = searchUser.value;
  allDataUser.forEach(item => {
    if (item.name && item.name.toLowerCase().includes(keyword.toLowerCase())) {
      dataSearch.push(item);
    }
  });

  loadData(dataSearch, 1);
  createButtonForPagination(dataSearch, 1)

})















