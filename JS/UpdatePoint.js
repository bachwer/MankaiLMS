
//BQ
async function SavePoint(point) {
    if(parseInt(point) > 0){
        await updatePoint(point)
    }
}

async function updatePoint(point) {
    let dataUser = JSON.parse(localStorage.getItem("dataUser"));
    let pointCurrent = parseInt(dataUser.point);
    const update = {
        point: pointCurrent + parseInt(point),
    }
    db.collection("accountUser").doc(dataUser.codeUser).update(update, {merge: true})

    await getDataById(dataUser.codeUser)
}

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


