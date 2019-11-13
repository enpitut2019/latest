//選択した範囲をボタンにする-----------------------------------------------------------
//課題：h1タグとかも全部平文にしてしまうからwebページのスタイルを壊すことになる。
document.addEventListener('mouseup', function (ev){
    var selection = window.getSelection();//選択範囲を取得
    if(!selection.rangeCount) return;//選択範囲がなかったら関数を出る

    var range = selection.getRangeAt(0);//rangeを作成
    var newbtn = document.createElement('span');//spanタグのNodeを作る
    newbtn.innerHTML = selection.toString();//選択範囲の文字列をNodeに挿入する
    //Nodeのcssスタイルを変更する
    newbtn.style.cssText = "background-color:black;color:white;cursor:pointer;"
    newbtn.onclick = function(){//ここに関数を入れる
        window.alert('クリックした');//クリックされたらアラートを出す
    }
    range.deleteContents();//もともと書かれていたhtml文を消す。
    range.insertNode(newbtn);//rangeに作成したNodeを追加する。
}, false);

//ボタンがWebページにアクセスしたときに一番上に出てくる。------------------------------
var r = document.createRange();//rangeを作る
r.setStart(document.body,0);//rangeの開始位置を設定
r.setEnd(document.body,0);//rangeの終了位置を設定

//関数が設定できるボタンの実装-----------------------------------------------------
var btn = document.createElement('button');
btn.type = 'button';
btn.textContent = 'ここにボタンの名前'
btn.onclick = function(){
    window.alert('クリックした');
}

//ボタンの挿入----------------------------------------------------------------
r.insertNode(btn);
