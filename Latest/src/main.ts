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
const mode = new Mode()
const comment_manager = new CommentManager()
const debug = new Debug()
const form = new Form()
const menu = new Menu_Node()
const urlmanage = new URLManage()
const share = new Share(urlmanage, comment_manager)

// サイトを読み込んだときに実行
window.onload = function(){
    share.get_Sharenum()
    urlmanage.get_href()
    // コメントの読み込み
    comment_manager.loadComment(urlmanage)

    // フォームの作成
    form.make_form()

    // メニューバーを作成する。
    menu.make_body()
    // 読み書き
    menu.make_and_append_button(mode.Change_reverse_mode.bind(mode))
    // 全ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_Comment.bind(comment_manager))
    // 共有範囲指定
    menu.make_and_append_button(share.Change_Share.bind(share))
    // ノードの表示・非表示
    menu.make_and_append_button(comment_manager.close_all_pin.bind(comment_manager))
    menu.get_img("1.png")
    menu.get_img("2_off.png")
    menu.get_img("3.png")
    menu.get_img("4.png")
    menu.get_img("1_off.png")
    menu.get_img("4_off.png")
    menu.get_img("3_off.png")
    menu.get_img("1_hover.png")
    menu.get_img("2_hover.png")
    menu.get_img("3_hover.png")
    menu.get_img("4_hover.png")
    menu.get_img("5_hover.png")
    menu.get_img("6_hover.png")
    menu.get_img("7_hover.png")
    // メニューバーを画面に追加
    menu.appendmenubar()
    if (share.current_sharenum == null){
        share.Change_Share_img()
    }
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
    // メニューバーをクリックしたときには無効化
    const click_class = e.target.className
    if (click_class){
        console.log("DEBUG: Main: Click_class = " + click_class)
    }
    if( click_class.includes("latest_button")){
        console.log("DEBUG: You click menubar");
        return;
    }
    // 書き込みモードならPIN・コメントを作成
    if(mode.Judge_mode("write")){
        console.log("DEBUG: WriteStart");
        // 書き込み中にフォームを再度作らないように制御
        mode.Change_reverse_mode()
        form.open(String(e.pageX), String(e.pageY), comment_manager, mode, urlmanage);
    }
});


