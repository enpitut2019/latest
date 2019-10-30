window.alert('アプリを開いた');
//左クリックするとその位置にボタンが表示される
document.addEventListener('mouseup', function (ev) {
    var selection = getSelection();
    var h1Node = document.createElement('div');
    h1Node.innerHTML = "<button type=\"button\">ボタン</button>";
    //var textNode = document.createTextNode("あ");
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.insertNode(h1Node);
        selection.removeAllRanges();
    }
}, false);
//ボタンがWebページにアクセスしたときに一番上に出てくる。
var r = document.createRange();
r.setStart(document.body, 0);
r.setEnd(document.body, 0);
var h2Node = document.createElement('div');
h2Node.innerHTML = "<button type=\"button\">ボタン</button>";
r.insertNode(h2Node);
