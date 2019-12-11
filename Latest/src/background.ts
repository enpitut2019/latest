//押された回数を記憶するための変数
var count = 0;

//右上のアイコンがクリックされたら実行
chrome.browserAction.onClicked.addListener(function(tab) {
    //押されたらカウントを増やす
    count++;
    //カウントが偶数の時
    if (count%2==0){
        //アイコンをオフの物に変更
        chrome.browserAction.setIcon({path:"img/icon_off.png"});
        if(tab.id == undefined){
            return
        }
        //main.tsにStopメッセージを送る
        chrome.tabs.sendMessage(tab.id, {command:"read"});
    } else {//それ以外
        //アイコンをオンの物に変更
        chrome.browserAction.setIcon({path:"img/icon_32.png"});
        if(tab.id == undefined){
            return
        }
        //main.tsにActionメッセージを送る。
        chrome.tabs.sendMessage(tab.id, {command:"write"});
    }
})

chrome.contextMenus.create({
    title: "コンテクストメニューを追加",
    id:"right",
    contexts: ["all"],
    type: "normal"
});

chrome.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId == "right"){
        window.alert("右クリック押したよ")
    }
});