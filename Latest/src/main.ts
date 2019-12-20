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
let mode = new Mode()
let comment_manager = new CommentManager()
let debug = new Debug()
let form = new Form()
let menu = new Menu_Node()

// サイトを読み込んだときに実行
window.onload = function(){
    // コメントの読み込み
    comment_manager.loadComment()

    // メニューバーを作成する。
    menu.make_body()
    // 読み書き
    menu.make_and_append_button(mode.Change_reverse_mode.bind(mode))
    // 全ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_Comment.bind(comment_manager))
    // 共有範囲指定
    menu.make_and_append_button(function(){})
    // ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_pin.bind(comment_manager))
    menu.get_img("1.png")
    menu.get_img("2_off.png")
    menu.get_img("3.png")
    menu.get_img("4.png")
    // メニューバーを画面に追加
    menu.appendmenubar()
}

//background.jsから送られたメッセージで機能を変更する
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    /*
        コマンドをmodeに書き込み
        コマンド=>"read", "write"
    */
    mode.Change_mode(request.command)
});

$("body").on("click", function(e){
    console.log("DEBUG: mode = " + mode.flag)
    // 書き込みモードならPIN・コメントを作成
    if(mode.Judge_mode("write")){
        // フォームを閉じる際にもう一度開かないようにするための対策
        if (mode.form_unmake){
            // 書き込み中にフォームを再度作らないように制御
            mode.Change_mode("read")
            form.make_form(comment_manager, e)
        }
        mode.Change_unmake()
    }
});


