class Form{

    form_div: string;

    constructor() {
        this.form_div = "latest_div"
    }

    /**
     * formを作る関数
     * @param comment_manager mainにあるcomment_manager(コメントを新しく作るため)
     * @param e クリックした場所の座標をjqueryより取得
     */
    make_form(comment_manager: CommentManager, e: JQuery.ClickEvent){
        // 書き込みモードを解除        
        this.init_form();

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

        let inputs = this.make_table(["ユーザーネーム", "コメント"], latest_tbody);

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
                    tmp_user = inputs[0].value;
                    tmp_comment = inputs[1].value;
                    console.log("ユーザーネーム: "+tmp_user+"   コメント: "+tmp_comment);
                    // コメントを作成
                    comment_manager.creteNewComments(String(e.pageX), String(e.pageY), "1000", tmp_comment)
                    $(this).dialog('close');
                    $("#latest_div").remove();
                }
            },
            close: function(){
                mode.Change_mode("write");
            }
        });  
    }

    private init_form(){
        //ノードの初期化
        if(<HTMLDivElement>document.getElementById(this.form_div) != null){
            $("#"+this.form_div).remove();
        }
    }

    private make_table(line_name: string[], tbody: HTMLTableSectionElement): HTMLInputElement[]{
        var ret: HTMLInputElement[] = [];
        line_name.forEach(function(name: string){
            ret.push(this.make_table_n(name, tbody, ret.length));
        }.bind(this));
        return ret;
    }

    private make_table_n(line_name: string, tbody: HTMLTableSectionElement, line_n: number): HTMLInputElement{
        //table n行目作成
        let tr = tbody.insertRow(-1);
        tr.id = "latest_tr" + line_n;
        //tabel n行目のheader作成。
        let th= document.createElement("th");
        th.id = "latest_th" + line_n;
        th.textContent = line_name;
        tr.appendChild(th);
        //tabel n行目の値を作成。
        let td = document.createElement("td");
        td.id = "latest_td" + line_n;
        let input: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        input.id = "input" + line_n;
        td = <HTMLTableDataCellElement><unknown>input;
        tr.appendChild(td);

        return input;
    }
}