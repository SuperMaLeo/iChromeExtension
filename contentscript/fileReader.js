var fileReader = (function () {

    function FileViewer() {
        this.reader = new FileReader();

        this.reader.onloadend = (function (self) {
            return function () {
                self.loaded();
            }
        })(this);
    }
    FileViewer.prototype.load = function (file) {
        this.reader.readAsText(file);
    }
    FileViewer.prototype.loaded = function () {
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
        fileViewer.load(file);
    }

    return { read: read };
})();