document.addEventListener("DOMContentLoaded", function () {
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







    let descripObj = [
        {
            MaincontentDescrip: `Lorem ipsum dolor sit amet consectetur:`,
            SubcontentDescrip: `Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius adipiscing ipsum pharetra. Semper ullamcorper malesuada ut auctor scelerisque. Sit morbi pellentesque adipiscing pellentesque habitant ullamcorper est. In dolor sit platea faucibus ut dignissim pulvinar.`,
            MainListcontentDescrip: `Semper lacinia non lectus mauris sed eget scelerisque facilisis donec:`,
            ListcontentDescrip: `Tellus molestie leo gravida feugiat. Ipsum est lacus lobortis accumsan eget.`,
            Listcontent1Descrip: `Sit parturient viverra ut cursus. Vestibulum non et ullamcorper fermentum fringilla est.`,
            Listcontent2Descrip: `A nullam diam rhoncus pellentesque eleifend risus ut libero. Eget gravida fermentum nisi dignissim senectus pellentesque egestas. Pellentesque scelerisque arcu congue lorem. In quis sagittis netus lacinia ut vitae. Vitae quam nunc quis libero in. Viverra purus elementum risus feugiat in est. Ut sit a erat ante aliquam. Nec viverra nibh orci erat feugiat viverra viverra sit faucibus.`,
        }
    ];



    function renderDescription() {
        const description = document.getElementById('description');

        description.innerHTML = `
                <b>${descripObj[0].MaincontentDescrip}</b>
                <p>${descripObj[0].SubcontentDescrip}</p>
                <b>${descripObj[0].MainListcontentDescrip}</b>
                <ul>
                  <li>${descripObj[0].ListcontentDescrip}</li>
                  <li>${descripObj[0].Listcontent1Descrip}</li>
                  <li>${descripObj[0].Listcontent2Descrip}</li>
                </ul>
          `;
    }
    renderDescription();

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
    
                  <a href="https://drive.google.com/uc?export=download&id=16dZfjEi7czlTGA1K_JBPYvMJVG-6JKHz" download><img
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

    const btnTurnIn = document.getElementById("btn-turnIn");
    btnTurnIn.addEventListener("click", function () {
        const handIn = document.getElementById("handIn");
        handIn.style.display = "block";
    });

    const btnCloseTab = document.getElementById("close-tab");
    btnCloseTab.addEventListener("click", function () {
        const handIn = document.getElementById("handIn");
        handIn.style.display = "none";
        if (countFile > 0) {
            btnTurnIn.innerHTML = `Lịch sử nộp bài`;
        } else {
            btnTurnIn.innerHTML = ` Nộp bài`;
        }
    });
    //FILEUPLOADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
    // Khai báo mảng lưu trữ file
    const fileStorage = [];
    let countFile = 0;

    // Xử lý upload file
    const uploadButton = document.getElementById('upload');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/svg+xml,image/png,image/jpeg,image/gif';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    const containerUp = document.querySelector('.container-up');

    // Sự kiện click vào nút upload
    uploadButton.addEventListener('click', function () {
        fileInput.click();
    });
    // Sự kiện chọn file từ input
    fileInput.addEventListener('change', function (event) {
        const files = event.target.files;
        processFiles(files);
        // Reset lại input để có thể chọn lại file đã upload
        fileInput.value = '';
    });


    // Thêm file vào storage và hiển thị
    function addFileToStorage(file) {
        // Thêm file vào mảng lưu trữ
        const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        fileStorage.push({
            id: fileId,
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            data: file,
            status: 'uploading' // 'uploading', 'completed', 'error'
        });

        // Hiển thị file đang upload
        renderUploadingFile(fileId, file.name, formatFileSize(file.size));

        // Mô phỏng quá trình upload
        simulateFileUpload(fileId);
    }

    // Hàm hiển thị file đang tải lên
    function renderUploadingFile(id, name, size) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.id = id;

        fileItem.innerHTML = `
        <div class="file-icon"><img src="../../assets/File Icon.svg"></div>
        <div class="file-info">
            <div class="name">${name}</div>
            <div class="size">${size} <span class="file-status">Đang tải lên...</span></div>
            <div class="progress-bar">
                <div class="progress-inner" style="width: 0%"></div>
            </div>
        </div>
        <div class="file-action"><img src="../../assets/x.svg"></div>
    `;

        containerUp.appendChild(fileItem);

        // Thêm sự kiện hủy upload
        const cancelButton = fileItem.querySelector('.file-action');
        cancelButton.addEventListener('click', function () {
            cancelUpload(id);
        });
    }

    // Hàm hiển thị file đã tải lên thành công
    function renderCompletedFile(id, name, size) {
        testLesson(4)
        const fileItem = document.getElementById(id);
        if (!fileItem) return;

        fileItem.innerHTML = `
        <div class="file-icon"><img src="../../assets/File Icon.svg"></div>
        <div class="file-info">
            <div class="name">${name}</div>
            <div class="size">${size}</div>
        </div>
        <div class="file-action"><img src="../../assets/trash-2.svg"></div>
        `;
        countFile++;

        // Thêm sự kiện xóa file
        const deleteButton = fileItem.querySelector('.file-action');
        deleteButton.addEventListener('click', function () {
            deleteFile(id);
            countFile--;
        });
    }

    // Hàm hiển thị file bị lỗi
    function renderErrorFile(id, name, size) {
        const fileItem = document.getElementById(id);
        if (!fileItem) return;

        fileItem.innerHTML = `
        <div class="file-icon"><img src="../../assets/File Icon.svg"></div>
        <div class="file-info">
            <div class="name">${name}</div>
            <div class="size">${size}</div>
        </div>
        <div class="file-action retry"><img src="../../assets/refresh.svg">Thử lại</div>
    `;

        // Thêm sự kiện thử lại
        const retryButton = fileItem.querySelector('.file-action.retry');
        retryButton.addEventListener('click', function () {
            retryUpload(id);
        });
    }

    // Mô phỏng quá trình tải lên
    function simulateFileUpload(fileId) {
        const fileItem = document.getElementById(fileId);
        if (!fileItem) return;

        const progressBar = fileItem.querySelector('.progress-inner');
        const fileIndex = fileStorage.findIndex(file => file.id === fileId);

        if (fileIndex === -1) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Cập nhật trạng thái trong storage
                fileStorage[fileIndex].status = 'completed';

                // Đổi giao diện sang trạng thái hoàn thành
                setTimeout(() => {
                    renderCompletedFile(
                        fileId,
                        fileStorage[fileIndex].name,
                        fileStorage[fileIndex].size
                    );
                }, 500);
            }

            progressBar.style.width = `${progress}%`;
        }, 200);

        // Lưu interval ID để có thể hủy
        fileStorage[fileIndex].uploadInterval = interval;
    }

    // Hàm xử lý hủy upload
    function cancelUpload(fileId) {
        const fileIndex = fileStorage.findIndex(file => file.id === fileId);

        if (fileIndex !== -1) {
            // Hủy interval đang chạy nếu có
            if (fileStorage[fileIndex].uploadInterval) {
                clearInterval(fileStorage[fileIndex].uploadInterval);
            }

            // Xóa file khỏi storage
            fileStorage.splice(fileIndex, 1);

            // Xóa phần tử hiển thị
            const fileElement = document.getElementById(fileId);
            if (fileElement) {
                containerUp.removeChild(fileElement);
            }
        }
    }

    // Hàm xử lý xóa file đã upload
    function deleteFile(fileId) {
        const fileIndex = fileStorage.findIndex(file => file.id === fileId);

        if (fileIndex !== -1) {
            // Xóa file khỏi storage
            fileStorage.splice(fileIndex, 1);

            // Xóa phần tử hiển thị
            const fileElement = document.getElementById(fileId);
            if (fileElement) {
                containerUp.removeChild(fileElement);
            }
        }
    }

    // Hàm xử lý thử lại tải lên
    function retryUpload(fileId) {
        const fileIndex = fileStorage.findIndex(file => file.id === fileId);

        if (fileIndex !== -1) {
            fileStorage[fileIndex].status = 'uploading';

            // Cập nhật giao diện sang trạng thái đang tải
            const fileItem = document.getElementById(fileId);
            if (fileItem) {
                fileItem.innerHTML = `
                <div class="file-icon"><img src="../../assets/File Icon.svg"></div>
                <div class="file-info">
                    <div class="name">${fileStorage[fileIndex].name}</div>
                    <div class="size">${fileStorage[fileIndex].size} <span class="file-status">Đang tải lên...</span></div>
                    <div class="progress-bar">
                        <div class="progress-inner" style="width: 0%"></div>
                    </div>
                </div>
                <div class="file-action"><img src="../../assets/x.svg"></div>
            `;

                // Thêm sự kiện hủy upload
                const cancelButton = fileItem.querySelector('.file-action');
                cancelButton.addEventListener('click', function () {
                    cancelUpload(fileId);
                });

                // Bắt đầu lại quá trình tải lên
                simulateFileUpload(fileId);
            }
        }
    }

    // Hàm xử lý file ảnh để kiểm tra kích thước
    function processImageFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    resolve({
                        src: event.target.result,
                        width: img.width,
                        height: img.height
                    });
                };

                img.onerror = function () {
                    reject(new Error('Không thể đọc file ảnh'));
                };
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    // Hàm định dạng kích thước file
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

});
document.getElementById("toggle-tab").addEventListener("click", function () {
    const tabContainer = document.querySelector(".tab-container");
    tabContainer.classList.toggle("collapsed");
});



function loadText() {
    let text = document.getElementById("text");
    text.innerHTML = questions_Test5;


}




loadData()
function loadData() {
    const spinner = document.getElementById("spinnerContainer");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        loadText();
    }, 2000);
}