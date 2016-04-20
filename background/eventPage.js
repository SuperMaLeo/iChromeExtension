(function () {
    function eventListener() {
        console.log('eventPage.js running...');

        window.addEventListener('request', function (event) {
            alert(event);
        });
    }

    // chrome.browserAction.onClicked.addListener(eventListener);
})();