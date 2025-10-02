let topicLink = document.getElementById("topicLink");
let studentLink = document.getElementById("studentLink");
let dashboardLink = document.getElementById("dashboardLink");
let messageLink = document.getElementById("messageLink"); //courses
let addExamLink = document.getElementById("addExamLink");
let logoutLink = document.getElementById("logoutLink");
topicLink.addEventListener("click", function() {
    window.location.href = "../HTMLAdmin/topic.html";
});

studentLink.addEventListener("click", function() {
    window.location.href = "../HTMLAdmin/student.html";
});

dashboardLink.addEventListener("click", function() {
    window.location.href = "../HTMLAdmin/index1.html";
});
messageLink.addEventListener("click", function() {
    window.location.href = "../HTMLAdmin/Courses.html";
})

addExamLink.addEventListener("click", function() {
    window.location.href = "../HTMLAdmin/addExam.html";
})
logoutLink.addEventListener("click", function() {
    window.location.href = "../loginAdmin.html";
})