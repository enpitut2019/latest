class DB{

    urlmanage: URLManage;
    
    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    constructor(){
        this.urlmanage = new URLManage()
    }

    /**
     * サーバーから情報を読み込む
    */
    Load_Comment() :Promise<Array<{}>>{
        let server_url = this.urlmanage.get_url_get_from_url();
        var info = [{}]
        var parameter = {url: this.urlmanage.current_url, sharenum: this.urlmanage.getParam("ShareNum")}
        return new Promise(function (resolve) {
            $.ajax({
                type: 'GET',
                url: server_url,
                data: parameter,
                dataType: 'text'
            }).done(function (data: string){
                console.log("DEBUG: LoadData = " + data);
                JSON.parse(data).forEach((e: { node_id: string; x: string; y: string; comment: string; url: string; }) => {
                    info.push({id: e.node_id, x: e.x, y: e.y, comment: e.comment, url: e.url})
                });
                resolve(info)
            });
        });
    }

    /**
     * 作成したPIN及びコメントをサーバに形式を整えて送信し、保存
     * @param id コメントのid属性
     * @param x PINのx座標
     * @param y PINのy座標
     * @param comment コメントの内容
     */
    Save_PIN(id: string, x: string, y: string, comment: string) {
        // サーバに形式を整えて送信 
        console.log("DEBUG id = "+ id + "x = " + x);
        $.ajax({
            type: 'POST',
            url: this.urlmanage.server_url,
            data: {
                comment: {
                    node_id: id,
                    x: x,
                    y: y,
                    comment: comment,
                    url: this.urlmanage.current_url
                }
            }
        }).done(function(data){
            console.log("DEBUG: data = " + data)
            console.log("DEBUG: data = " + data.comment)
            console.log("DEBUG: SaveData = {id: " + data.comment.node_id + ", x: " + data.comment.x + ", y: " + data.comment.y + ", comment: " + data.comment.comment + ", url: " + data.comment.url + "}");
        });
    }
}