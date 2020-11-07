if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");

}

const request = window.indexedDB.open("dbBudget", 1);
let db,
    tx,
    store;

request.onupgradeneeded = function (e) {
    const db = request.result;
    db.createObjectStore("dbTrans", { autoIncrement: "true" });
};

request.onerror = function (e) {
    console.log("There was an error");

};

request.onsuccess = function (e) {
    db = e.target.result
    if (navigator.onLine) {
        startIndexedDB()
    }
}


function saveRecord(saveUserData) {

    const tx = db.transaction(["dbTrans"], "readwrite");
    const store = tx.objectStore("dbTrans");
    store.add(saveUserData)
}

function startIndexedDB() {

    const tx = db.transaction(["dbTrans"], "readwrite");
    const store = tx.objectStore("dbTrans");
    const getAll = store.getAll()
    getAll.onsuccess = function (_) {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "aplication/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).then(function (resp) {
                return Response.json()
            }).then(function (result) {
                const tx = db.transaction(["dbTrans"], "readwrite");
                store = tx.objectStore("dbTrans");
                store.clear()
            })
        }

    }
    db.onerror = function (e) {
        console.log("error");
    };


}

tx.oncomplete = function () {
     db.close();
};
//when the app is back online
window.addEventListener("online", startIndexedDB)
