class Share{

    urlmanage: URLManage
    comment_manager: CommentManager
    current_sharenum: string;
    
    constructor(urlmanage: URLManage, comment_manager: CommentManager) {
        this.urlmanage = urlmanage;
        this.comment_manager = comment_manager;
        this.current_sharenum = urlmanage.sharenum;
    }

    get_Sharenum(){
        this.urlmanage.getParam("sharenum")
        this.current_sharenum = this.urlmanage.sharenum
    }

    Init_Share(){
        this.urlmanage.sharenum = this.make_share_num()
        this.current_sharenum = this.urlmanage.sharenum
        this.comment_manager.remove_pin()
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
        }
    }

    Change_Share_img(){
        const target_node = document.getElementsByClassName("latest_button--three")
        $(target_node).toggleClass("latest_button--seven")
    }
}