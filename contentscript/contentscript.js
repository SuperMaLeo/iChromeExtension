/// <reference path="C:/Users/leo/typings/tsd.d.ts" />

(function () {
    console.log('contentscript.js running...');

    function contentListener(request, sender, sendResponse) {

        if (request.action == "storageFriendsInfo") {
            storageor.storageFriendsInfo();
        }

        if (request.action == "readFile") {
            fileReader.read(document(request.fileSelector));
        }
    }

    chrome.extension.onMessage.addListener(contentListener);
})();