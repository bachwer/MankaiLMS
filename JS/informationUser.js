


if(userData === null){
    window.location.href = "../HTML/index.html";
}else{
    loadData();
    dataInfo()

}


function dataInfo(){
    let nameInfo =  document.getElementById('nameInfo');
    let emailInfo =  document.getElementById('emailInfo');

    nameInfo.textContent = userData.name;
    emailInfo.textContent = userData.email;
}






let linkimg;


function loadData(){
    document.getElementById('fullName').value = userData.name;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phoneNumber;
    document.getElementById('birthDate').value  = userData.birthDate;
    document.getElementById('class').value  = userData.classStudent;
    document.getElementById('gender').value  = userData.gender;
    document.querySelector("#avatarImg").src = userData.imgUrl;


}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('updateInfoForm');
    const successMessage = document.getElementById('successMessage');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // Xử lý sự kiện nút Lưu
    form.addEventListener('submit', function(e) {
        e.preventDefault();// Chặn hành vi gửi form và reload lại..

        const name = document.getElementById('fullName').value;
        const studentEmail = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phone').value;
        const birthDate = document.getElementById('birthDate').value;
        const classStudent = document.getElementById('class').value;
        const gender = document.getElementById('gender').value;




        if (!name || !studentEmail || !birthDate  || !phoneNumber || !classStudent || !gender) {
            console.log("error");
            return;
        }

        const imgUrlOK = linkimg ?? userData.imgUrl;

        const docId = userData.codeUser;
        const update = {
            name: name,
            studentEmail: studentEmail,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
            classStudent: classStudent,
            imgUrl: imgUrlOK,
            gender: gender,

        };
        db.collection("accountUser").doc(docId).set(update, { merge: true })



        function getDataById(docId) {
            const docRef = db.collection("accountUser").doc(docId);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Dữ liệu của document:", doc.data());
                    const data = doc.data(); // Trả về dữ liệu của document

                    data.codeUser = doc.id;
                    data.password = "xxxxxxxxxx";
                    localStorage.setItem("dataUser", JSON.stringify(data));

                } else {
                    console.log("False");
                    return null;
                }
            }).catch((error) => {
                console.error(error);
            });
        }


        saveBtn.textContent = 'Đang lưu...';
        saveBtn.disabled = true;

        setTimeout(function() {

            successMessage.style.display = 'block';
            saveBtn.textContent = 'Lưu thay đổi';
            saveBtn.disabled = false;


            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 2500);
            getDataById(docId);


            window.scrollTo(0, 0);
        }, 1500);
    });

    cancelBtn.addEventListener('click', function() {
        window.location.href = '../HTML/HomePage.html';
    });

    const uploadBtn = document.querySelector('.upload-btn');
    uploadBtn.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        document.body.appendChild(fileInput);
        fileInput.click();

        fileInput.addEventListener('change', function() {
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const avatarImg = document.querySelector('.avatar-container img');
                    avatarImg.src = e.target.result;
                }
                getLinkImg(fileInput.files[0]);
                reader.readAsDataURL(fileInput.files[0]);
            }

            document.body.removeChild(fileInput);
        });
    });
});


// let avatarImg = document.getElementById('avatarImg');
// avatarImg.src = userData.imgUrl;








async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_avatar"); // Đảm bảo đây là upload preset đúng

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dvbxj8sdd/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // Kiểm tra nếu có lỗi trong dữ liệu trả về
    if (data.error) {
      console.error("Lỗi từ Cloudinary:", data.error.message);
      return;
    }

    // Trả về link ảnh nếu upload thành công
    return data.secure_url;
  } catch (error) {
    console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
  }
}

async function getLinkImg(file) {
  try {

    // 3. Gửi file lên Cloudinary
    const imageUrl = await uploadToCloudinary(file);
    console.log("✅ Link ảnh:", imageUrl);
      linkimg = imageUrl;
      console.log(linkimg);
      return imageUrl;
  } catch (error) {
    console.error("Lỗi trong getLinkImg:", error);
  }
}


let signOut = document.getElementById("signOut");

signOut.addEventListener("click", () => {
    localStorage.setItem("dataUser", "");
    window.location.href = "../index.html";

})















