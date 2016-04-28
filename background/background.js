(function () {
    console.log('background.js running...');

    function backgroundEvent() {
        chrome.tabs.getSelected(function (tab) {
            // 下載 FaceBook 下的朋友資訊
            chrome.tabs.sendMessage(tab.id, { action: "storageFriendsInfo", tab: tab });
        })
    }

    // chrome.browserAction.onClicked.addListener(backgroundEvent);
})();