/**
 * クリックするとコメントを表示するためのトリガー(ピン)を作成する。
 * @param id ピンに付与するid名
 * @param x ピンのx座標
 * @param y ピンのy座標
 * @param z ピンのz座標(重なり順)
**/
function Make_Pin_Node(id, x, y, z) {
    // ノードの作成
    var new_node = document.createElement("div");
    // idの付与
    new_node.id = make_id(id, "PIN");
    // 位置を付与(absolute)
    new_node.style.position = "absolute";
    new_node.style.left = x + "px";
    new_node.style.top = y + "px";
    // z位置(重なり順を決定)
    new_node.style.zIndex = z;
    // 表示する言葉(将来的には画像)
    new_node.innerHTML = "";
    // ピンをクリックしたときの関数を追加
    new_node.onclick = function () {
        Display_Comment(id);
    };
    // 見た目の設定
    Set_Style(new_node);
    return new_node;
}
/**
 * クリックした時に表示されるコメントを作成
 * @param id コメントに付与するid名
 * @param x コメントのx座標(基本的に0)
 * @param y コメントのy座標(基本的に0)
 * @param z コメントの重なり順
 * @param comment (コメント本文)
 */
function Make_Comment_Node(id, x, y, z, comment) {
    // ノードの作成
    var new_node = document.createElement("div");
    // idの付与
    new_node.id = id;
    // show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
    new_node.style.display = "none";
    // コメントの内容を付与
    new_node.innerHTML = comment;
    // z位置(重なり順を決定)
    new_node.style.zIndex = String(Number(z) + 1);
    // 見た目の設定
    Set_Style(new_node);
    return new_node;
}
/**
 * コメントを表示させる関数
 * @param id 指定したコメントのid属性
 */
function Display_Comment(id) {
    $("#" + make_id(id, "PIN")).on("click", function (e) {
        if ($("#" + id).is(":hidden")) {
            Move_Comment(e.pageX, e.pageY, id);
        }
    });
}
/**
 * コメントとバツマークを指定した位置に表示させる。
 * @param x 指定したx座標
 * @param y 指定したy座標
 * @param id クリックしたPINに対応したコメントのid属性
 */
function Move_Comment(x, y, id) {
    // 対象のidのコメントとそのコメントのバツマークを表示状態に変更
    $("#" + id).show();
    $("#" + make_id(id, "close")).show();
    // 指定の位置にコメントを移動
    Set_Position_jQuery(x, y, id);
    // バツマークの移動座標を計算
    var cls_btn_x = x;
    // コメントの幅を取得
    var target_width = $("#" + id).outerWidth(true);
    // コメントの幅が取得できればその分右にずらす
    if (target_width != undefined) {
        cls_btn_x += target_width - 5;
    }
    var cls_btn_y = y - 5;
    // 指定の位置の右上にバツマークを移動
    Set_Position_jQuery(cls_btn_x, cls_btn_y, make_id(id, "close"));
}
/**
 * 対象となるノードの座標を変更する。
 * @param x 対象のx座標
 * @param y 対象のy座標
 * @param id 対象のid属性
 */
function Set_Position_jQuery(x, y, id) {
    $("#" + id).css({
        "position": "absolute",
        "left": x,
        "top": y
    });
}
/**
 * 対象のノードにCSSを追加する
 * @param node cssを加えたいノード
 */
function Set_Style(node) {
    node.style.padding = "10px";
    node.style.marginBottom = "10px";
    node.style.border = "1px solid #333333";
    node.style.backgroundColor = "#ffff99";
}
/**
 * コメントの右上に閉じるボタンを作成
 * @param id コメントに付与するid名
 * @param x コメントのx座標(基本的に0)
 * @param y コメントのy座標(基本的に0)
 * @param z コメントの重なり順
 */
function Make_Close_Btn_Node(id, x, y, z) {
    // コメントにバツボタンを付与
    var close_node = document.createElement("div");
    // バツボタンにidを付与
    close_node.id = make_id(id, "close");
    // show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
    close_node.style.display = "none";
    // Xの文字を付与
    close_node.innerHTML = "X";
    // z位置(重なり順を決定)
    close_node.style.zIndex = String(Number(z) + 2);
    // バツボタンをクリックしたときの関数を追加
    close_node.onclick = function () {
        Close_Comment(id);
    };
    return close_node;
}
/**
 * 指定したコメントを非表示状態に変更
 * @param id 指定したコメントのid属性
 */
