class DB{

    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    constructor(){

    }

    /**
     * サーバーから情報を読み込む
    */
    Load_Comment() :[{id: string, x: string, y: string, comment: string, url: string}]{
        // 何らかの操作でサーバから値を取得
        return [{id: "Comment1", x: "100", y: "100", comment: "コメント", url: "xxx"}]
    }

    /**
     * 作成したPIN及びコメントをサーバに形式を整えて送信し、保存
     * @param id コメントのid属性
     * @param x PINのx座標
     * @param y PINのy座標
     * @param comment コメントの内容
     */
    Save_PIN(id: string, x: string, y: string, comment: string, url: string) {
        // サーバに形式を整えて送信 
    }
}