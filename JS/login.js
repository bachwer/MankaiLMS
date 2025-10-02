let ForgetPass = document.getElementById("ForgetPass");
let ForgetPas1 = document.getElementById("ForgetPass1");
let showPass = document.getElementById("showPass");
let check = false;

ForgetPass.addEventListener("click", function () {
    changeLogin();
});

ForgetPas1.addEventListener("click", function () {
    changeLogin();
});

showPass.addEventListener("click", function () {
    let password = document.getElementById("password");
    const isPassword = password.type === "password";

    password.type = isPassword ? "text" : "password";

})


function changeLogin() {
    let headerLogin = document.getElementById("headerLogin");
    let headerLogin2 = document.getElementById("headerLogin2");
    let passwordShow = document.getElementById("passwordShow");
    let emailShow = document.getElementById("emailShow");

    let ForgetPas2 = document.getElementById("ForgetPas2");

    if (check) {
        headerLogin2.style.display = "flex";
        passwordShow.style.display = "flex";
        headerLogin.innerText = "Đăng Nhập";
        emailShow.style.display = "flex";
        ForgetPas1.style.display = "none";
        ForgetPass.style.display = "block";

    } else {
        ForgetPass.style.display = "none";
        ForgetPas1.style.display = "flex";
        emailShow.style.display = "flex";
        passwordShow.style.display = "none";
        headerLogin2.style.display = "none";
        headerLogin.innerText = "Quên Mật Khẩu";
    }

    check = !check;
}

let loginPage = document.getElementById("login");

loginPage.addEventListener("click", async function () {
    await login();
})


async function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
   const check = await checkLogin(email, password);
    if(check === false) {
        const text = "Sài tài khoản hoặc mật khẩu"
        const des = ""
        const color = "#f84d4d"
        await showPopUP(text, des, color)
    }

}


async function checkLogin(email, password) {
    let check = false;

    try {
        const querySnapShot = await db.collection("accountUser").get();
        querySnapShot.forEach((doc) => {
            const dataUser = doc.data();
            if (dataUser.email === email && dataUser.password === password) {
                check = true;
                checkStatusUser(dataUser, doc.id);
            }
        });
    } catch (error) {
        console.error("Lỗi khi kiểm tra đăng nhập:", error);
    }

    return check;
}

async function checkStatusUser(dataUser, code) {
    let text = "";
    let des = "";
    let color = "";
    const status = dataUser.status;


    if (status === "active") {
        console.log("Success")
        dataUser.codeUser = code;
        dataUser.password = "xxxxxxxxxx";
        localStorage.setItem("dataUser", JSON.stringify(dataUser));
        window.location.href = "../HTML/HomePage.html"
        text = "Đăng nhập Thành công"
        des = ""
        color = "#93e686"
        await showPopUP(text, des, color)
    } else if (status === "inactive") {
        text = "Tài Khoản bị chặn"
        des = "Vui lòng liên hệ admin đề được trợ giúp"
        color = "#f84d4d"
        await showPopUP(text, des, color)

    } else if (status === "pending") {
        text = "Chờ xác thự tài khoản"
        des = "Vui lòng liên hệ admin đề được trợ giúp"
        color = "#f3a642"
        await showPopUP(text, des, color)
        console.log("pending")
    } else if(status === "blocked"){
        text = "Tài đã bị khoá"
        des = "Vui lòng liên hệ admin đề được trợ giúp"
        color = "#f84d4d"
        await showPopUP(text, des, color)
    }
}

function changeBackgroundColorWithDelay(element, color, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            element.style.backgroundColor = color;
            resolve(); // báo hiệu đã hoàn tất
        }, delay);
    });
}

async function showPopUP(text, description, color) {
    let popUpStatus = document.getElementById("popUpStatus");
    await changeBackgroundColorWithDelay(popUpStatus, color, 800);
     console.log("sad");


    popUpStatus.style.display = "flex";
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="login-status-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
      </svg>
       <div class="login-status-details">
      <h4 class="login-status-title">${text}</h4>
      <p class="login-status-message">${description}</p>
  </div>
  </div>
  
`;
    popUpStatus.innerHTML = ""; // Clear cũ
    popUpStatus.appendChild(div);

    setTimeout(() => {
        popUpStatus.classList.remove("hide");
        popUpStatus.classList.add("show");

    }, 10);

// Remove after 3s
    setTimeout(() => {
        div.classList.remove("show");
        popUpStatus.classList.add("hide");

        setTimeout(() => {
            popUpStatus.innerHTML = "";
            popUpStatus.style.display = "none";
        }, 400); // đợi hiệu ứng out hoàn tất
    }, 3000);
}
