window.alert('アプリを開いた');

document.addEventListener('mouseup', function(ev){
    var selection = getSelection();
    if(selection.rangeCount > 0){
        var range = selection.getRangeAt(0);
        range.deleteContents();
        selection.removeAllRanges();
    }
},false);