//押された回数を記憶するための変数
var count = 0;
//右上のアイコンがクリックされたら実行
chrome.browserAction.onClicked.addListener(function (tab) {
    //押されたらカウントを増やす
    count++;
    //カウントが偶数の時
    if (count % 2 == 0) {
        //アイコンをオフの物に変更
        chrome.browserAction.setIcon({ path: "icon_off.png" });
        if (tab.id == undefined) {
            return;
        }
        //content.tsにStopメッセージを送る
        chrome.tabs.sendMessage(tab.id, { command: "Stop" });
    }
    else { //それ以外
        //アイコンをオンの物に変更
        chrome.browserAction.setIcon({ path: "icon_32.png" });
        if (tab.id == undefined) {
            return;
        }
        //content.tsにActionメッセージを送る。
        chrome.tabs.sendMessage(tab.id, { command: "Action" });
    }
});
