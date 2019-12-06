class Form{
    /**
     * formを作る関数
     * @param comment_manager mainにあるcomment_manager(コメントを新しく作るため)
     * @param e クリックした場所の座標をjqueryより取得
     */
    make_form(comment_manager: CommentManager, e: JQuery.ClickEvent){
        // 書き込みモードを解除
        mode.Change_mode("read")
        //ノードの初期化
        if(<HTMLDivElement>document.getElementById("latest_div") != null){
            $("#latest_div").remove();
        }
​
        //ポップアップとして表示するもの全体のdivを用意
        let latest_div = document.createElement("div");
        latest_div.id = "latest_div";
        latest_div.style.backgroundColor = "#e6e6fa";
        document.body.appendChild(latest_div);
​
        // table作成
        let latest_table = document.createElement("table");
        latest_table.id = "latest_table";
        latest_div.appendChild(latest_table);

        //tableのbody作成
        let latest_tbody = document.createElement("tbody");
        latest_tbody.id = "latest_tbody";
        latest_table.appendChild(latest_tbody);

        //table 1行目作成
        let latest_tr0 = latest_tbody.insertRow(-1);
        latest_tr0.id = "latest_tr0";
        //tabel 1行目のheader作成。
        let latest_th0= document.createElement("th");
        latest_th0.id = "latest_th0";
        latest_th0.textContent = "ユーザーネーム";
        latest_tr0.appendChild(latest_th0);
        //tabel 1行目の値を作成。
        let latest_td0 = document.createElement("td");
        latest_td0.id = "latest_td0";
        let latest_input0: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        latest_input0.id = "input0";
        latest_td0 = <HTMLTableDataCellElement><unknown>latest_input0;
        latest_tr0.appendChild(latest_td0);

        //table 2行目作成
        let latest_tr1 = latest_tbody.insertRow(-1);
        latest_tr1.id = "latest_tr1";
        //table 2行目のheader作成。
        let latest_th1 = document.createElement("th");
        latest_th1.id = "latest_th1";
        latest_th1.textContent = "コメント";
        latest_tr1.appendChild(latest_th1);
        //table 2行目の値を作成。
        let latest_td1 = document.createElement("td");
        latest_td1.id = "latest_td1";
        let latest_input1: HTMLTextAreaElement = <HTMLTextAreaElement>document.createElement("textarea");
        latest_input1.id = "textarea";
        latest_td1 = <HTMLTableDataCellElement><unknown>latest_input1;
        latest_tr1.appendChild(latest_td1);

        //ポップアップの呼び出し。
        $('#'+latest_div.id).dialog({
            dialogClass:"wkDialogClass",
            title: 'コメント入力フォーム',
            width: "400",
            height: "auto",
            closeText: "閉じる",
            modal: true,
            buttons: {
                "登録": function(){
                let tmp_user: string = "";
                let tmp_comment: string = "";
                tmp_user = latest_input0.value;
                tmp_comment = latest_input1.value;
                console.log("ユーザーネーム: "+tmp_user+"   コメント: "+tmp_comment);
                // コメントを作成
                comment_manager.creteNewComments(String(e.pageX), String(e.pageY), "1000", tmp_comment)
                $(this).dialog('close');
                $("#latest_div").remove();
                // 書き込みモードを再開
                mode.Change_mode("write")
                }
            }
        });  
    }
}