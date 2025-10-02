
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
const db = firebase.firestore(); // ✅ Tạo db ở đây


// Đăng nhập ẩn danh
auth.signInAnonymously()
    .then(() => {
        console.log("Đã đăng nhập ẩn danh");
        // saveDataToFirestore();
    })
    .catch(error => {
        console.error("Lỗi đăng nhập:", error);
    });

const topics = [
    {
        title: "Chào hỏi",
        japanese: {
            words: {
                "挨拶": ["Aisatsu", "Chào hỏi"],
                "こんにちは": ["Konnichiwa", "Xin chào"],
                "ありがとう": ["Arigatou", "Cảm ơn"],
                "すみません": ["Sumimasen", "Xin lỗi"]
            }
        }
    },
    {
        title: "Hội thoại",
        japanese: {
            words: {
                "会話": ["Kaiwa", "Hội thoại"],
                "質問": ["Shitsumon", "Câu hỏi"],
                "返事": ["Henji", "Trả lời"],
                "説明": ["Setsumei", "Giải thích"]
            }
        }
    },
    {
        title: "Con số",
        japanese: {
            words: {
                "数字": ["Sūji", "Con số"],
                "一": ["Ichi", "Một"],
                "十": ["Jū", "Mười"],
                "百": ["Hyaku", "Trăm"],
                "千": ["Sen", "Nghìn"]
            }
        }
    },
    {
        title: "Ngày và Giờ",
        japanese: {
            words: {
                "日付": ["Hizuke", "Ngày tháng"],
                "時間": ["Jikan", "Thời gian"],
                "時計": ["Tokei", "Đồng hồ"],
                "秒": ["Byō", "Giây"],
                "分": ["Fun", "Phút"]
            }
        }
    },
    {
        title: "Phương hướng & Địa điểm",
        japanese: {
            words: {
                "方向": ["Hōkō", "Phương hướng"],
                "場所": ["Basho", "Địa điểm"],
                "右": ["Migi", "Phải"],
                "左": ["Hidari", "Trái"],
                "地図": ["Chizu", "Bản đồ"]
            }
        }
    },
    {
        title: "Phương tiện đi lại",
        japanese: {
            words: {
                "交通": ["Kōtsū", "Giao thông"],
                "電車": ["Densha", "Tàu điện"],
                "バス": ["Basu", "Xe buýt"],
                "自転車": ["Jitensha", "Xe đạp"],
                "飛行機": ["Hikōki", "Máy bay"]
            }
        }
    },
    {
        title: "Địa điểm nghỉ ngơi",
        japanese: {
            words: {
                "宿泊施設": ["Shukuhaku Shisetsu", "Cơ sở lưu trú"],
                "ホテル": ["Hoteru", "Khách sạn"],
                "旅館": ["Ryokan", "Nhà trọ kiểu Nhật"],
                "部屋": ["Heya", "Phòng"],
                "予約": ["Yoyaku", "Đặt trước"]
            }
        }
    },
    {
        title: "Ăn uống",
        japanese: {
            words: {
                "飲食": ["Inshoku", "Ăn uống"],
                "料理": ["Ryōri", "Món ăn"],
                "レストラン": ["Resutoran", "Nhà hàng"],
                "美味しい": ["Oishii", "Ngon"],
                "箸": ["Hashi", "Đũa"]
            }
        }
    },
    {
        title: "Mua sắm",
        japanese: {
            words: {
                "買い物": ["Kaimono", "Mua sắm"],
                "店": ["Mise", "Cửa hàng"],
                "値段": ["Nedan", "Giá cả"],
                "安い": ["Yasui", "Rẻ"],
                "デパート": ["Depāto", "Bách hóa"]
            }
        }
    },
    {
        title: "Thành phố & Tỉnh",
        japanese: {
            words: {
                "都市": ["Toshi", "Thành phố"],
                "県": ["Ken", "Tỉnh"],
                "東京": ["Tōkyō", "Tokyo"],
                "大阪": ["Ōsaka", "Osaka"],
                "京都": ["Kyōto", "Kyoto"]
            }
        }
    },
    {
        title: "Quốc gia",
        japanese: {
            words: {
                "国": ["Kuni", "Quốc gia"],
                "日本": ["Nihon", "Nhật Bản"],
                "ベトナム": ["Betonamu", "Việt Nam"],
                "アメリカ": ["Amerika", "Mỹ"],
                "中国": ["Chūgoku", "Trung Quốc"]
            }
        }
    },
    {
        title: "Danh lam thắng cảnh",
        japanese: {
            words: {
                "観光地": ["Kankōchi", "Địa điểm du lịch"],
                "神社": ["Jinja", "Đền thờ"],
                "寺": ["Tera", "Chùa"],
                "富士山": ["Fujisan", "Núi Phú Sĩ"],
                "桜": ["Sakura", "Hoa anh đào"]
            }
        }
    },
    {
        title: "Gia đình",
        japanese: {
            words: {
                "家族": ["Kazoku", "Gia đình"],
                "父": ["Chichi", "Bố"],
                "母": ["Haha", "Mẹ"],
                "兄弟": ["Kyōdai", "Anh em"],
                "姉妹": ["Shimai", "Chị em"]
            }
        }
    },
    {
        title: "Hẹn hò",
        japanese: {
            words: {
                "デート": ["Dēto", "Hẹn hò"],
                "恋人": ["Koibito", "Người yêu"],
                "愛": ["Ai", "Tình yêu"],
                "結婚": ["Kekkon", "Kết hôn"],
                "プロポーズ": ["Puropōzu", "Cầu hôn"]
            }
        }
    },
    {
        title: "Khẩn cấp",
        japanese: {
            words: {
                "緊急": ["Kinkyū", "Khẩn cấp"],
                "助けて": ["Tasukete", "Cứu tôi"],
                "警察": ["Keisatsu", "Cảnh sát"],
                "救急車": ["Kyūkyūsha", "Xe cứu thương"],
                "火事": ["Kaji", "Cháy"]
            }
        }
    },
    {
        title: "Bệnh tật",
        japanese: {
            words: {
                "病気": ["Byōki", "Bệnh tật"],
                "熱": ["Netsu", "Sốt"],
                "病院": ["Byōin", "Bệnh viện"],
                "薬": ["Kusuri", "Thuốc"],
                "頭痛": ["Zutsū", "Đau đầu"]
            }
        }
    },
    {
        title: "Câu đồng âm, khác nghĩa",
        japanese: {
            words: {
                "駄洒落": ["Dajare", "Chơi chữ"],
                "雨": ["Ame", "Mưa"],
                "飴": ["Ame", "Kẹo"],
                "橋": ["Hashi", "Cây cầu"],
                "箸": ["Hashi", "Đôi đũa"]
            }
        }
    }
];




async function recreateTopics(topics) {
    const batch = db.batch();
    const colRef = db.collection("topicsWord");

    topics.forEach(topic => {
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

// recreateTopics(topics);