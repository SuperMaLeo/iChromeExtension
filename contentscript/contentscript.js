/// <reference path="C:/Users/leo/typings/tsd.d.ts" />

(function() {
    console.log('contentscript.js running...');

    // Chrome onRequest Listener (Chrome的Request監聽事件)
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action == "Friend") {
            downloadFriendInfo();
        }
    });

    function downloadFriendInfo() {
        console.log('enter downloadFriendInfo function');

        // var friendInfo = document.all[0].innerHTML;

        var infoArray = document.getElementsByClassName('fsl fwb fcb');

        var context = '';
        for (var index in infoArray) {
            var info = infoArray[index].innerHTML;
            if (info) {
                context += info + "\r\n";
            }
        }

        var blob = new Blob([context], { type: "text/plain; charset=utf-8" });
        saveAs(blob, "html.html");
    }
})();