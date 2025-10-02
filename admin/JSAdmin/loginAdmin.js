let login = document.getElementById('loginii');

login.addEventListener('click', (e) => {
    e.preventDefault(); // Ngăn form submit mặc định

    // Lấy giá trị từ form - sửa id passwordA
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('passwordA').value;
    let Notification = document.getElementById('Notification');

    // Log giá trị để debug
    console.log("Email:", email);
    console.log("Password:", password);

    // Kiểm tra thông tin đăng nhập - thêm kiểm tra password
    if(email === "admin@gmail.com" && password === "admin1234") {
        console.log("Login success - redirecting");
        // Đăng nhập thành công - chuyển hướng
        window.location.href = "./HTMLAdmin/index1.html";
    } else {
        console.log("Login failed");
        // Đăng nhập thất bại - hiển thị thông báo
        Notification.innerText = "Sai Email hoặc Password";
        Notification.style.color = "red";
        Notification.style.fontSize = "12px";
    }
});