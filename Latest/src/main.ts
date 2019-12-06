// 新しいファイルを作った時には必ずここに書き込んでください。
/// <reference path = "Elements.ts" />
/// <reference path = "DB.ts" />
/// <reference path = "Mode.ts" />
/// <reference path = "ManageID.ts" />
/// <reference path = "Debug.ts" />
/// <reference path = "Form.ts" />

// 変数を宣言
let mode = new Mode()
let comment_manager = new CommentManager()
let debug = new Debug()
let form = new Form()

/*
    サイトを読み込んだときに実行
*/
window.onload = function(){
    comment_manager.loadComment()
}

//background.jsから送られたメッセージで機能を変更する
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    mode.Change_mode(request.command)
});

$("body").on("click", function(e){
    // 書き込みモードならPIN・コメントを作成
    if(mode.Judge_mode("write")){
        if (mode.form_unmake){
            form.make_form(comment_manager, e)
        }
        mode.Change_unmake()
    }
});
