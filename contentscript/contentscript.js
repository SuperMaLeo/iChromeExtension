/// <reference path="C:/Users/leo/typings/tsd.d.ts" />

(function () {
    console.log('contentscript.js running...');

    var tempHeight = 0;

    // Chrome onRequest Listener (Chrome的Request監聽事件)
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('enter contentscript Listener function');

        if (request.action == "Friend") {
            moveDownScrollbar();
        }
    });

    function moveDownScrollbar() {
        console.log('enter moveDownScrollbar function');

        var d = $(document);
        d.scrollTop(d.height());

        if (tempHeight != d.height()) {
            tempHeight = d.height();
            setTimeout(moveDownScrollbar, 2000);
            return;
        }

        // var t = $(this).scrollTop();

        downloadFriendInfo();
    }

    function downloadFriendInfo() {
        console.log('enter downloadFriendInfo function');

        // var friendInfo = document.all[0].innerHTML;

        // document.getElementsByClassName('fsl fwb fcb');

        // var infoArray = $('div.fsl.fwb.fcb');

        // .find('div._5q6s._8o._8t.lfloat._ohe');

        var names = $('#pagelet_timeline_medley_friends').find('div.fsl.fwb.fcb');

        var photos = $('#pagelet_timeline_medley_friends').find('img._s0._rv.img');

        if (!names || names.length == 0) {
            return;
        }

        var context = '';
        for (var index in names) {
            var name = (names[index]) ? names[index].innerHTML : '';
            var photo = (photos[index]) ? photos[index].outerHTML : '';
            if (name || photo) {
                context += photo + name + "\r\n<br /><br />\r\n";
            }
        }

        var blob = new Blob([context], { type: "text/plain; charset=utf-8" });
        saveAs(blob, "html.html");
    }
})();