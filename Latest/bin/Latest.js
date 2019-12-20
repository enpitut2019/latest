/**
 * element作成の親クラス
 */
class HTML_Element {
    /**
     * elementを作成する。(idとzは必ず指定する)
     * @param id elementがもつid属性
     * @param z 重なり順
     * @param url コメントのurl(作成時は""でok)
     * @param type elementのタイプ("PIN"や"close")
     * @param element_type elementの属性(基本的に"div")
     * @param click_function クリックしたときに発動する関数(指定しなくても良い)
     */
    constructor(id, z, url = "", type = "", element_type = "div", class_name = "") {
        // elementの作成
        this.node = document.createElement(element_type);
        this.uniid = id;
        this.id = this.make_id(id, type);
        this.z = z;
        this.type = type;
        this.element_type = type;
        this.url = url;
        this.class = class_name;
    }
    set_Value() {
        // idの付与
        this.node.id = this.id;
        // z位置(重なり順を決定)
        this.node.style.zIndex = this.z;
        this.node.className = this.class;
    }
    /**
     * 指定した値分zIndex(重なり順)を追加
     * @param add_num 加えるz値
     */
    add_zIndex(add_num) {
        let current_zIndex = this.node.style.zIndex;
        this.node.style.zIndex = String(Number(current_zIndex) + add_num);
    }
    /**
     * ノードにidをセットする。
     */
    set_style() {
        this.node.style.padding = "10px";
        this.node.style.marginBottom = "10px";
        this.node.style.border = "1px solid #333333";
        this.node.style.backgroundColor = "#ffff99";
    }
    set_buttonstyle() {
        //丸スタイル
        this.node.style.display = "inline-block";
        this.node.style.textDecoration = "none";
        this.node.style.background = "#ff8181";
        this.node.style.color = "#FFF";
        this.node.style.width = "15px";
        this.node.style.height = "15px";
        this.node.style.lineHeight = "15px";
        this.node.style.borderRadius = "50%";
        this.node.style.textAlign = "center";
        this.node.style.fontWeight = "bold";
        this.node.style.overflow = "hidden";
        //this.node.style.boxShadow = "0px 1px 1px rgba(0,0,0,0.29)"
        //this.node.style.borderBottom = "solid 2px #bd6565"
        this.node.style.opacity = "0.8";
        this.node.style.border = "solid 3px rgba(0,0,0,0.6)";
    }
    /**
     * カーソルの表示方法を設定
     * @param type ノード上のカーソルの表示方法を指定
     */
    set_cursor(type) {
        this.node.style.cursor = type;
    }
    /**
     * show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
     * @param type ノードの表示状態を指定する
     */
    set_display(type) {
        this.node.style.display = type;
    }
    /**
     * 指定した関数をクリックしたときに発火する関数をセットする関数
     * @param click_function クリックしたときに発火する関数
     */
    set_Function(click_function) {
        // elementをクリックしたときの関数を追加
        this.node.onclick = function () {
            click_function();
        };
    }
    /**
     * 指定したURLから画像をセットする関数
     * @param image セットするイメージの画像を指定する(本来は画像のURLを指定)
     */
    set_Image(image = "") {
        this.node.innerHTML = image;
    }
    set_CurrentURL() {
        this.url = location.origin;
    }
    /**
    * 指定したidのclose-idやPIN-idを返す
    * @param id コメントのid
    * @param add_id 追加したいid("close"or"PIN")
    */
    make_id(id, add_id) {
        if (add_id == "") {
            return id;
        }
        return id + "_" + add_id;
    }
}
/**
 * PINを作成するためのclass
 */
class PIN_Node extends HTML_Element {
    /**
     * PINを作成する
     * @param id PINのid属性
     * @param x pin-nodeのx座標
     * @param y pin-nodeのy座標
     * @param z pin-nodeのz座標
     */
    constructor(id, x, y, z, set_function, url = "") {
        super(id, z, url, "PIN", "div", "latest_pin");
        this.x = x;
        this.y = y;
        this.set_function = set_function;
    }
    set_Value() {
        super.set_Value();
        // 位置を付与(absolute)
        this.Set_Position_absolute(this.x, this.y);
        //// 表示する言葉(将来的には画像)
        //super.set_Image()
        // 見た目の設定
        //super.set_buttonstyle()
        super.set_cursor("pointer");
        // クリックしたときのアクションをセット
        super.set_Function(this.set_function);
        super.set_display("");
    }
    /**
     * pin-nodeの座標を指定する。
     * @param x pin-nodeのx座標
     * @param y pin-nodeのy座標
     */
    Set_Position_absolute(x, y) {
        this.node.style.position = "absolute";
        this.node.style.left = x + "px";
        this.node.style.top = y + "px";
    }
}
/**
 * コメントのノードを作成
 */
