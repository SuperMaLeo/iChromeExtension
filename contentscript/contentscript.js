/// <reference path="C:/Users/leo/typings/tsd.d.ts" />

(function () {
    console.log('contentscript.js running...');

    // 這是用來防止重複下載的 flag
    var notyetDownload = true;

    // Chrome onRequest Listener (Chrome的Request監聽事件)
    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        console.log('enter contentscript Listener function');

        if (request.action == "Friend") {

            var div2w3 = document.querySelector('div._2w3');
            var divFriends = document.querySelector('#pagelet_timeline_medley_friends');

            if (!div2w3 || !divFriends) {
                alert('不是正確的 FaceBook 的朋友頁面');
                return;
            }

            // 新增監聽器後
            addListenDOMSubtreeModified(div2w3);

            // 移動 scrollbar 一次
            moveDownScrollbar();
        }
    });

    /*
     * 我在尋找 "如何監聽 同一個 DOM 下, 另一個 javascript 發出 ajax request" 的時候
     *
     * 發現下面這段文字
     *
     * You can't listen to ajax requests (without using experimental api), 
     *
     * but you can listen to DOMSubtreeModified event that fires whenever DOM is modified
     */
    function addListenDOMSubtreeModified(div2w3) {

        var events = $._data(div2w3, "events");

        // 若已有此監聽器, 就不要在增加了
        if (events && events.DOMSubtreeModified) {
            return;
        }

        // 增加監聽器
        // DOM 樹若有變動, 就會觸發此 function
        $('div._2w3').on("DOMSubtreeModified", function () {

            // **********************************************************************
            // 重點:
            // 下方的 if() 就是在判斷 "朋友" 清單是否全部讀取完成的地方
            // 我觀察了 fb "目前" 的行為模式後
            // 發現 fb 是先讀出一個 div, 然後隨著 scrollbar 下拉, 越讀越多 div
            // 而 "朋友 div" 目前是第 1 個 div
            // 把整個朋友清單讀取完畢後
            // 頁面才會取得第 2 個 div
            // 這個時候 div.children.length 就會大於 1
            // 這個時候我就觸發 download file 的事件
            // 我個人覺得.... 這方法頗鳥..............
            // 如果有人發現這其實有 bug 或是有更好的方法做這個 download file 時機的判斷方法
            // 請提供給我, 開鶴和佳音還有我都會感謝你的 :D
            // 謝謝 ><
            // **********************************************************************

            // if 還沒觸發過下載 html 事件 && div2w3 內的子節點多於一個
            if (notyetDownload && div2w3.children.length > 1) {
                // 觸發下載 html 事件
                notyetDownload = false;
                downloadFriendInfo();
                return;
            }

            // 拉動 scrollbar
            moveDownScrollbar();
        });
    }

    function moveDownScrollbar() {
        console.log('enter moveDownScrollbar function');

        var d = $(document);
        d.scrollTop(d.height());
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