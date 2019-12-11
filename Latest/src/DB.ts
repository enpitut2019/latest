class DB{

    url: string;
    info: Array<{id: string, x: string, y: string, comment: string, url: string}>;
    
    /**
     * 何かしらdbに接続するためのステータスをセットする
     */
    constructor(){
        this.url = "http://localhost:3000/comments"
        this.info = []
    }

    /**
     * サーバーから情報を読み込む
    */
    Load_Comment(current_url: string) :Promise<Array<{}>>{
        let server_url = this.url;
        var info = [{}]
        return new Promise(function (resolve) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', server_url);
            xhr.send();
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200){
                    console.log(xhr.responseText)
                    JSON.parse(xhr.responseText || "null").forEach(e => {
                        info.push({id: e.node_id, x: e.x, y: e.y, comment: e.comment, url: e.url})
                    });
                    resolve(info)
                }
            }
        });
        /*
        this.xhr.open('GET', this.url);
        this.xhr.send()
        console.log(this.xhr.status);
        if(this.xhr.readyState == 4 && this.xhr.status == 200){
            console.log(this.xhr.status)
            JSON.parse(this.xhr.responseText).forEach(e => {
                this.info.push({id: e.node_id, x: e.x, y: e.y, comment: e.comment, url: e.url})
            });
        }
        $.ajax({
            url: this.url,
            type: "GET",
            data: String,
            async: false,
            success: function(json:string){
                console.log(json)
                JSON.parse(json || "null").forEach(e => {
                    this.info.push({id: e.node_id, x: e.x, y: e.y, comment: e.comment, url: e.url})
                });
            }
        })
        return this.info
        */
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
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.url);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send( 'comment[node_id]=' + id + '&comment[x]=' + x + '&comment[y]=' + y + '&comment[comment]=' + comment + '&comment[url]=' + url );
    }
}