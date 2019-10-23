window.alert('アプリを開いた');
document.addEventListener('mouseup', function (ev) {
    var selection = getSelection();
    var textNode = document.createTextNode("■");
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        range.insertNode(textNode);
        selection.removeAllRanges();
    }
}, false);
