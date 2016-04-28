var storageor = (function () {

    function storageFriendsInfo() {

        // 取得 FaceBook 的 '朋友' 的 '父' DIV
        var div2w3 = document.querySelector('div._2w3');

        // 取得 FaceBook 的 '朋友' 的 DIV
        var divFriends = document.querySelector('#pagelet_timeline_medley_friends');

        // 若任一個不存在, 就判斷當前頁面不是正確的 FaceBook 朋友頁面
        if (!div2w3 || !divFriends) {
            alert('不是正確的 FaceBook 的朋友頁面');
            return;
        }

        // 新增監聽器
        initObserver(div2w3);

        // 拉動 scrollbar 一次
        moveDownScrollbar();
    };

    // 依情報 (https://msdn.microsoft.com/zh-tw/library/dn265032(v=vs.85).aspx)
    // 停用 $('div._2w3').on("DOMSubtreeModified", function () {  ...  });
    // 改成使用 MutationObserver (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
    // 參考此網址 http://chrisyip.github.io/post/mutation-events-and-mutationobserver/
    // 寫出下面的 function
    var observer;
    function initObserver(div2w3) {
        console.log('enter initObserver function');

        // 若已實例化, 就不要在實例一次了
        // 先看 WebKitMutationObserver 在看 MutationObserver
        observer = observer || new (window.WebKitMutationObserver || window.MutationObserver)(

            // 若 observer 觀察到子節點有變動, 就會觸發此 function
            // 注意 :
            // 被觀察的對像是 node 節點
            // 所以下面這樣的操作也會觸發此 function
            // div2w3.appendChild( document.createTextNode( 'Hello World' ) )。
            function (mutationRecord, observer) {


                // 我在尋找 "如何監聽 同一個 DOM 下, 另一個 javascript 發出 ajax request" 的時候
                // 發現下面這段文字
                // You can't listen to ajax requests (without using experimental api), 
                // but you can listen to DOMSubtreeModified event that fires whenever DOM is modified
                // 所以...
                // 判斷何時該觸發 downloadFriendInfo() 的判斷條件
                // 下面有二條路

                // Way 1 :
                // 觀察 "朋友" 區塊裡的 "讀取中 GIF 圖檔", 若不存在就觸發下載 friends.html
                var img_359img = $('#pagelet_timeline_medley_friends').find('img._359.img');
                if (img_359img.length == 0) {
                    downloadFriendInfo(); // 下載 friends.html
                    observer.disconnect(); // 停止 observer 的觀察
                    return;
                }

                // Way 2 :
                // 若 div2w3 內的子節點多於一個, 就觸發下載 friends.html
                // if (div2w3.children.length > 1) {
                //     downloadFriendInfo(); // 下載 friends.html
                //     observer.disconnect(); // 停止 observer 的觀察
                //     return;
                // }

                // 拉動 scrollbar 一次
                moveDownScrollbar();
            }
        );

        // 啟動 observer 的觀察
        // observe() 裡的參數可以給 : attributes: true, childList: true, subtree: true
        observer.observe(div2w3, { childList: true, subtree: true })
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

        var count = 1;
        var context = '';
        for (var index in names) {
            var name = (names[index]) ? names[index].innerHTML : '';
            var photo = (photos[index]) ? photos[index].outerHTML : '';
            if (name || photo) {
                context += photo + name + "\r\n<br /><br />\r\n";
                count++;
            } else {
                console.log('沒被印的 name = ' + name);
                console.log('沒被印的 photo = ' + photo);
                console.log('=--------------------------------=');
            }
        }
        context += '共 ' + count + ' 位';

        var blob = new Blob([context], { type: "text/plain; charset=utf-8" });
        saveAs(blob, "friends.html");
    }

    return { storageFriendsInfo: storageFriendsInfo };
})();