var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * element作成の親クラス
 */
var HTML_Element = /** @class */ (function () {
    /**
     * elementを作成する。(idとzは必ず指定する)
     * @param id elementがもつid属性
     * @param z 重なり順
     * @param type elementのタイプ("PIN"や"close")
     * @param element_type elementの属性(基本的に"div")
     * @param click_function クリックしたときに発動する関数(指定しなくても良い)
     */
    function HTML_Element(id, z, type, element_type) {
        if (type === void 0) { type = ""; }
        if (element_type === void 0) { element_type = "div"; }
        // elementの作成
        this.node = document.createElement(element_type);
        this.uniid = id;
        this.id = this.make_id(id, type);
        this.z = z;
        this.type = type;
        this.element_type = type;
    }
    HTML_Element.prototype.set_Value = function () {
        // idの付与
        this.node.id = this.id;
        // z位置(重なり順を決定)
        this.node.style.zIndex = this.z;
    };
    /**
     * 指定した値分zIndex(重なり順)を追加
     * @param add_num 加えるz値
     */
    HTML_Element.prototype.add_zIndex = function (add_num) {
        var current_zIndex = this.node.style.zIndex;
        this.node.style.zIndex = String(Number(current_zIndex) + add_num);
    };
    /**
     * ノードにidをセットする。
     */
    HTML_Element.prototype.set_style = function () {
        this.node.style.padding = "10px";
        this.node.style.marginBottom = "10px";
        this.node.style.border = "1px solid #333333";
        this.node.style.backgroundColor = "#ffff99";
    };
    /**
     * カーソルの表示方法を設定
     * @param type ノード上のカーソルの表示方法を指定
     */
    HTML_Element.prototype.set_cursor = function (type) {
        this.node.style.cursor = type;
    };
    /**
     * show()関数でコメントが表示できるようにdisplay属性を付与(defaultはnone)
     * @param type ノードの表示状態を指定する
     */
    HTML_Element.prototype.set_display = function (type) {
        this.node.style.display = type;
    };
    /**
     * 指定した関数をクリックしたときに発火する関数をセットする関数
     * @param click_function クリックしたときに発火する関数
     */
    HTML_Element.prototype.set_Function = function (click_function) {
        // elementをクリックしたときの関数を追加
        this.node.onclick = function () {
            click_function();
        };
    };
    /**
     * 指定したURLから画像をセットする関数
     * @param image セットするイメージの画像を指定する(本来は画像のURLを指定)
     */
    HTML_Element.prototype.set_Image = function (image) {
        if (image === void 0) { image = ""; }
        this.node.innerHTML = image;
    };
    /**
    * 指定したidのclose-idやPIN-idを返す
    * @param id コメントのid
    * @param add_id 追加したいid("close"or"PIN")
    */
    HTML_Element.prototype.make_id = function (id, add_id) {
        if (add_id == "") {
            return id;
        }
        return id + "_" + add_id;
    };
    return HTML_Element;
}());
/**
 * PINを作成するためのclass
 */
var PIN_Node = /** @class */ (function (_super) {
    __extends(PIN_Node, _super);
    /**
     * PINを作成する
     * @param id PINのid属性
     * @param x pin-nodeのx座標
     * @param y pin-nodeのy座標
     * @param z pin-nodeのz座標
     */
    function PIN_Node(id, x, y, z, set_function) {
        var _this = _super.call(this, id, z, "PIN", "div") || this;
        _this.x = x;
        _this.y = y;
        _this.set_function = set_function;
        return _this;
    }
    PIN_Node.prototype.set_Value = function () {
        _super.prototype.set_Value.call(this);
        // 位置を付与(absolute)
        this.Set_Position_absolute(this.x, this.y);
        // 表示する言葉(将来的には画像)
        _super.prototype.set_Image.call(this);
        // 見た目の設定
        _super.prototype.set_style.call(this);
        _super.prototype.set_cursor.call(this, "pointer");
        // クリックしたときのアクションをセット
        _super.prototype.set_Function.call(this, this.set_function);
    };
    /**
     * pin-nodeの座標を指定する。
     * @param x pin-nodeのx座標
     * @param y pin-nodeのy座標
     */
    PIN_Node.prototype.Set_Position_absolute = function (x, y) {
        this.node.style.position = "absolute";
        this.node.style.left = x + "px";
        this.node.style.top = y + "px";
    };
    return PIN_Node;
}(HTML_Element));
/**
 * コメントのノードを作成
 */