class Comment_Node extends HTML_Element {
    constructor(id, z, comment, url = "") {
        super(id, z, "", "", "div", "latest_comment");
        this.comment = comment;
        this.add_zindex = 1;
    }
    set_Value() {
        super.set_Value();
        // コメントのスタイルを追加。(display="none"も追加)
        super.set_style();
        super.set_display("none");
        // コメントの内容を付与
        this.node.innerHTML = this.comment;
        // zIndexを追加
        super.add_zIndex(this.add_zindex);
        this.node.style.color = "black";
    }
}
/**
 * コメントをクローズするためのノードを作成
 */
class Close_Node extends HTML_Element {
    constructor(id, z, set_function, url = "") {
        super(id, z, "", "close", "div", "latest_close");
        this.add_zindex = 2;
        this.set_function = set_function;
    }
    set_Value() {
        super.set_Value();
        // コメントのスタイルを追加。(display="none"も追加)
        //super.set_style()
        super.set_cursor("pointer");
        super.set_display("none");
        // 表示する言葉(将来的には画像)
        super.set_Image("x");
        // zIndexを追加
        super.add_zIndex(this.add_zindex);
        // このノードをクリックしたときに発火する関数を指定
        super.set_Function(this.set_function);
    }
}
class Comments {
    /**
     * pin,comment,closeノードを作成するのに必要な値をセットする。
     * @param id ノードのid
     * @param x pinノードのx座標
     * @param y pinノードのy座標
     * @param z pinノードのz座標(重なり順)
     * @param comment commentノードに表示するコメント内容
     */
    constructor(id, x, y, z = "1000", comment, url = "") {
        this.comment_node = new Comment_Node(id, z, comment, url);
        this.cls_node = new Close_Node(id, z, this.close_comment.bind(this), url);
        this.pin_node = new PIN_Node(id, x, y, z, this.Display_Comment.bind(this), url);
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.comment = comment;
        this.url = url;
    }
    /**
     * 各ノードを作成する。
     */
    createComments() {
        this.comment_node.set_Value();
        this.cls_node.set_Value();
        this.pin_node.set_Value();
    }
    /**
     * 作成したノードをサイトに追加する
     */
    appendComments() {
        document.body.appendChild(this.comment_node.node);
        document.body.appendChild(this.cls_node.node);
        document.body.appendChild(this.pin_node.node);
    }
    /**
     * コメントを新規作成時に実行。各ノードに現在のURLを格納
     */
    set_CurrentURL() {
        this.comment_node.set_CurrentURL();
        this.cls_node.set_CurrentURL();
        this.pin_node.set_CurrentURL();
        this.url = location.origin;
    }
    /**
    * コメントを表示させる関数
    */
    Display_Comment() {
        let comment_id = this.comment_node.id;
        $("#" + this.pin_node.id).on("click", function (e) {
            if ($("#" + comment_id).is(":hidden")) {
                this.Move_Comment(e.pageX, e.pageY, this.id);
            }
        }.bind(this));
    }
    /**
    * コメントとバツマークを指定した位置に表示させる。
    * @param x 指定したx座標
    * @param y 指定したy座標
    * @param id クリックしたPINに対応したコメントのid属性
    */
    Move_Comment(x, y, id) {
        // 対象のidのコメントとそのコメントのバツマークを表示状態に変更
        $("#" + this.comment_node.id).show();
        $("#" + this.cls_node.id).show();
        // 指定の位置にコメントを移動
        this.Set_Position_jQuery(x, y, this.comment_node.id);
        // バツマークの移動座標を計算
        let cls_btn_x = x;
        // コメントの幅を取得
        let target_width = $("#" + this.comment_node.id).outerWidth(true);
        // コメントの幅が取得できればその分右にずらす
        if (target_width != undefined) {
            cls_btn_x += target_width - 5;
        }
        let cls_btn_y = y - 5;
        // 指定の位置の右上にバツマークを移動
        this.Set_Position_jQuery(cls_btn_x, cls_btn_y, this.cls_node.id);
    }
    /**
     * コメントをクローズするための関数
     */
    close_comment() {
        if ($("#" + this.cls_node.id).is(":visible")) {
            $("#" + this.cls_node.id).hide();
            $("#" + this.comment_node.id).hide();
        }
    }
    /**
     * 対象となるノードの座標を変更する。
     * @param x 対象のx座標
     * @param y 対象のy座標
     * @param id 対象のid属性
     */
    Set_Position_jQuery(x, y, id) {
        $("#" + id).css({
            "position": "absolute",
            "left": x,
            "top": y
        });
    }
}
class CommentManager {
    /**
     * db関係の変数を渡す。
     */
    constructor() {
        this.db = new DB();
        this.manageid = new ManageID();
        this.current_url = location.origin;
        this.all_node = [];
    }
    /**
     * 各ノードを作成する。
     */
    createComments(id, x, y, z = "1000", comment, url) {
        if (id == undefined)
            return;
        let node = new Comments(id, x, y, z, comment, url);
        console.log("DEBUG: CreateComment = {id = " + id + ",x = " + x + ",y = " + y + ",z = " + z + ",comment = " + comment + ",url = " + url + "}");
        node.createComments();
        node.appendComments();
        this.all_node.push(node);
    }
    /**
     * 新しいノードをサイトに追加した後、データベースに追加する
     */
    creteNewComments(x, y, z = "1000", comment) {
        let id = this.manageid.get_Random_id();
        let node = new Comments(id, x, y, z, comment);
        node.createComments();
        node.appendComments();
        node.set_CurrentURL();
        this.db.Save_PIN(id, x, y, comment);
    }
    /*
    サーバーから情報を読み込む
    読み込んだ内容を１つずつ取り出してCreate_PIN()にいれる。
    */
    loadComment() {
        let createComments = this.createComments.bind(this);
        this.db.Load_Comment()
            .then(function (e) {
            e.forEach(e => {
                createComments(e.id, e.x, e.y, "1000", e.comment, e.url);
            });
        });
    }
    close_all_Comment() {
        this.all_node.forEach(n => {
            n.close_comment();
        });
    }
    close_all_pin() {
        var flag = true;
        this.all_node.forEach(n => {
            if ($('#' + n.pin_node.node.id).is(":hidden")) {
                flag = false;
            }
        });
        this.all_node.forEach(n => {
            if (flag) {
                if ($("#" + n.pin_node.id).is(":visible")) {
                    $("#" + n.pin_node.id).hide();
                }
            }
            else {
                if ($("#" + n.pin_node.id).is(":hidden")) {
                    $("#" + n.pin_node.id).show();
                }
            }
        });
    }
}
class DB {
    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    constructor() {
        this.urlmanage = new URLManage();
    }
    /**
     * サーバーから情報を読み込む
    */
    Load_Comment() {
        let server_url = this.urlmanage.get_url_get_from_url();
        var info = [{}];
        var parameter = { url: this.urlmanage.current_url, sharenum: this.urlmanage.getParam("ShareNum") };
        return new Promise(function (resolve) {
            $.ajax({
                type: 'GET',
                url: server_url,
                data: parameter,
                dataType: 'text'
            }).done(function (data) {
                console.log("DEBUG: LoadData = " + data);
                JSON.parse(data).forEach((e) => {
                    info.push({ id: e.node_id, x: e.x, y: e.y, comment: e.comment, url: e.url });
                });
                resolve(info);
            });
        });
    }
    /**
     * 作成したPIN及びコメントをサーバに形式を整えて送信し、保存
     * @param id コメントのid属性
     * @param x PINのx座標
     * @param y PINのy座標
     * @param comment コメントの内容
     */
    Save_PIN(id, x, y, comment) {
        // サーバに形式を整えて送信 
        $.ajax({
            type: 'POST',
            url: this.urlmanage.server_url,
            data: {
                comment: {
                    node_id: id,
                    x: x,
                    y: y,
                    comment: comment,
                    url: this.urlmanage.current_url
                }
            }
        }).done(function (data) {
            console.log("DEBUG: SaveData = {id: " + data.comment.node_id + ", x: " + data.comment.x + ", y: " + data.comment.y + ", comment: " + data.comment.comment + ", url: " + data.comment.url + "}");
        });
    }
}
class Mode {
    constructor() {
        this.flag = "read";
        this.form_unmake = true;
    }
    /**
     * 状態を変更するための関数
     * @param command セットした状態
     */
    Change_mode(command) {
        if (command != "wirte" && command != "read") {
            this.flag = "read";
        }
        this.flag = command;
    }
    /**
     * 指定したモードになっているかどうかを返す
     * @param mode 確かめるモード
     */
    Judge_mode(mode) {
        if (this.flag == mode) {
            return true;
        }
        else {
            return false;
        }
    }
    Change_unmake() {
        if (this.form_unmake) {
            this.form_unmake = false;
        }
        else {
            this.form_unmake = true;
        }
    }
    Change_reverse_mode() {
        console.log("DEBUG: Mode" + this.flag);
        if (this.flag == "read") {
            this.flag = "write";
            this.form_unmake = false;
        }
        else {
            this.flag = "read";
        }
    }
}
class ManageID {
    constructor() {
        this.maxnum = 100000;
        this.minnum = 1;
    }
    get_Random_id() {
        let id = this.make_random_id();
        return id;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    make_random_id() {
        let id = String(this.getRandomInt(this.minnum, this.maxnum));
        return "Comment" + id;
    }
}
class Form {
    constructor() {
        this.form_div = "latest_div";
    }
    /**
     * formを作る関数
     * @param comment_manager mainにあるcomment_manager(コメントを新しく作るため)
     * @param e クリックした場所の座標をjqueryより取得
     */
    make_form(comment_manager, e) {
        // 書き込みモードを解除        
        this.init_form();
        //ポップアップとして表示するもの全体のdivを用意
        let latest_div = document.createElement("div");
        latest_div.id = "latest_div";
        latest_div.style.backgroundColor = "#e6e6fa";
        latest_div.style.zIndex = "1000000";
        document.body.appendChild(latest_div);
        // table作成
        let latest_table = document.createElement("table");
        latest_table.id = "latest_table";
        latest_div.appendChild(latest_table);
        //tableのbody作成
        let latest_tbody = document.createElement("tbody");
        latest_tbody.id = "latest_tbody";
        latest_table.appendChild(latest_tbody);
        let inputs = this.make_table(["ユーザーネーム", "コメント"], latest_tbody);
        //ポップアップの呼び出し。
        $('#' + latest_div.id).dialog({
            dialogClass: "wkDialogClass",
            title: 'コメント入力フォーム',
            width: "400",
            height: "auto",
            closeText: "閉じる",
            modal: true,
            buttons: {
                "登録": function () {
                    let tmp_user = "";
                    let tmp_comment = "";
                    tmp_user = inputs[0].value;
                    tmp_comment = inputs[1].value;
                    console.log("ユーザーネーム: " + tmp_user + "   コメント: " + tmp_comment);
                    // コメントを作成
                    comment_manager.creteNewComments(String(e.pageX), String(e.pageY), "1000", tmp_comment);
                    $(this).dialog('close');
                    $("#latest_div").remove();
                }
            },
            close: function () {
                mode.Change_mode("write");
            }
        });
    }
    init_form() {
        //ノードの初期化
        if (document.getElementById(this.form_div) != null) {
            $("#" + this.form_div).remove();
        }
    }
    make_table(line_name, tbody) {
        var ret = [];
        line_name.forEach(function (name) {
            ret.push(this.make_table_n(name, tbody, ret.length));
        }.bind(this));
        return ret;
    }
    make_table_n(line_name, tbody, line_n) {
        //table n行目作成
        let tr = tbody.insertRow(-1);
        tr.id = "latest_tr" + line_n;
        //tabel n行目のheader作成。
        let th = document.createElement("th");
        th.id = "latest_th" + line_n;
        th.textContent = line_name;
        tr.appendChild(th);
        //tabel n行目の値を作成。
        let td = document.createElement("td");
        td.id = "latest_td" + line_n;
        let input = document.createElement("input");
        input.id = "input" + line_n;
        td = input;
        tr.appendChild(td);
        return input;
    }
    make_table_n_textarea(line_name, tbody, line_n) {
        //table n行目作成
        let tr = tbody.insertRow(-1);
        tr.id = "latest_tr" + line_n;
        //tabel n行目のheader作成。
        let th = document.createElement("th");
        th.id = "latest_th" + line_n;
        th.textContent = line_name;
        tr.appendChild(th);
        //tabel n行目の値を作成。
        let td = document.createElement("td");
        td.id = "latest_td" + line_n;
        let input = document.createElement("input");
        input.id = "input" + line_n;
        td = input;
        tr.appendChild(td);
        return input;
    }
}
class URLManage {
    constructor() {
        this.current_url = location.href;
        this.server_url = "https://stark-coast-28712.herokuapp.com/comments";
        console.log("DEBUG: current_url = " + this.current_url);
    }
    get_url_get_from_url() {
        let get_url = "/get_from_url";
        return this.server_url + get_url;
    }
    /**
     * Get the URL parameter value(from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
     *
     * @param  name {string} パラメータのキー文字列
     * @return url {url} 対象のURL文字列（任意）
     */
    getParam(name, url = "") {
        if (url == "")
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
class Menu_Node {
    constructor() {
        this.body = document.createElement("div");
        this.menu_class = "latest_menubar";
        this.uni_button_class = "latest_button";
        this.button_n_list = ["one", "two", "three", "four", "five"];
        this.button_index = 0;
    }
    make_body() {
        this.body = document.createElement("div");
        this.body.className = this.menu_class;
    }
    make_and_append_button(set_function) {
        let new_button = document.createElement("div");
        new_button.classList.add(this.uni_button_class);
        let only_button_class = this.uni_button_class + "--" + this.button_n_list[this.button_index];
        this.button_index += 1;
        new_button.classList.add(only_button_class);
        new_button.onclick = function () {
            set_function();
        };
        this.body.appendChild(new_button);
    }
    appendmenubar() {
        document.body.append(this.body);
    }
}
class Debug {
    constructor() {
    }
    make_random_comment() {
        let comments = ["ようこそLatestへ!!", "これ、楽しそう!", "これならどうかな?", "こんなのできたんだね!"];
        let min = Math.ceil(0);
        let max = Math.floor(comments.length);
        let num = Math.floor(Math.random() * (max - min)) + min;
        return comments[num];
    }
    get_random_comment() {
        let comment = this.make_random_comment();
        return comment;
    }
}
// 新しいファイルを作った時には必ずここに書き込んでください。
/// <reference path = "Elements.ts" />
/// <reference path = "DB.ts" />
/// <reference path = "Mode.ts" />
/// <reference path = "ManageID.ts" />
/// <reference path = "Form.ts" />
/// <reference path = "URL.ts" />
/// <reference path = "Menu.ts" />
/// <reference path = "Debug.ts" />
// 変数を宣言
let mode = new Mode();
let comment_manager = new CommentManager();
let debug = new Debug();
let form = new Form();
let menu = new Menu_Node();
// サイトを読み込んだときに実行
window.onload = function () {
    // コメントの読み込み
    comment_manager.loadComment();
    // メニューバーを作成する。
    menu.make_body();
    // 読み書き
    menu.make_and_append_button(mode.Change_reverse_mode.bind(mode));
    // 全ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_Comment.bind(comment_manager));
    // 共有範囲指定
    menu.make_and_append_button(function () { });
    // ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_pin.bind(comment_manager));
    // メニューバーを画面に追加
    menu.appendmenubar();
};
//background.jsから送られたメッセージで機能を変更する
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    /*
        コマンドをmodeに書き込み
        コマンド=>"read", "write"
    */
    mode.Change_mode(request.command);
});
$("body").on("click", function (e) {
    console.log("DEBUG: mode = " + mode.flag);
    // 書き込みモードならPIN・コメントを作成
    if (mode.Judge_mode("write")) {
        // フォームを閉じる際にもう一度開かないようにするための対策
        if (mode.form_unmake) {
            // 書き込み中にフォームを再度作らないように制御
            mode.Change_mode("read");
            form.make_form(comment_manager, e);
        }
        mode.Change_unmake();
    }
});
