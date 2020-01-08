class Share{

    urlmanage: URLManage
    comment_manager: CommentManager
    current_sharenum: string;
    private limit: Boolean;
    private setLimit: Function;
    
    constructor(urlmanage: URLManage, comment_manager: CommentManager) {
        this.urlmanage = urlmanage;
        this.comment_manager = comment_manager;
        this.current_sharenum = urlmanage.sharenum;
        this.limit = false;
        this.setLimit = this.setLimit_false.bind(this)
    }

    get_Sharenum(){
        this.urlmanage.getParam("sharenum")
        this.current_sharenum = this.urlmanage.sharenum
    }

    Init_Share(){
        this.urlmanage.sharenum = this.make_share_num()
        this.current_sharenum = this.urlmanage.sharenum
        this.comment_manager.remove_pin()
        this.Result_Init_Share(this.make_share_url(this.urlmanage.current_url, this.current_sharenum))
    }

    make_share_num():string{
        const max_sharenum = 10000;
        const min_sharenum = 0;
        let min = Math.ceil(min_sharenum);
        let max = Math.floor(max_sharenum);
        let num = Math.floor(Math.random() * (max - min)) + min;
        return String(num)
    }

    Change_Share(){
        console.log("DEBUG: Change_Share: limit = " + this.limit)
        if (this.limit){
            return;
        }
        this.Change_Share_img()
        if (this.current_sharenum==null){
            this.Init_Share();
        }else{
            this.comment_manager.remove_pin()
            if (this.urlmanage.sharenum == null){
                // 共有状態off->on
                this.urlmanage.sharenum = this.current_sharenum;
            }else{
                // 共有状態on->off
                this.urlmanage.sharenum = null
            }
            this.comment_manager.loadComment(this.urlmanage)
            this.limit = true
            setTimeout(this.setLimit, 1000)
        }
        const target_node = document.getElementsByClassName("latest_button--four")
        if ($(target_node).hasClass("latest_button--six")){
            $(target_node).removeClass("latest_button--six")
        }
    }

    setLimit_false(){
        this.limit = false
        console.log("DEBUG: setLimit: limit = " + this.limit)
    }

    Change_Share_img(){
        const target_node = document.getElementsByClassName("latest_button--three")
        $(target_node).toggleClass("latest_button--seven")
    }

    private make_share_url(current_url: string, share_num: string):string{
        let para = "sharenum=" + share_num
        console.log("DEBUG: location.search = "+ location.search)
        if (location.search != ""){
            para = '&' + para;
        }else{
            para = '?' + para
        }
        return current_url + para;
    }

    private Result_Init_Share(url: string){
        //ポップアップとして表示するもの全体のdivを用意
        const form = document.createElement("div");
        form.id = "latest_result_share"
        form.style.textAlign = "center"

        const title = document.createElement("h1")
        title.innerHTML = "共有URLはこちら"
        form.appendChild(title)

        const context = document.createElement("input")
        context.id = "latest_share_url"
        context.type = "text"
        context.value = url
        context.readOnly = true
        context.width = 400
        context.size = 40
        context.style.textAlign = "center"
        context.select();

        form.appendChild(context);

        //ポップアップの呼び出し。
        $(form).dialog({
            title: '共有URL',
            width: "400",
            height: "auto",
            modal: true,
            buttons: {
                "URLをコピーする": function(){
                    $(context).select()
                    document.execCommand("Copy")
                    const result = document.createElement("div")
                    result.innerHTML = "コピーできました!"
                    form.appendChild(result)
                }
            }
        });
    }
}