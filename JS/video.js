document.addEventListener("DOMContentLoaded", function () {

let ID = localStorage.getItem('IdCourse');
let indexLesson =localStorage.getItem('indexLesson');
getDataCourses();

console.log(ID);
let data;
function getDataCourses(){
  const dataCourses = [];
  db.collection("courses").doc(`${ID}`).get()
      .then((doc) => {
        if (doc.exists) {
          dataCourses.push({ id: doc.id, ...doc.data() });

          console.log(dataCourses);
          console.log(index)
          data = dataCourses;
          loadVideo();

        } else {
          console.log("Document does not exist");
        }
      })
      .catch((error) => {
        console.log("false", error);
      });

}




  const popup = document.getElementById("custom-popup");
  const closePopup = document.getElementById("close-popup");
  const continueVideo = document.getElementById("continue-video");
  let player;
  let lastTime = 0;
  let checkInterval = null;


  // Load YouTube API

  function loadAPIVideo(){
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    // API ready
    window.onYouTubeIframeAPIReady = function () {
      const iframe = document.getElementById('youtube-player');
      const videoId = iframe.getAttribute('data-video-id');
      // YT.Player là một constructor được cung cấp bởi YouTube API
      player = new YT.Player('youtube-player', {
        videoId: videoId,
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    };

  }









  function loadVideo(){
    let containerMainVideo = document.getElementById("containerMainVideo")


    containerMainVideo.innerHTML =`

     <iframe id="youtube-player" width="100%" height="500"
          src="https://www.youtube.com/embed/${data[0].Lesson[indexLesson].video.idVideo}?enablejsapi=1" title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>

    `;

    loadAPIVideo()


    let description = document.getElementById("description");

    description.innerHTML =data[0].Lesson[index].video.description;
  }




  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
      if (checkInterval) clearInterval(checkInterval);

      checkInterval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        if (currentTime > lastTime + 2) {
          player.pauseVideo();
          popup.classList.remove("hidden");
        } else {
          lastTime = currentTime;
        }
      }, 1000);
    } else {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
    }
  }

// Xử lý nút bấm
  closePopup.addEventListener("click", function () {
    popup.classList.add("hidden");
    player.seekTo(0);
  });

  continueVideo.addEventListener("click", function () {
    popup.classList.add("hidden");
    player.seekTo(lastTime);
    player.playVideo();

  });






  // RENDER DOWNLOAD FILES
  function renderFileCard() {
    const fileCard = document.getElementById('tab-content-document');
    fileCard.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      fileCard.innerHTML += `
            <div class="file-card">
            <div class="file-info">
              <img src="../assets/Group.svg" alt="logoFile" class="file-icon">
              <div class="file-meta">
                <p class="file-name">Tên file</p>
                <span class="file-size">10MB</span>
              </div>
            </div>
            <div class="icon-download">

              <a href="https://drive.google.com/uc?export=download&id=1PsXTE2vVjfSdq1yKuRqVEe-fjgONqHOe" download><img
                  src="../assets/download.svg" alt="icon-download"></a>
            </div>
          </div>
      `;
    }
  }
  // renderFileCard();

  // XỬ LÝ BÌNH LUẬNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  const commentInput = document.querySelector('.comment-input input');
  const sendButton = document.querySelector('.comment-input .send-btn');
  const commentsContainer = document.querySelector('.tab-content[data-content="discussion"]');
  const commentCount = document.querySelector('.comment-count');

  // Số lượng bình luận ban đầu (1 bình luận đã có sẵn)
  let commentCounter = 1;
  updateCommentCount();

  // Thêm sự kiện khi nhấn nút gửi
  sendButton.addEventListener('click', function () {
    addNewComment();
  });

  // Thêm sự kiện khi nhấn Enter trong ô input
  commentInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addNewComment();
    }
  });

  // Lắng nghe sự kiện click cho nút phản hồi (bao gồm cả bình luận hiện tại và tương lai)
  commentsContainer.addEventListener('click', function (e) {
    if (e.target.c.contains('reply')) {
      // Focus vào ô input và đặt placeholder để chỉ ra rằng đang phản hồi
      commentInput.focus();
      commentInput.placeholder = "Viết phản hồi của bạn...";
    }
  });

  // Hàm thêm bình luận mới
  function addNewComment() {
    const text = commentInput.value.trim();
    if (text === '') return;

    // Tạo phần tử bình luận mới
    const newComment = document.createElement('div');
    newComment.className = 'comment';

    // Lấy thời gian hiện tại
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;

    // Tạo nội dung HTML cho bình luận
    newComment.innerHTML = `
      <img src="../../assets/avatar.svg" alt="avatar" class="avatar">
      <div class="comment-body">
        <p class="comment-author">Người dùng</p>
        <p class="comment-text">${text}</p>
        <p class="comment-meta">${formattedDate} · <span class="reply">Phản hồi</span></p>
      </div>
    `;

    // Thêm bình luận vào container
    commentsContainer.appendChild(newComment);

    // Tăng số lượng bình luận và cập nhật hiển thị
    commentCounter++;
    updateCommentCount();

    // Xóa nội dung input và đặt lại placeholder
    commentInput.value = '';
    commentInput.placeholder = "Bạn muốn thảo luận vấn đề gì?";
  }

  // Hàm cập nhật số lượng bình luận
  function updateCommentCount() {
    commentCount.textContent = `${commentCounter} bình luận`;
  }
  // };
});
document.getElementById("toggle-tab").addEventListener("click", function () {
  const tabContainer = document.querySelector(".tab-container");
  tabContainer.classList.toggle("collapsed");
});
function toggleTab() {
  const tabIcon = document.querySelector("#toggle-tab img");
  if (tabIcon) {
    tabIcon.style.transform = "rotate(180deg)";
  }
}
// Tab button
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabButtons.forEach(button => {
  button.addEventListener("click", function () {
    const targetTab = this.getAttribute("data-tab");

    tabButtons.forEach(btn => btn.classList.remove("active"));

    tabContents.forEach(content => content.style.display = "none");

    const targetContent = document.querySelector(`.tab-content[data-content="${targetTab}"]`);
    if (targetContent) {
      targetContent.style.display = "block";
    }

    this.classList.add("active");
  });

});
let progressInterval = null;







