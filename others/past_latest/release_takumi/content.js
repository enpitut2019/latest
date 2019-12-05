//background.jsから送られたメッセージで機能を変更する
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //Actionのメッセージが来たら0をstart関数に渡す。
    if (request.command == "Action") {
        start(0);
    }
    //Stopのメッセージが来たら1をstart関数に渡す。
    if (request.command == "Stop") {
        start(1);
    }
});
//chromeストレージからコメントを読み込む関数
function ReadComment(key) {
    chrome.storage.sync.get(['key'], function (result) {
        console.log('Value currently is ' + result.key);
    });
}
//chromeストレージにコメントを書き込む関数
function WriteComment(key, value) {
    chrome.storage.sync.set({ key: value }, function () {
        console.log('Value is set to ' + value);
    });
}
//ここに実行する関数を書く
//選択した範囲をボタンにする-----------------------------------------------------------
//課題：h1タグとかも全部平文にしてしまうからwebページのスタイルを壊すことになる。
function select() {
    var selection = window.getSelection(); //選択範囲を取得
    if (!selection.rangeCount)
        return; //選択範囲がなかったら関数を出る
    var range = selection.getRangeAt(0); //rangeを作成
    var newbtn = document.createElement('span'); //spanタグのNodeを作る
    newbtn.innerHTML = selection.toString(); //選択範囲の文字列をNodeに挿入する
    //Nodeのcssスタイルを変更する
    newbtn.style.cssText = "background-color:black;color:white;cursor:pointer;";
    newbtn.onclick = function () {
        window.alert('クリックした'); //クリックされたらアラートを出す
    };
    range.deleteContents(); //もともと書かれていたhtml文を消す。
    range.insertNode(newbtn); //rangeに作成したNodeを追加する。
    selection.removeAllRanges(); //選択範囲のリセット
}
//実行する関数のon/offを切り替えるための関数-------------------------------------------
function start(account) {
    if (account % 2 == 0) {
        //送られてきた値が0であるならmouseupイベントをselect関数に追加
        document.addEventListener('mouseup', select, false);
    }
    else {
        //送られてきた値が1であるならmouseupイベントをselect関数から削除
        document.removeEventListener('mouseup', select, false);
    }
}
