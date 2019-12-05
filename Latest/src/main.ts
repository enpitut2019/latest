/// <reference path = "Elements.ts" />
/// <reference path = "DB.ts" />
/// <reference path = "Mode.ts" />
/// <reference path = "ManageID.ts" />
/// <reference path = "Debug.ts" />

// 変数を宣言
let mode = new Mode()
let comment_manager = new CommentManager()
let debug = new Debug()

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
    if(mode.Judge_mode("write")){
        // 書き込みモードを解除(バグらないように一応)
        mode.Change_mode("read")
        // 書き込みモードならPIN・コメントを作成
        comment_manager.creteNewComments(String(e.pageX), String(e.pageY), "1000", debug.get_random_comment())
        // 本来であれば書き込みモードを再開(?)(上と同様に)
        mode.Change_mode("write")
    }
});
