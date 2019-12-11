// 新しいファイルを作った時には必ずここに書き込んでください。
/// <reference path = "Elements.ts" />
/// <reference path = "DB.ts" />
/// <reference path = "Mode.ts" />
/// <reference path = "ManageID.ts" />
/// <reference path = "Form.ts" />
/// <reference path = "URL.ts" />
/// <reference path = "Debug.ts" />

// 変数を宣言
let mode = new Mode()
let comment_manager = new CommentManager()
let debug = new Debug()
let form = new Form()

// サイトを読み込んだときに実行
window.onload = function(){
    // コメントの読み込み
    comment_manager.loadComment()
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
