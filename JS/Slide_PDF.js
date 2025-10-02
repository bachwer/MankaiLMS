document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("custom-popup");



    // RENDER DOWNLOAD FILES
    function renderFileCard() {
        const fileCard = document.getElementById('tab-content-document');
        fileCard.innerHTML = ` `;
        for (let i = 0; i < 4; i++) {
            fileCard.innerHTML += `
              <div class="file-card">
              <div class="file-info">
                <img src="../../assets/Group.svg" alt="logoFile" class="file-icon">
                <div class="file-meta">
                  <p class="file-name">Tên file</p>
                  <span class="file-size">10MB</span>
                </div>
              </div>
              <div class="icon-download">
  
                <a href="https://drive.google.com/uc?export=download&id=1lFl0U59zIStg7qZxXC7ZK_9hzc_vq0UQ" download><img
                    src="../../assets/download.svg" alt="icon-download"></a>
              </div>
            </div>
        `;
        }
    }
    renderFileCard();

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
        if (e.target.classList.contains('reply')) {
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
    function loadPDF(link) {
        let loadPDF = document.getElementById('loadPDF');
        loadPDF.innerHTML = `
                   <iframe src="${link}" width="100%"
                  height="600px" allow="autoplay"></iframe>

    `;
    }
    function renderDescription(html) {
        const description = document.getElementById('description');
        description.innerHTML = html
    }


    loadData()
    function loadData() {
        const spinner = document.getElementById("spinnerContainer");
        spinner.style.display = "flex";

        setTimeout(() => {
            spinner.style.display = "none";

            // renderDescription();
            loadPDF(PDFLink.linkPDf);
            renderDescription(PDFLink.description);
            console.log(PDFLink)
            console.log(PDFLink.linkPDf)

        }, 3000);
    }




});

document.getElementById("toggle-tab").addEventListener("click", function () {
    const tabContainer = document.querySelector(".tab-container");
    tabContainer.classList.toggle("collapsed");
    toggleTab();
});
function toggleTab() {
    const tabIcon = document.querySelector("#toggle-tab img");
    if (tabIcon) {
        // Kiểm tra trạng thái xoay hiện tại
        const currentRotation = tabIcon.style.transform;
        // Nếu đang xoay 180 độ thì reset về 0, ngược lại xoay 180 độ
        tabIcon.style.transform = currentRotation === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
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



