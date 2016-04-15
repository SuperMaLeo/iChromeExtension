(function() {
    console.log('background.js running...');

    // Browser_Action_Click_Event
    function Browser_Action_Click_Event() {
        chrome.tabs.getSelected(function(tab) {
            chrome.tabs.sendMessage(tab.id, { action: "Friend", tab: tab });
        })
    }

    chrome.browserAction.onClicked.addListener(Browser_Action_Click_Event);
})();