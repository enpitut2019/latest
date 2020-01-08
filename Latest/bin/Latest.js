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
    constructor(id, url = "", type = "", element_type = "div", class_name = "") {
        // elementの作成
        this.node = document.createElement(element_type);
        this.uniid = id;
        this.id = this.make_id(id, type);
        this.type = type;
        this.element_type = type;
        this.url = url;
        this.class = class_name;
    }
    /**
     * 各値をノードに書き込む
     */
    set_Value() {
        // idの付与
        this.node.id = this.id;
        // classの付与
        this.node.className = this.class;
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
    constructor(id, x, y, set_function, url = "") {
        super(id, url, "PIN", "div", "latest_pin");
        this.x = x;
        this.y = y;
        this.set_function = set_function;
    }
    set_Value() {
        super.set_Value();
        // 位置を付与(absolute)
        this.Set_Position_absolute(this.x, this.y);
        // クリックしたときのアクションをセット
        super.set_Function(this.set_function);
        // 表示する言葉(将来的には画像)
        // super.set_Image()
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
    constructor(id, comment, url = "") {
        super(id, "", "", "div", "latest_comment");
        this.comment = comment;
    }
    set_Value() {
        super.set_Value();
        // コメントの内容を付与
        this.node.innerHTML = this.comment;
    }
}
/**
 * コメントをクローズするためのノードを作成
 */
class Close_Node extends HTML_Element {
    constructor(id, set_function, url = "") {
        super(id, "", "close", "div", "latest_close");
        this.set_function = set_function;
    }
    set_Value() {
        super.set_Value();
        // 表示する言葉(将来的には画像)
        super.set_Image("x");
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
        this.comment_node = new Comment_Node(id, comment, url);
        this.cls_node = new Close_Node(id, this.close_comment.bind(this), url);
        this.pin_node = new PIN_Node(id, x, y, this.Display_Comment.bind(this), url);
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
    remove_comment() {
        if ($('#' + this.comment_node.id).length) {
            $('#' + this.comment_node.id).remove();
            $('#' + this.cls_node.id).remove();
            $('#' + this.pin_node.id).remove();
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
    creteNewComments(x, y, z = "1000", comment, urlmanage) {
        let id = this.manageid.get_Random_id();
        let [relative_x, relative_y] = this.Change_from_abs_to_rel(Number(x), Number(y));
        console.log("DEBUG: relative_x = " + relative_x + ", relative_y = " + relative_y);
        let node = new Comments(id, x, y, z, comment);
        node.createComments();
        node.appendComments();
        node.set_CurrentURL();
        this.db.Save_PIN(id, String(relative_x), String(relative_y), comment, urlmanage);
        this.all_node.push(node);
    }
    /*
    サーバーから情報を読み込む
    読み込んだ内容を１つずつ取り出してCreate_PIN()にいれる。
    */
    loadComment(urlmanage) {
        let createComments = this.createComments.bind(this);
        let changefromreltoabs = this.Change_from_rel_to_abs.bind(this);
        this.db.Load_Comment(urlmanage)
            .then(function (e) {
            e.forEach(e => {
                let [absolute_x, absolute_y] = changefromreltoabs(Number(e.x), Number(e.y));
                console.log("DEBUG: absolute_x = " + absolute_x + ", absolute_y = " + absolute_y);
                createComments(e.id, String(absolute_x), String(absolute_y), "1000", e.comment, e.url);
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
        const target_node = document.getElementsByClassName("latest_button--four");
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
                $(target_node).toggleClass("latest_button--six");
            }
            else {
                if ($("#" + n.pin_node.id).is(":hidden")) {
                    $("#" + n.pin_node.id).show();
                }
                $(target_node).toggleClass("latest_button--six");
            }
        });
    }
    Change_from_abs_to_rel(abs_x, abs_y) {
        let rel_x = abs_x / document.body.clientWidth;
        let rel_y = abs_y / document.body.clientHeight;
        return [rel_x, rel_y];
    }
    Change_from_rel_to_abs(rel_x, rel_y) {
        let abs_x = rel_x * document.body.clientWidth;
        let abs_y = rel_y * document.body.clientHeight;
        return [abs_x, abs_y];
    }
    remove_pin() {
        while (this.all_node.length > 0) {
            let n = this.all_node.pop();
            n.remove_comment();
        }
    }
}
class DB {
    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    constructor() {
    }
    /**
     * サーバーから情報を読み込む
    */
    Load_Comment(urlmanage) {
        let server_url = urlmanage.get_url_get_from_url();
        var info = [{}];
        var parameter = { url: urlmanage.current_url, sharenum: urlmanage.sharenum };
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
    Save_PIN(id, x, y, comment, urlmanage) {
        // サーバに形式を整えて送信 
        console.log("DEBUG id = " + id + "x = " + x);
        let comments = {};
        if (urlmanage.sharenum != null) {
            comments = {
                node_id: id,
                x: x,
                y: y,
                comment: comment,
                url: urlmanage.current_url,
                sharenum: urlmanage.sharenum
            };
        }
        else {
            comments = {
                node_id: id,
                x: x,
                y: y,
                comment: comment,
                url: urlmanage.current_url
            };
        }
        $.ajax({
            type: 'POST',
            url: urlmanage.server_url,
            data: {
                comment: comments
            }
        }).done(function (data) {
            console.log("DEBUG: data = " + data);
            console.log("DEBUG: data = " + data.comment);
            console.log("DEBUG: SaveData = {id: " + data.comment.node_id + ", x: " + data.comment.x + ", y: " + data.comment.y + ", comment: " + data.comment.comment + ", url: " + data.comment.url + "}");
        });
    }
}
class Mode {
    constructor() {
        this.flag = "read";
        this.writing = false;
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
    Writing_mode() {
        if (this.writing) {
            this.writing = false;
        }
        else {
            this.writing = true;
        }
    }
    Change_reverse_mode() {
        if (this.writing) {
            return;
        }
        const target_node = document.getElementsByClassName("latest_button--one");
        console.log("DEBUG: Mode: flag = " + this.flag);
        if (this.flag == "read") {
            this.flag = "write";
            $(target_node).toggleClass("latest_button--five");
        }
        else {
            this.flag = "read";
            $(target_node).toggleClass("latest_button--five");
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
        this.form_id = "latest_form";
    }
    /**
     * formを作る関数
     */
    make_form() {
        //ポップアップとして表示するもの全体のdivを用意
        this.form = document.createElement("div");
        this.form.id = this.form_id;
        // table作成
        const latest_table = document.createElement("table");
        this.user_name_form = this.make_table_input("ユーザーネーム", latest_table);
        this.comment_form = this.make_table_textarea("コメント", latest_table);
        this.form.appendChild(latest_table);
    }
    /**
     * ダイアログを開くための関数
     */
    open(x, y, comment_manager, mode, urlmanage) {
        const user_name = this.user_name_form;
        const comment = this.comment_form;
        //ポップアップの呼び出し。
        $(this.form).dialog({
            title: 'コメント入力フォーム',
            width: "400",
            height: "auto",
            modal: true,
            buttons: {
                "登録": function () {
                    const tmp_user = user_name.value;
                    const tmp_comment = comment.value;
                    console.log("ユーザーネーム: " + tmp_user + "   コメント: " + tmp_comment + "   ShareNum: " + urlmanage.sharenum);
                    // コメントを作成
                    comment_manager.creteNewComments(x, y, "1000", tmp_comment, urlmanage);
                    $(this).dialog('close');
                }
            },
            open: function () {
                mode.Writing_mode();
            },
            close: function () {
                user_name.value = "";
                comment.value = "";
                mode.Writing_mode();
            }
        });
    }
    /**
     * テーブルにinputフォームを追加してそれを返す。
     * @param line_name フォームの名前を指定
     * @param table 追加したいテーブルを指定
     */
    make_table_input(line_name, table) {
        //table 1行作成
        const row = table.insertRow(-1);
        //table 作った1行の1列目を追加(フォームの名前)
        row.insertCell(-1).appendChild(document.createTextNode(line_name));
        ;
        //tabel n行目の値を作成。
        const input = document.createElement("input");
        row.appendChild(input);
        return input;
    }
    make_table_textarea(line_name, table) {
        //table 1行作成
        const row = table.insertRow(-1);
        //table 作った1行の1列目を追加(フォームの名前)
        row.insertCell(-1).appendChild(document.createTextNode(line_name));
        ;
        //tabel n行目の値を作成。
        const textarea = document.createElement("textarea");
        row.appendChild(textarea);
        return textarea;
    }
}
class URLManage {
    constructor() {
        this.current_url = location.href;
        this.server_url = "https://stark-coast-28712.herokuapp.com/comments";
        this.sharenum = null;
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
     * @param  url {url} 対象のURL文字列（任意）
     * @return パラメーターの値
     */
    getParam(name, url = "") {
        if (url == "")
            url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        if (!results)
            return;
        if (!results[2])
            return;
        this.sharenum = decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    get_href() {
        const sharenum = "sharenum";
        var regex = new RegExp("[?&]" + sharenum + "(=([^&#]*)|&|#|$)");
        this.current_url = this.current_url.replace(regex, "");
        console.log("DEBUG GET_HREF: current_url2 = " + this.current_url);
    }
}
class Menu_Node {
    constructor() {
        this.body = document.createElement("div");
        this.menu_class = "latest_menubar";
        this.uni_button_class = "latest_button";
        this.button_n_list = ["one", "two", "three", "four", "five", "six", "seven"];
        this.button_index = 0;
        this.img_root = document.documentElement;
        this.img_count = 1;
        this.img_url = chrome.extension.getURL('img/'); //共通するURLを取得
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
    get_img(img_name) {
        let css_img_id = "--eyeurl" + this.img_count;
        let target_img_url = "url(" + this.img_url + img_name + ")";
        console.log("DEBUG: css_img_id = " + css_img_id);
        console.log("DEBUG: url = " + target_img_url);
        this.img_count += 1;
        this.img_root.style.setProperty(css_img_id, target_img_url);
    }
}
class Share {
    constructor(urlmanage, comment_manager) {
        this.urlmanage = urlmanage;
        this.comment_manager = comment_manager;
        this.current_sharenum = urlmanage.sharenum;
        this.limit = false;
        this.setLimit = this.setLimit_false.bind(this);
    }
    get_Sharenum() {
        this.urlmanage.getParam("sharenum");
        this.current_sharenum = this.urlmanage.sharenum;
    }
    Init_Share() {
        this.urlmanage.sharenum = this.make_share_num();
        this.current_sharenum = this.urlmanage.sharenum;
        this.comment_manager.remove_pin();
        this.Result_Init_Share(this.make_share_url(this.urlmanage.current_url, this.current_sharenum));
    }
    make_share_num() {
        const max_sharenum = 10000;
        const min_sharenum = 0;
        let min = Math.ceil(min_sharenum);
        let max = Math.floor(max_sharenum);
        let num = Math.floor(Math.random() * (max - min)) + min;
        return String(num);
    }
    Change_Share() {
        console.log("DEBUG: Change_Share: limit = " + this.limit);
        if (this.limit) {
            return;
        }
        this.Change_Share_img();
        if (this.current_sharenum == null) {
            this.Init_Share();
        }
        else {
            this.comment_manager.remove_pin();
            if (this.urlmanage.sharenum == null) {
                // 共有状態off->on
                this.urlmanage.sharenum = this.current_sharenum;
            }
            else {
                // 共有状態on->off
                this.urlmanage.sharenum = null;
            }
            this.comment_manager.loadComment(this.urlmanage);
            this.limit = true;
            setTimeout(this.setLimit, 1000);
        }
    }
    setLimit_false() {
        this.limit = false;
        console.log("DEBUG: setLimit: limit = " + this.limit);
    }
    Change_Share_img() {
        const target_node = document.getElementsByClassName("latest_button--three");
        $(target_node).toggleClass("latest_button--seven");
    }
    make_share_url(current_url, share_num) {
        let para = "sharenum=" + share_num;
        console.log("DEBUG: location.search = " + location.search);
        if (location.search != "") {
            para = '&' + para;
        }
        else {
            para = '?' + para;
        }
        return current_url + para;
    }
    Result_Init_Share(url) {
        //ポップアップとして表示するもの全体のdivを用意
        const form = document.createElement("div");
        form.id = "latest_result_share";
        form.style.textAlign = "center";
        const title = document.createElement("h1");
        title.innerHTML = "共有URLはこちら";
        form.appendChild(title);
        const context = document.createElement("input");
        context.id = "latest_share_url";
        context.type = "text";
        context.value = url;
        context.readOnly = true;
        context.width = 400;
        context.size = 40;
        context.style.textAlign = "center";
        context.select();
        form.appendChild(context);
        //ポップアップの呼び出し。
        $(form).dialog({
            title: '共有URL',
            width: "400",
            height: "auto",
            modal: true,
            buttons: {
                "URLをコピーする": function () {
                    $(context).select();
                    document.execCommand("Copy");
                    const result = document.createElement("div");
                    result.innerHTML = "コピーできました!";
                    form.appendChild(result);
                }
            }
        });
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
/// <reference path = "Share.ts" />
/// <reference path = "Debug.ts" />
// 変数を宣言
const mode = new Mode();
const comment_manager = new CommentManager();
const debug = new Debug();
const form = new Form();
const menu = new Menu_Node();
const urlmanage = new URLManage();
const share = new Share(urlmanage, comment_manager);
// サイトを読み込んだときに実行
window.onload = function () {
    share.get_Sharenum();
    urlmanage.get_href();
    // コメントの読み込み
    comment_manager.loadComment(urlmanage);
    // フォームの作成
    form.make_form();
    // メニューバーを作成する。
    menu.make_body();
    // 読み書き
    menu.make_and_append_button(mode.Change_reverse_mode.bind(mode));
    // 全ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_Comment.bind(comment_manager));
    // 共有範囲指定
    menu.make_and_append_button(share.Change_Share.bind(share));
    // ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_pin.bind(comment_manager));
    menu.get_img("1.png");
    menu.get_img("2_off.png");
    menu.get_img("3.png");
    menu.get_img("4.png");
    menu.get_img("1_off.png");
    menu.get_img("4_off.png");
    menu.get_img("3_off.png");
    // メニューバーを画面に追加
    menu.appendmenubar();
    if (share.current_sharenum == null) {
        share.Change_Share_img();
    }
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
    // メニューバーをクリックしたときには無効化
    const click_class = e.target.className;
    if (click_class) {
        console.log("DEBUG: Main: Click_class = " + click_class);
    }
    if (click_class.includes("latest_button")) {
        console.log("DEBUG: You click menubar");
        return;
    }
    // 書き込みモードならPIN・コメントを作成
    if (mode.Judge_mode("write")) {
        console.log("DEBUG: WriteStart");
        // 書き込み中にフォームを再度作らないように制御
        mode.Change_reverse_mode();
        form.open(String(e.pageX), String(e.pageY), comment_manager, mode, urlmanage);
    }
});
