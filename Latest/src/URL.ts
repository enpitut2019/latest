class URLManage {

    current_url: string
    server_url: string
    sharenum: string

    constructor() {
        this.current_url = location.href;
        this.server_url = "https://stark-coast-28712.herokuapp.com/comments";
        this.sharenum = null
        console.log("DEBUG: current_url = " + this.current_url)
    }

    get_url_get_from_url() :string{
        let get_url = "/get_from_url";
        return this.server_url + get_url;
    }

    /**
     * Get the URL parameter value(from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
     *
     * @param  name {string} パラメータのキー文字列
     * @param  url {url} 対象のURL文字列（任意）
     * @return パラメーターの値
     */
    getParam(name :string, url = ""){
        if (url == "") url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return;
        if (!results[2]) return;
        this.sharenum = decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    get_href(){
        const sharenum = "sharenum"
        var regex = new RegExp("[?&]" + sharenum + "(=([^&#]*)|&|#|$)")
        this.current_url = this.current_url.replace(regex, "")
        console.log("DEBUG GET_HREF: current_url2 = " + this.current_url)
    }
}