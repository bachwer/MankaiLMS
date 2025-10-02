const firebaseConfig = {
    apiKey: "AIzaSyAYhyWOd16esWth8oQzMyr7CmHNqv5Xkc0",
    authDomain: "mankai-lms.firebaseapp.com",
    projectId: "mankai-lms",
    storageBucket: "mankai-lms.appspot.com",
    messagingSenderId: "767393239881",
    appId: "1:767393239881:web:1dac624ab9e448b6648098"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); //


// Đăng nhập ẩn danh
auth.signInAnonymously()
    .then(() => {
        console.log("Đã đăng nhập ẩn danh");

    })
    .catch(error => {
        console.error("Lỗi đăng nhập:", error);
    });

