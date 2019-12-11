class DB{

    url: string;
    info: Array<{id: string, x: string, y: string, comment: string, url: string}>;
    
    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    constructor(){
        this.url = "https://stark-coast-28712.herokuapp.com/comments"
        this.info = []
    }

    /**
     * サーバーから情報を読み込む
    */
    Load_Comment(current_url: string) :Promise<Array<{}>>{
        let server_url = this.url + "/get_from_url";
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
                JSON.parse(data).forEach(e => {
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
    Save_PIN(id: string, x: string, y: string, comment: string, url: string) {
        // サーバに形式を整えて送信 
        $.ajax({
            type: 'POST',
            url: this.url,
            data: {
                comment: {
                    node_id: id,
                    x: x,
                    y: y,
                    comment: comment,
                    url: url
                }
            }
        })
        .done(function(data: {}){
            console.log(data);
        })
    }
}