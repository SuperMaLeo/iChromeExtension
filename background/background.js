(function () {
    // Browser_Action_Click_Event
    function Browser_Action_Click_Event() {
        console.log('background.js running...');

        chrome.tabs.getSelected(function (tab) {
            chrome.tabs.sendMessage(tab.id, { action: "Friend", tab: tab });
        })
    }

    chrome.browserAction.onClicked.addListener(Browser_Action_Click_Event);
})();