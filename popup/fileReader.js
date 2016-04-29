/// <reference path="C:/Users/leo/typings/tsd.d.ts" />

var fileReader = (function () {

    // 檔案檢視器
    function FileViewer() {
        // 讀檔的 util
        this.reader = new FileReader();

        // 設定讀檔完成後的 call back function
        this.reader.onloadend = (function (self) {
            return function () {
                // 執行 FileViewer.prototype.loaded
                self.loaded();
            }
        })(this);
    }

    // 為檢視器物件增加方法 (執行 load 時的方法)
    FileViewer.prototype.load = function (file) {
        // 讀取檔案內容
        // =======================================================
        // this.reader.readAsText 會觸發 this.reader.onload
        // this.reader.onload 結束後, 會觸發 this.reader.onloadend
        // =======================================================
        this.reader.readAsText(file);
    }

    // 為檢視器物件增加方法 (load 完成後的方法)
    FileViewer.prototype.loaded = function () {

        // TODO : 這裡可以得到檔案內容, 目前先用 alert 秀檔案內容, 未來要做什麼再說
        alert(this.reader.result);
    }

    // read() 的參考文獻 http://rocksaying.tw/archives/15328315.html
    // 但...如果不是要透過 input type=file 的方式讓使用者選檔的話
    // 就請參考 http://white5168.blogspot.tw/2013/05/ajax.html#.VyGALPl97tQ
    function read(fileSelector) {

        if (!fileSelector.files || fileSelector.files.length == 0) {
            alert('尚未選取檔案');
            return;
        }

        // 當使用者選取檔案後，瀏覽器僅先收集檔案資訊於 File 個體中，還不會實際讀取檔案內容。
        // 故前一節的操作僅能得知檔案的名稱、大小與文件型態。尚無內容。
        // 我們需再透過 FileReader 個體，才能要求瀏覽器載入檔案的內容，以便進一步地操作。
        var file = fileSelector.files[0];

        // var s = "Type of files[0]: " + file.toString() + "\n" +
        //     "File name: " + file.name + "\n" +
        //     "File size: " + file.size + "\n" +
        //     "File type: " + file.type;
        // alert(s);

        var fileViewer = new FileViewer();

        // 讀檔
        fileViewer.load(file);
    }

    return { read: read };
})();