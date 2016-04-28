(function () {

    // 讀檔
    function readFile() {
        var fileSelector = document.getElementById('fileSelector');

        chrome.tabs.getSelected(function (tab) {
            chrome.tabs.sendMessage(tab.id, { action: "readFile", tab: tab, fileSelector: fileSelector });
        })
    }

    document.getElementById('readFile').addEventListener('click', readFile);

    // 儲存 FaceBook 的朋友資訊
    function storageFriendsInfo() {
        chrome.tabs.getSelected(function (tab) {
            chrome.tabs.sendMessage(tab.id, { action: "storageFriendsInfo", tab: tab });
        })
    }

    document.getElementById('storageFriendsInfo').addEventListener('click', storageFriendsInfo);
})();