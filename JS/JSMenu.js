let userData = JSON.parse(localStorage.getItem('dataUser'));
let codeUser =userData.codeUser;

updateLocal()
async function updateLocal() {
    try {
        const querySnapShot = await db.collection("accountUser").get();
        querySnapShot.forEach((doc) => {
            const dataUser = doc.data();
            if (doc.id === codeUser) {
                dataUser.codeUser = doc.id;
                dataUser.password = "xxxxxxxxxx";
                localStorage.setItem("dataUser", JSON.stringify(dataUser));
            }
        });

    } catch (error) {
        console.error("Lỗi khi kiểm tra đăng nhập:", error);
    }
}






dataInfo()
function dataInfo(){
    let nameInfo =  document.getElementById('nameInfo');
    let emailInfo =  document.getElementById('emailInfo');
    const avatarImg = document.querySelectorAll(".Avatar");
    nameInfo.textContent = userData.name;
    emailInfo.textContent = userData.email;

    avatarImg.forEach(img => {
        img.src = userData.imgUrl;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.objectFit= "cover";

        img.style.borderRadius = "50%";
    });
}

let logoHome1 = document.getElementById('logoHome');
logoHome1.addEventListener('click', () => {
    window.location.href = "../HTML/HomePage.html"
})

let topicPage = document.getElementById("topicPage");
topicPage.addEventListener("click", function() {
    window.location.href = "../HTML/1.2ListTopic.html"
})

let testPage = document.getElementById("testPage");
testPage.addEventListener("click", () => {
    window.location.href = "../HTML/flow3_1-2.html"
})



