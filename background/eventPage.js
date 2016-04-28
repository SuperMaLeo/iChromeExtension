(function () {
    console.log('eventPage.js running...');

    function eventListener() {
        window.addEventListener('request', function (event) {
            alert(event);
        });
    }

    // chrome.browserAction.onClicked.addListener(eventListener);
})();