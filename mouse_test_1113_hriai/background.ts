chrome.contextMenus.create({
    title: "コンテキストメニューを追加",
    contexts: ["all"],
    type: "normal",
    onclick: function (info) {
        window.alert(info.selectionText);
    }
})