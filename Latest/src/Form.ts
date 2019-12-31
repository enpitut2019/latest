class Form{

    form_id: string;
    user_name_form: HTMLInputElement;
    comment_form: HTMLTextAreaElement;
    form: HTMLElement;
    
    constructor() {
        this.form_id = "latest_form"
    }

    /**
     * formを作る関数
     */
    make_form(){
        //ポップアップとして表示するもの全体のdivを用意
        this.form = document.createElement("div");

        this.form.id = this.form_id;

        // table作成
        const latest_table = document.createElement("table");

        this.user_name_form = this.make_table_input("ユーザーネーム", latest_table);
        this.comment_form = this.make_table_textarea("コメント", latest_table)

        this.form.appendChild(latest_table);
    }

    /**
     * ダイアログを開くための関数
     */
    open(x: string, y: string, comment_manager: CommentManager, mode: Mode, urlmanage: URLManage){
        const user_name = this.user_name_form
        const comment = this.comment_form
        //ポップアップの呼び出し。
        $(this.form).dialog({
            title: 'コメント入力フォーム',
            width: "400",
            height: "auto",
            modal: true,
            buttons: {
                "登録": function(){
                    const tmp_user: string = user_name.value;
                    const tmp_comment: string = comment.value;
                    console.log("ユーザーネーム: "+tmp_user+"   コメント: "+tmp_comment + "   ShareNum: "+urlmanage.sharenum);
                    // コメントを作成
                    comment_manager.creteNewComments(x, y, "1000", tmp_comment, urlmanage)
                    $(this).dialog('close');
                }
            },
            open: function(){
                mode.Writing_mode()
            },
            close: function(){
                user_name.value=""
                comment.value=""
                mode.Writing_mode()
            }
        });
    }

    /**
     * テーブルにinputフォームを追加してそれを返す。
     * @param line_name フォームの名前を指定
     * @param table 追加したいテーブルを指定
     */
    private make_table_input(line_name: string, table: HTMLTableElement): HTMLInputElement{
        //table 1行作成
        const row = table.insertRow(-1);
        //table 作った1行の1列目を追加(フォームの名前)
        row.insertCell(-1).appendChild(document.createTextNode(line_name));;
        //tabel n行目の値を作成。
        const input = document.createElement("input");
        row.appendChild(input);

        return input;
    }

    private make_table_textarea(line_name: string, table: HTMLTableElement): HTMLTextAreaElement{
        //table 1行作成
        const row = table.insertRow(-1);
        //table 作った1行の1列目を追加(フォームの名前)
        row.insertCell(-1).appendChild(document.createTextNode(line_name));;
        //tabel n行目の値を作成。
        const textarea = document.createElement("textarea");
        row.appendChild(textarea);

        return textarea;
    }
}