function Close_Comment(id) {
    if ($("#" + id).is(":visible")) {
        $("#" + id).hide();
        $("#" + make_id(id, "close")).hide();
    }
}
/**
 * 指定したidのclose-idやPIN-idを返す
 * @param id コメントのid
 * @param add_id 追加したいid("close"or"PIN")
 */
function make_id(id, add_id) {
    return id + "_" + add_id;
}
/**
 * ピン・コメント(非表示)・閉じるボタン(非表示)をHTML内に追加
 * id = "コメントのid"
 * ピンのid => id+"_PIN"
 * コメントのid => id
 * 閉じるボタンのid => id+"_close"
 * @param id コメントに与えるid属性
 * @param x ピンが立つx座標(最左が0)
 * @param y ピンが立つy座標(最上が0)
 */
function Create_PIN(id, x, y, comment) {
    // 重なり位置を指定
    var z = "10000";
    // ピンを作成
    var new_pin = Make_Pin_Node(id, x, y, z);
    // コメント(初期設定:非表示)を作成
    var new_comment = Make_Comment_Node(id, "0", "0", z, comment);
    // 閉じるボタン(初期設定:非表示)を作成
    var cls_btn = Make_Close_Btn_Node(id, "0", "0", z);
    //bodyに追加する。
    document.body.appendChild(new_pin);
    document.body.appendChild(new_comment);
    document.body.appendChild(cls_btn);
}
/**
 * 読み込んだときに既にあるピンを表示する関数
 */
function Display_PIN() {
    /*
    サーバーから情報を読み込む
    読み込んだ内容を１つずつ取り出してCreate_PIN()にいれる。
    */
    var load_comments = Load_Comment();
    var id = load_comments[0].id;
    var x = load_comments[0].x;
    var y = load_comments[0].y;
    var comment = load_comments[0].comment;
    Create_PIN(id, x, y, comment);
}
/**
 * サーバーから情報を読み込む
 */
function Load_Comment() {
    // 何らかの操作でサーバから値を取得
    return [{ id: "Comment1", x: "100", y: "100", comment: "コメント" }];
}
// 本来であればモードチェンジができるようにしたい
var flag = false;
//background.jsから送られたメッセージで機能を変更する
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //Actionのメッセージが来たら0をstart関数に渡す。
    if (request.command == "Action") {
        flag = true;
    }
    //Stopのメッセージが来たら1をstart関数に渡す。
    if (request.command == "Stop") {
        flag = false;
    }
});
/**
 * 状態を変更するための関数
 * @param flag 状態を確認するフラッグ
 */
/*function Change_Mode(flag: boolean){
    if (flag){
        return false
    }else{
        return true
    }
}*/
/**
 * PIN及びコメントを作成
 * @param x PINのx座標
 * @param y PINのy座標
 */
function Make_PIN(x, y) {
    // id = idを作成
    var id = "comment2";
    //comment = コメントを取得
    var comment = "テスト";
    // PIN及びコメントを作成
    Create_PIN(id, x, y, comment);
    // 作成したPIN及びコメントの情報を保存
    Save_PIN(id, x, y, comment);
}
/**
 * 作成したPIN及びコメントをサーバに形式を整えて送信し、保存
 * @param id コメントのid属性
 * @param x PINのx座標
 * @param y PINのy座標
 * @param comment コメントの内容
 */
function Save_PIN(id, x, y, comment) {
    // サーバに形式を整えて送信 
}
/*
    サイトを読み込んだときに実行
*/
window.onload = function () {
    this.Display_PIN();
};
var once = true;
/*
    ページ内でクリックした場合にピンを作成。コメントも同時に作成する。
    現在は１つだけ書き込める形になっている。
*/
$("body").on("click", function (e) {
    if (flag) {
        // 書き込みモードを解除(?)(書き込みをスタートさせる方法にもよる)
        // flag = Change_Mode(flag)
        // 書き込みモードならPIN・コメントを作成
        if (once) {
            Make_PIN(String(e.pageX), String(e.pageY));
            once = false;
        }
        // 本来であれば書き込みモードを再開(?)(上と同様に)
        // Change_Mode(flag)
    }
});
