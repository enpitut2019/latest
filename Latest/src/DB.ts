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
        let current_url = this.urlmanage.current_url
        var info = [{}]
        return new Promise(function (resolve) {
            $.ajax({
                type: 'GET',
                url: server_url,
                data: {
                    url: current_url
                },
                dataType: 'text'
            }).done(function (data: string){
                console.log(data);
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
        $.ajax({
            type: 'POST',
            url: this.urlmanage.current_url,
            data: {
                comment: {
                    node_id: id,
                    x: x,
                    y: y,
                    comment: comment,
                    url: this.urlmanage.current_url
                }
            }
        })
        .done(function(data: {}){
            console.log(data);
        })
    }
}