var Comment_Node = /** @class */ (function (_super) {
    __extends(Comment_Node, _super);
    function Comment_Node(id, z, comment) {
        var _this = _super.call(this, id, z) || this;
        _this.comment = comment;
        _this.add_zindex = 1;
        return _this;
    }
    Comment_Node.prototype.set_Value = function () {
        _super.prototype.set_Value.call(this);
        // コメントのスタイルを追加。(display="none"も追加)
        _super.prototype.set_style.call(this);
        _super.prototype.set_display.call(this, "none");
        // コメントの内容を付与
        this.node.innerHTML = this.comment;
        // zIndexを追加
        _super.prototype.add_zIndex.call(this, this.add_zindex);
    };
    return Comment_Node;
}(HTML_Element));
/**
 * コメントをクローズするためのノードを作成
 */
var Close_Node = /** @class */ (function (_super) {
    __extends(Close_Node, _super);
    function Close_Node(id, z, set_function) {
        var _this = _super.call(this, id, z, "close", "div") || this;
        _this.add_zindex = 2;
        _this.set_function = set_function;
        return _this;
    }
    Close_Node.prototype.set_Value = function () {
        _super.prototype.set_Value.call(this);
        // コメントのスタイルを追加。(display="none"も追加)
        //super.set_style()
        _super.prototype.set_cursor.call(this, "pointer");
        _super.prototype.set_display.call(this, "none");
        // 表示する言葉(将来的には画像)
        _super.prototype.set_Image.call(this, "x");
        // zIndexを追加
        _super.prototype.add_zIndex.call(this, this.add_zindex);
        // このノードをクリックしたときに発火する関数を指定
        _super.prototype.set_Function.call(this, this.set_function);
    };
    return Close_Node;
}(HTML_Element));
var Comments = /** @class */ (function () {
    /**
     * pin,comment,closeノードを作成するのに必要な値をセットする。
     * @param id ノードのid
     * @param x pinノードのx座標
     * @param y pinノードのy座標
     * @param z pinノードのz座標(重なり順)
     * @param comment commentノードに表示するコメント内容
     */
    function Comments(id, x, y, z, comment) {
        if (z === void 0) { z = "1000"; }
        this.comment_node = new Comment_Node(id, z, comment);
        this.cls_node = new Close_Node(id, z, this.close_comment.bind(this));
        this.pin_node = new PIN_Node(id, x, y, z, this.Display_Comment.bind(this));
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.comment = comment;
    }
    /**
     * 各ノードを作成する。
     */
    Comments.prototype.createComments = function () {
        this.comment_node.set_Value();
        this.cls_node.set_Value();
        this.pin_node.set_Value();
    };
    /**
     * 作成したノードをサイトに追加する
     */
    Comments.prototype.appendComments = function () {
        document.body.appendChild(this.comment_node.node);
        document.body.appendChild(this.cls_node.node);
        document.body.appendChild(this.pin_node.node);
    };
    /**
     * 新しいノードをサイトに追加した後、データベースに追加する
     */
    Comments.prototype.createNewComments = function (db) {
        this.createComments();
        db.Save_PIN(this.id, this.x, this.y, this.comment);
    };
    /**
    * コメントを表示させる関数
    */
    Comments.prototype.Display_Comment = function () {
        var comment_id = this.comment_node.id;
        $("#" + this.pin_node.id).on("click", function (e) {
            if ($("#" + comment_id).is(":hidden")) {
                this.Move_Comment(e.pageX, e.pageY, this.id);
            }
        }.bind(this));
    };
    /**
    * コメントとバツマークを指定した位置に表示させる。
    * @param x 指定したx座標
    * @param y 指定したy座標
    * @param id クリックしたPINに対応したコメントのid属性
    */
    Comments.prototype.Move_Comment = function (x, y, id) {
        // 対象のidのコメントとそのコメントのバツマークを表示状態に変更
        $("#" + this.comment_node.id).show();
        $("#" + this.cls_node.id).show();
        // 指定の位置にコメントを移動
        this.Set_Position_jQuery(x, y, this.comment_node.id);
        // バツマークの移動座標を計算
        var cls_btn_x = x;
        // コメントの幅を取得
        var target_width = $("#" + this.comment_node.id).outerWidth(true);
        // コメントの幅が取得できればその分右にずらす
        if (target_width != undefined) {
            cls_btn_x += target_width - 5;
        }
        var cls_btn_y = y - 5;
        // 指定の位置の右上にバツマークを移動
        this.Set_Position_jQuery(cls_btn_x, cls_btn_y, this.cls_node.id);
    };
    /**
     * コメントをクローズするための関数
     */
    Comments.prototype.close_comment = function () {
        if ($("#" + this.cls_node.id).is(":visible")) {
            $("#" + this.cls_node.id).hide();
            $("#" + this.comment_node.id).hide();
        }
    };
    /**
     * 対象となるノードの座標を変更する。
     * @param x 対象のx座標
     * @param y 対象のy座標
     * @param id 対象のid属性
     */
    Comments.prototype.Set_Position_jQuery = function (x, y, id) {
        $("#" + id).css({
            "position": "absolute",
            "left": x,
            "top": y
        });
    };
    return Comments;
}());
var CommentManager = /** @class */ (function () {
    /**
     * db関係の変数を渡す。
     */
    function CommentManager() {
        this.db = new DB();
        this.manageid = new ManageID();
    }
    /**
     * 各ノードを作成する。
     */
    CommentManager.prototype.createComments = function (id, x, y, z, comment) {
        if (z === void 0) { z = "1000"; }
        var node = new Comments(id, x, y, z, comment);
        node.createComments();
        node.appendComments();
    };
    /**
     * 新しいノードをサイトに追加した後、データベースに追加する
     */
    CommentManager.prototype.creteNewComments = function (x, y, z, comment) {
        if (z === void 0) { z = "1000"; }
        var id = this.manageid.get_Random_id();
        var node = new Comments(id, x, y, z, comment);
        node.createComments();
        node.appendComments();
        this.db.Save_PIN(id, x, y, comment);
    };
    /*
    サーバーから情報を読み込む
    読み込んだ内容を１つずつ取り出してCreate_PIN()にいれる。
    */
    CommentManager.prototype.loadComment = function () {
        var _this = this;
        var load_comments = this.db.Load_Comment();
        load_comments.forEach(function (e) {
            _this.createComments(e.id, e.x, e.y, "1000", e.comment);
        });
    };
    return CommentManager;
}());
var DB = /** @class */ (function () {
    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    function DB() {
    }
    /**
     * サーバーから情報を読み込む
    */
    DB.prototype.Load_Comment = function () {
        // 何らかの操作でサーバから値を取得
        return [{ id: "Comment1", x: "100", y: "100", comment: "コメント" }];
    };
    /**
     * 作成したPIN及びコメントをサーバに形式を整えて送信し、保存
     * @param id コメントのid属性
     * @param x PINのx座標
     * @param y PINのy座標
     * @param comment コメントの内容
     */
    DB.prototype.Save_PIN = function (id, x, y, comment) {
        // サーバに形式を整えて送信 
    };
    return DB;
}());
var Mode = /** @class */ (function () {
    function Mode() {
        this.flag = "read";
    }
    /**
     * 状態を変更するための関数
     * @param command セットした状態
     */
    Mode.prototype.Change_mode = function (command) {
        if (command != "wirte" && command != "read") {
            this.flag = "read";
        }
        this.flag = command;
    };
    /**
     * 指定したモードになっているかどうかを返す
     * @param mode 確かめるモード
     */
    Mode.prototype.Judge_mode = function (mode) {
        if (this.flag == mode) {
            return true;
        }
        else {
            return false;
        }
    };
    return Mode;
}());
var ManageID = /** @class */ (function () {
    function ManageID() {
        this.maxnum = 100000;
        this.minnum = 1;
    }
    ManageID.prototype.get_Random_id = function () {
        var id = this.make_random_id();
        return id;
    };
    ManageID.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    ManageID.prototype.make_random_id = function () {
        var id = String(this.getRandomInt(this.minnum, this.maxnum));
        return "Comment" + id;
    };
    return ManageID;
}());
var Debug = /** @class */ (function () {
    function Debug() {
    }
    Debug.prototype.make_random_comment = function () {
        var comments = ["ようこそLatestへ!!", "これ、楽しそう!", "これならどうかな?", "こんなのできたんだね!"];
        var min = Math.ceil(0);
        var max = Math.floor(comments.length);
        var num = Math.floor(Math.random() * (max - min)) + min;
        return comments[num];
    };
    Debug.prototype.get_random_comment = function () {
        var comment = this.make_random_comment();
        return comment;
    };
    return Debug;
}());
var Form = /** @class */ (function () {
    function Form() {
    }
    /**
     * formを作る関数
     * @param comment_manager mainにあるcomment_manager(コメントを新しく作るため)
     * @param e クリックした場所の座標をjqueryより取得
     */
    Form.prototype.make_form = function (comment_manager, e) {
        // 書き込みモードを解除
        mode.Change_mode("read");
        //ノードの初期化
        if (document.getElementById("latest_div") != null) {
            $("#latest_div").remove();
        }
        //ポップアップとして表示するもの全体のdivを用意
        var latest_div = document.createElement("div");
        latest_div.id = "latest_div";
        latest_div.style.backgroundColor = "#e6e6fa";
        document.body.appendChild(latest_div);
        // table作成
        var latest_table = document.createElement("table");
        latest_table.id = "latest_table";
        latest_div.appendChild(latest_table);
        //tableのbody作成
        var latest_tbody = document.createElement("tbody");
        latest_tbody.id = "latest_tbody";
        latest_table.appendChild(latest_tbody);
        //table 1行目作成
        var latest_tr0 = latest_tbody.insertRow(-1);
        latest_tr0.id = "latest_tr0";
        //tabel 1行目のheader作成。
        var latest_th0 = document.createElement("th");
        latest_th0.id = "latest_th0";
        latest_th0.textContent = "ユーザーネーム";
        latest_tr0.appendChild(latest_th0);
        //tabel 1行目の値を作成。
        var latest_td0 = document.createElement("td");
        latest_td0.id = "latest_td0";
        var latest_input0 = document.createElement("input");
        latest_input0.id = "input0";
        latest_td0 = latest_input0;
        latest_tr0.appendChild(latest_td0);
        //table 2行目作成
        var latest_tr1 = latest_tbody.insertRow(-1);
        latest_tr1.id = "latest_tr1";
        //table 2行目のheader作成。
        var latest_th1 = document.createElement("th");
        latest_th1.id = "latest_th1";
        latest_th1.textContent = "コメント";
        latest_tr1.appendChild(latest_th1);
        //table 2行目の値を作成。
        var latest_td1 = document.createElement("td");
        latest_td1.id = "latest_td1";
        var latest_input1 = document.createElement("textarea");
        latest_input1.id = "textarea";
        latest_td1 = latest_input1;
        latest_tr1.appendChild(latest_td1);
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
                    var tmp_user = "";
                    var tmp_comment = "";
                    tmp_user = latest_input0.value;
                    tmp_comment = latest_input1.value;
                    console.log("ユーザーネーム: " + tmp_user + "   コメント: " + tmp_comment);
                    // コメントを作成
                    comment_manager.creteNewComments(String(e.pageX), String(e.pageY), "1000", tmp_comment);
                    $(this).dialog('close');
                    $("#latest_div").remove();
                    // 書き込みモードを再開
                    mode.Change_mode("write");
                }
            }
        });
    };
    return Form;
}());
// 新しいファイルを作った時には必ずここに書き込んでください。
/// <reference path = "Elements.ts" />
/// <reference path = "DB.ts" />
/// <reference path = "Mode.ts" />
/// <reference path = "ManageID.ts" />
/// <reference path = "Debug.ts" />
/// <reference path = "Form.ts" />
// 変数を宣言
var mode = new Mode();
var comment_manager = new CommentManager();
var debug = new Debug();
var form = new Form();
/*
    サイトを読み込んだときに実行
*/
window.onload = function () {
    comment_manager.loadComment();
};
//background.jsから送られたメッセージで機能を変更する
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    mode.Change_mode(request.command);
});
$("body").on("click", function (e) {
    // 書き込みモードならPIN・コメントを作成
    if (mode.Judge_mode("write")) {
        form.make_form(comment_manager, e);
    }
});
