window.alert('アプリを開いた');
document.addEventListener('mouseup', function (ev) {
    var selection = getSelection();
    var h1Node = document.createElement('h1');
    h1Node.innerHTML = "<button type=\"button\">ボタン</button>";
    var textNode = document.createTextNode("あ");
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.insertNode(h1Node);
        selection.removeAllRanges();
    }
}, false);
