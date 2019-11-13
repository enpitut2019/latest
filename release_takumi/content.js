//選択した範囲をボタンにする-----------------------------------------------------------
//課題：h1タグとかも全部平文にしてしまうからwebページのスタイルを壊すことになる。
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
document.addEventListener('mouseup', function (ev) {
    var selection = window.getSelection(); //選択範囲を取得
    if (!selection.rangeCount)
        return; //選択範囲がなかったら関数を出る
    var range = selection.getRangeAt(0); //rangeを作成
    var newbtn = document.createElement('span'); //spanタグのNodeを作る
    newbtn.innerHTML = selection.toString(); //選択範囲の文字列をNodeに挿入する
    //Nodeのcssスタイルを変更する
    newbtn.style.cssText = "background-color:black;color:white;cursor:pointer;";
    newbtn.onclick = function () {
        // 入力ダイアログを表示 ＋ 入力内容を user に代入
        var comment = window.prompt("コメントを入力してください", "");
        WriteComment("text.txt", comment);
    };
    range.deleteContents(); //もともと書かれていたhtml文を消す。
    range.insertNode(newbtn); //rangeに作成したNodeを追加する。
    selection.removeAllRanges(); //選択範囲のリセット
}, false);
//ボタンがWebページにアクセスしたときに一番上に出てくる。------------------------------
var r = document.createRange(); //rangeを作る
r.setStart(document.body, 0); //rangeの開始位置を設定
r.setEnd(document.body, 0); //rangeの終了位置を設定
//関数が設定できるボタンの実装-----------------------------------------------------
var btn = document.createElement('button');
btn.type = 'button';
btn.textContent = 'ここにボタンの名前';
btn.onclick = function () {
    var text = ReadComment("text.txt");
    console.log(text);
};
//ボタンの挿入----------------------------------------------------------------
r.insertNode(btn);
