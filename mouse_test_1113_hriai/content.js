//選択した範囲をボタンにする-----------------------------------------------------------
//課題：h1タグとかも全部平文にしてしまうからwebページのスタイルを壊すことになる。
var commentinner = document.getElementsByTagName('body');
var comment = document.createElement('div'); //spanタグのNodeを作る
comment.innerHTML = "ここ間違ってる。多分enpitで動く";
comment.style.cssText = "position: absolute; left: 982px; top: 366px;";
commentinner[0].insertAdjacentHTML('afterbegin', '<div id="popup" style="position: absolute; left: 982px; top: 366px;"><p class="upblock" id="popup_red" style="display: none;">ここ間違ってる。多分enpitで動く２</p></div>');

document.addEventListener('mouseup', function (ev) {
    var selection = window.getSelection(); //選択範囲を取得
    if (!selection.rangeCount)
        return; //選択範囲がなかったら関数を出る
    var range = selection.getRangeAt(0); //rangeを作成
    var newbtn = document.createElement('span'); //spanタグのNodeを作る
    newbtn.innerHTML = selection.toString(); //選択範囲の文字列をNodeに挿入する
    //Nodeのcssスタイルを変更する
    newbtn.style.cssText = "background-color:black;color:white;cursor:pointer;";
    newbtn.setAttribute("id", "area");
    $('#area').on('click', function (e) {
        console.log('screen=' + e.screenX + ',' + e.screenY);
        var mouse_x = e.clientX + 5;
		var mouse_y = $(window).scrollTop() + e.clientY + 5;

		$("#popup").css({
            "position": "absolute",
            "left": mouse_x,
            "top": mouse_y
        });
        $("#popup_red").show();
    });
    range.deleteContents(); //もともと書かれていたhtml文を消す。
    //range.insertNode(comment); //rangeに作成したNodeを追加する。
    range.insertNode(newbtn); //rangeに作成したNodeを追加する。
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
    window.alert('クリックしたぜ！！');
};
//ボタンの挿入----------------------------------------------------------------
r.insertNode(btn);
