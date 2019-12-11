class URLManage {

    current_url: string
    server_url: string

    constructor() {
        this.current_url = location.origin;
        this.server_url = "https://stark-coast-28712.herokuapp.com/comments";
        console.log(this.current_url)
    }

    get_url_get_from_url() :string{
        let get_url = "/get_from_url";
        return this.server_url + get_url;
    }

    /**
     * Get the URL parameter value(from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
     *
     * @param  name {string} パラメータのキー文字列
     * @return url {url} 対象のURL文字列（任意）
     */
    getParam(name :string, url = ""){
        if (url == "") url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}